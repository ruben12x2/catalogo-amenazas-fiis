# Ficha S15: Integración, Pruebas y Publicación (Etapa 5)

## Resumen (129 palabras)
La etapa final del desarrollo web integra el control de versiones, la verificación sistemática de calidad y el despliegue público. GitHub Pages permite alojar sitios estáticos directamente desde el repositorio de código, compilando y sirviendo archivos HTML, CSS y JavaScript bajo conexión segura HTTPS sin necesidad de administrar servidores propios. Antes de publicar, es indispensable ejecutar casos de prueba manuales estructurados que comprueben tanto los flujos normales como las entradas maliciosas o bordes límite, verificando además la seguridad del almacenamiento en el cliente. Comprender que `localStorage` tiene capacidad limitada y es accesible por cualquier script del mismo origen resulta vital para un ingeniero en ciberseguridad, evitando almacenar credenciales, sesiones o datos sensibles en el navegador del usuario.

## Respuestas a las preguntas guía
1. **¿Qué es GitHub Pages y qué archivos se publican?**
   GitHub Pages es un servicio gratuito de alojamiento de sitios web estáticos integrado en GitHub. Publica directamente los archivos del cliente (`index.html`, demás páginas `.html`, hojas `.css`, scripts `.js`, imágenes y documentación estática) desde la rama configurada (`main`), sin ejecutar código de servidor (como PHP, Python o bases de datos SQL).
2. **¿Qué límites y riesgos tiene `localStorage`?**
   Tiene un límite de almacenamiento de aproximadamente **5 MB por origen**, es síncrono (puede bloquear el hilo principal con volúmenes grandes) y no tiene fecha de expiración automática. Su principal riesgo de seguridad es que guarda todo en **texto plano sin cifrar** y cualquier script ejecutado en la página (por ejemplo, mediante un ataque XSS) puede leer o robar su contenido; por eso jamás debe guardar contraseñas, tokens ni secretos.
3. **¿Cómo se diseña un caso de prueba manual?**
   Se define un identificador único, el requisito o regla que se evalúa, las **precondiciones**, los **pasos exactos de entrada**, el **resultado esperado** y el **resultado obtenido** (Aprobado/Fallido).

## Aplicación en nuestro proyecto
Ejecutamos 6 casos de prueba manuales (incluyendo la prueba de aceptación que rechaza `javascript:alert(1)`), configuramos la cabecera `<meta http-equiv="Content-Security-Policy">` y publicamos la versión `v1.0` en GitHub Pages.

## Dudas surgidas
¿Cómo automatizar en el futuro estas pruebas manuales del DOM utilizando herramientas de integración continua como GitHub Actions y Playwright?

## Referencias (APA 7)
* GitHub. (s. f.). *GitHub Pages documentation*. https://docs.github.com/pages
* OWASP Foundation. (2025). *OWASP Top 10:2025*. https://owasp.org/Top10/2025/