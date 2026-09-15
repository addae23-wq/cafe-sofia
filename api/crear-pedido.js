import { llamarBackend } from "./_backend.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Método no permitido." });
    return;
  }

  const { idItem, cantidad, clienteEmail, consentimientoMarketing } = req.body || {};
  if (!idItem || !cantidad) {
    res.status(400).json({ ok: false, error: "Faltan datos del pedido (idItem, cantidad)." });
    return;
  }

  try {
    const resultado = await llamarBackend("crearPedidoOnline", {
      idItem,
      cantidad,
      clienteEmail: clienteEmail || null,
      consentimientoMarketing: !!consentimientoMarketing,
    });
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
