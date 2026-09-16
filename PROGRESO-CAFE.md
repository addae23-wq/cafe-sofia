# Mi progreso — Café SofIA

## Clase 5 · De un prompt a una app publicada en Internet (tramo final)
- [x] Etapa 0 · Punto de partida: llegaste a Claude Code — confirmó VS Code + Claude Code funcionando
- [x] Etapa 1 · GitHub — repo: github.com/addae23-wq/cafe-sofia
- [x] Etapa 2 · Vercel — URL pública: https://cafe-sofia-sand.vercel.app/

## Clase 6 · Conectar con el mundo real
- [x] Etapa 3 · La arquitectura, como un restaurante — respondió bien la pregunta de comprensión
- [x] Etapa 4 · Conectar el frontend con el backend — probado de punta a punta (crear pedido + confirmar pago + SofIA evaluó)
- [x] Etapa 5 · Variables de entorno — repaso rápido, respondió bien
- [x] Etapa 6 · El token entre servidores — HITO 2 alcanzado, verificado que el backend exige el token correcto
- [ ] Etapa 7 · Los métodos de pago
- [ ] Etapa 8 · El panel de administración: la trastienda
- [ ] Etapa 9 · Usar el panel: carta, insumos, stock y transferencias
- [ ] Etapa 10 · SofIA en modo real

## Notas de contexto
_(Lo importante para retomar. Sin claves ni contraseñas.)_
- Sistema operativo: Windows.
- Estructura de carpetas corregida: el proyecto (package.json, src/, etc.) estaba duplicado en una subcarpeta cafe-sofia\cafe-sofia\; se movió todo un nivel arriba a la raíz del proyecto (2026-09-15).
- Usuario de GitHub: addae23-wq. Repo: github.com/addae23-wq/cafe-sofia (público).
- URL pública de Vercel: https://cafe-sofia-sand.vercel.app/
- La computadora tiene poca RAM (4 GB) y el comando `gh` (GitHub CLI) queda bloqueado por el antivirus/protección del equipo — para operaciones de git usar `git` directo, no `gh`, y evitar procesos en segundo plano largos.
- Usó un Personal Access Token de GitHub con vencimiento de 7 días (creado 2026-09-15) para el primer push; si en el futuro fallan los push, puede necesitar generar uno nuevo.
- Pendiente para la Etapa 8-9 (panel de administración): la carta real en el Google Sheet todavía tiene los productos de fábrica (espresso, capuchino, latte) y no los del café ("Espresso Clásico", "Si Bemol Latte", "La Manzana Cortado", "Código Americano" — ids clasico/bemol/manzana/codigo en el frontend). Hay que cargar la carta real desde el panel para que las compras funcionen con los productos verdaderos.
- Tuvo que borrar un archivo viejo "Copia v1" en el proyecto de Apps Script que declaraba MODELO_GROQ duplicado y bloqueaba el deploy.
