import { llamarBackend } from "./_backend.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Método no permitido." });
    return;
  }

  const { pedidoId } = req.body || {};
  if (!pedidoId) {
    res.status(400).json({ ok: false, error: "Falta el pedidoId." });
    return;
  }

  try {
    const resultado = await llamarBackend("confirmarPago", { pedidoId });
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
