import { llamarBackend } from "./_backend.js";

// Crea un pedido PENDIENTE por cada producto del carrito (con el precio real
// que calcula el backend, nunca uno que mande el navegador) y arma la
// preferencia de pago de Mercado Pago Checkout Pro para cobrarlos juntos.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Método no permitido." });
    return;
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    res.status(500).json({
      ok: false,
      error: "Falta configurar la variable de entorno MP_ACCESS_TOKEN en Vercel.",
    });
    return;
  }

  const { items, clienteEmail, consentimientoMarketing } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ ok: false, error: "Faltan los productos del pedido." });
    return;
  }

  try {
    const pedidos = [];
    for (const { idItem, cantidad } of items) {
      const pedido = await llamarBackend("crearPedidoOnline", {
        idItem,
        cantidad,
        clienteEmail: clienteEmail || null,
        consentimientoMarketing: !!consentimientoMarketing,
      });
      if (!pedido.ok) throw new Error(pedido.error || "No se pudo crear el pedido.");
      pedidos.push(pedido);
    }

    const origen = `https://${req.headers.host}`;

    const preferencia = {
      items: pedidos.map((p) => ({
        title: p.producto,
        quantity: p.cantidad,
        unit_price: p.importe / p.cantidad,
        currency_id: "ARS",
      })),
      // Guardamos acá los pedido_id que ya creamos como PENDIENTE, para que el
      // webhook sepa qué pedidos confirmar cuando Mercado Pago avise el pago aprobado.
      external_reference: JSON.stringify(pedidos.map((p) => p.pedido_id)),
      notification_url: `${origen}/api/mp/webhook`,
      back_urls: { success: origen, failure: origen, pending: origen },
      auto_return: "approved",
    };

    const respuestaMP = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preferencia),
    });

    const datosMP = await respuestaMP.json();
    if (!respuestaMP.ok) {
      throw new Error(datosMP.message || "Mercado Pago rechazó la preferencia de pago.");
    }

    res.status(200).json({
      ok: true,
      init_point: datosMP.init_point,
      pedidos: pedidos.map((p) => p.pedido_id),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
