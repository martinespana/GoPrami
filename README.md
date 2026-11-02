# Prami · Evaluación de crédito para personas

Sitio responsive ES/EN inspirado en Kita con el design system de Prami. Posicionamiento actualizado: reúne tareas de entrevista, evaluación psicométrica y análisis de riesgo, que las microfinancieras realizan en días, en una videollamada IA de 30 minutos. Producto B2B: underwriting con IA para entidades de crédito que evalúan a personas sin historial crediticio. Respaldado por la operación de crédito propia de Prami en Colombia desde 2023.

Las entidades citadas en la conversación son referencias del proceso tradicional, no se presentan como clientes, aliados o avalistas. No se afirma diagnóstico clínico o psicológico ni una aprobación garantizada. La duración de 30 minutos proviene del usuario.

## Demo
Casos ficticios, sin datos personales reales, cámara, micrófono, videollamadas, scoring ni decisiones de crédito. Selector de idioma con preferencia local, consola interactiva y modal comercial ilustrativo. Canal de agendamiento pendiente.

## Preview local
`python3 -m http.server 4173 --directory dist`

El usuario confirmó que la videollamada incluye evaluación psicométrica. El demo explica esa etapa sin administrar pruebas ni atribuir instrumentos, puntajes o validaciones no proporcionadas.

## Paso 02: WhatsApp y videollamada
Bloque construido en HTML/CSS (`.call-flow` en `dist/styles.css`) en lugar de una imagen con texto incrustado, para que todo su texto cambie con el selector de idioma. La foto, entregada por el propietario (recortada para excluir la marca Bosch), está en `dist/assets/prami-cliente-videollamada.jpg`. El número de cédula del chat es ficticio.

## Despliegue en Hostinger desde GitHub

El sitio usa HTML, CSS y JavaScript estáticos. El `package.json` de la raíz permite desplegarlo mediante la integración de aplicaciones web de Hostinger, sin dependencias externas.

Configuración:

- Repositorio: `martinespana/GoPrami`, rama `main`.
- Directorio raíz: `.` (la raíz del repositorio; no seleccionar `dist`).
- Framework/tipo: `Other` / `Otro`, con salida estática.
- Versión de Node.js: `22.x`.
- Gestor de paquetes: `npm`.
- Instalación, si se solicita: `npm ci`.
- Compilación: `npm run build`.
- Directorio de salida: `dist`.
- Archivo de entrada del servidor: dejar vacío. No necesita un servidor Node.js persistente.

La compilación valida el HTML de entrada, la presencia de sus archivos locales y la sintaxis de los scripts. `dist/` contiene los archivos fuente listos para publicar y debe permanecer versionado. No hay variables de entorno obligatorias.

Después de actualizar el repositorio, reintentar el despliegue en Hostinger. También se puede alojar directamente el contenido de `dist/` como sitio HTML estático.

## Revisión antes de publicación · 2 de noviembre de 2026
Cifras y posicionamiento B2B confirmados por el propietario. El chat del paso 02 expone su contenido a lectores de pantalla y se identifica como ejemplo ilustrativo. Compilación, traducciones e interacciones revisadas antes del commit.

Se versionan los enlaces a CSS/JS en el HTML para evitar mezclar una página nueva con traducciones o estilos antiguos retenidos en caché. Actualizar el identificador de versión al publicar futuros cambios en estos archivos.
