# Ficha S12: JavaScript Aplicado y Persistencia (Etapa 3)

## Resumen (132 palabras)
JavaScript permite transformar documentos HTML estáticos en aplicaciones interactivas mediante la manipulación del Modelo de Objetos del Documento (DOM). Cuando el navegador carga una página, construye un árbol de nodos en memoria donde cada etiqueta es un objeto que puede leerse, crearse o eliminarse dinámicamente en respuesta a eventos del usuario como clics o envíos de formulario. Para conservar las fichas registradas sin contar con una base de datos en un servidor, la API Web Storage ofrece `localStorage`, que almacena pares clave-valor de texto de forma persistente en el navegador incluso al cerrar la pestaña. Separar la lógica de lectura y escritura de datos en un módulo independiente respecto del código que dibuja las tarjetas mantiene el programa ordenado, seguro contra inyecciones de código y fácil de depurar.

## Respuestas a las preguntas guía
1. **¿Qué es el DOM y cómo se modifica?**
   El DOM (*Document Object Model*) es la representación en forma de árbol de objetos que el navegador genera a partir del HTML. Se modifica seleccionando nodos con `document.getElementById()` o `querySelector()`, creando elementos con `document.createElement()`, asignando texto con `textContent` e insertándolos con `appendChild()`.
2. **¿Cómo se guarda y se lee un arreglo de objetos con `localStorage`, `JSON.stringify` y `JSON.parse`?**
   Como `localStorage` solo admite cadenas de texto, antes de guardar se convierte el arreglo de objetos a texto JSON mediante `localStorage.setItem(clave, JSON.stringify(arreglo))`. Para leerlo, se recupera la cadena con `localStorage.getItem(clave)` y se reconstruye el arreglo en memoria usando `JSON.parse(cadena)`.
3. **¿Por qué `textContent` y no `innerHTML` con datos del usuario?**
   Porque `innerHTML` interpreta y ejecuta etiquetas HTML o scripts (`<script>`, `<img onerror=...>`) provocando vulnerabilidades de Cross-Site Scripting (XSS). En cambio, `textContent` inserta el valor estrictamente como texto plano inofensivo.

## Aplicación en nuestro proyecto
Separamos `js/datos.js` (que gestiona `localStorage` bajo la clave `catalogo_amenazas_fiis_v1`) de `js/app.js` (que renderiza las tarjetas y el comparador usando exclusivamente `createElement` y `textContent`).

## Dudas surgidas
¿Cómo sincronizar automáticamente cambios de `localStorage` si el usuario tiene el catálogo abierto en dos pestañas al mismo tiempo mediante el evento `storage`?

## Referencias (APA 7)
* Haverbeke, M. (2024). *Eloquent JavaScript* (4.ª ed.). No Starch Press. https://eloquentjavascript.net/
* Mozilla. (s. f.). *Web Storage API*. MDN Web Docs. https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API