# Prami · Evaluación de crédito para personas

Sitio responsive ES/EN inspirado en Kita con el design system de Prami. Posicionamiento actualizado: reúne tareas de entrevista, evaluación psicométrica y análisis de riesgo, que las microfinancieras realizan en días, en una videollamada IA de 30 minutos. Crédito para personas, especialmente sin historial; no financiación empresarial.

Las entidades citadas en la conversación son referencias del proceso tradicional, no se presentan como clientes, aliados o avalistas. No se afirma diagnóstico clínico o psicológico ni una aprobación garantizada. La duración de 30 minutos proviene del usuario.

## Demo
Casos ficticios, sin datos personales reales, cámara, micrófono, videollamadas, scoring ni decisiones de crédito. Selector de idioma con preferencia local, consola interactiva y modal comercial ilustrativo. Canal de agendamiento pendiente.

## Preview local
`python3 -m http.server 4173 --directory dist`

El usuario confirmó que la videollamada incluye evaluación psicométrica. El demo explica esa etapa sin administrar pruebas ni atribuir instrumentos, puntajes o validaciones no proporcionadas.

## Imagen del paso 02
Imagen facilitada por el usuario, conservada íntegra en `dist/assets/prami-whatsapp-videollamada.jpeg`. Sustituye la conversación ilustrativa y se adapta al ancho disponible. El texto incorporado en el archivo permanece en español; pie y alternativa accesible son bilingües.

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
