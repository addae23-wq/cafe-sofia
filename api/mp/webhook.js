import { llamarBackend } from "../_backend.js";

// La "campana de pedido listo": Mercado Pago llama a esta dirección solo
// cuando un pago cambia de estado. Si está aprobado, recién ahí le avisamos
// al backend que confirme la venta (nunca antes de que se pague de verdad).
export default async function handler(req, res) {
  try {
    const tipo = req.query.type || req.query.topic;
    const paymentId =
      req.query["data.id"] || req.query.id || (req.body && req.body.data && req.body.data.id);

    if (tipo !== "payment" || !paymentId) {
      res.status(200).end();
      return;
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    const respuestaPago = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const pago = await respuestaPago.json();

    if (pago.status === "approved" && pago.external_reference) {
      const pedidoIds = JSON.parse(pago.external_reference);
      for (const pedidoId of pedidoIds) {
        // confirmarPago es idempotente en el backend (revisa "procesado" antes
        // de tocar stock o caja), así que si Mercado Pago reintenta el aviso
        // no se duplica la venta.
        await llamarBackend("confirmarPago", { pedidoId });
      }
    }

    res.status(200).end();
  } catch (err) {
    // Respondemos 200 igual: si devolvemos error, Mercado Pago reintenta el
    // aviso sin límite y no queremos que eso rompa nada del lado del cliente.
    console.error("Error procesando webhook de Mercado Pago:", err);
    res.status(200).end();
  }
}
