// Helper compartido: envía una acción al backend de Google Apps Script.
// La URL y el token del backend viven en variables de entorno de Vercel,
// nunca en el código ni en el navegador del cliente.
export async function llamarBackend(action, datos) {
  const backendUrl = process.env.APPS_SCRIPT_URL;
  const token = process.env.APPS_SCRIPT_TOKEN;
  if (!backendUrl) {
    throw new Error(
      "Falta configurar la variable de entorno APPS_SCRIPT_URL en Vercel."
    );
  }
  if (!token) {
    throw new Error(
      "Falta configurar la variable de entorno APPS_SCRIPT_TOKEN en Vercel."
    );
  }

  const respuesta = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, token, ...datos }),
  });

  if (!respuesta.ok) {
    throw new Error("El backend respondió con un error (" + respuesta.status + ").");
  }

  return respuesta.json();
}
