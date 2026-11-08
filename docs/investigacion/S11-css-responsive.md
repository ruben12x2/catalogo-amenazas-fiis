# Ficha S11: CSS y Diseño Responsive (Etapa 2)

## Resumen (128 palabras)
El diseño web adaptable bajo el enfoque mobile-first consiste en escribir las reglas CSS base pensando primero en pantallas pequeñas de teléfonos móviles y luego agregar puntos de corte progresivos para tabletas y monitores de escritorio. Este método evita cargar estilos complejos innecesarios en dispositivos con recursos limitados. Para controlar el tamaño exacto de las tarjetas y formularios, la propiedad `box-sizing: border-box` resulta indispensable porque integra el relleno y el borde dentro del ancho declarado, evitando desbordamientos horizontales. Asimismo, la combinación de Flexbox para barras de navegación unidimensionales y CSS Grid para cuadrículas bidimensionales de tarjetas permite reorganizar la interfaz sin alterar el HTML semántico. Finalmente, usar variables CSS centraliza la paleta de colores y garantiza un contraste visual accesible según el estándar WCAG 2.2.

## Respuestas a las preguntas guía
1. **¿Qué regla gana cuando dos selectores compiten?**
   Gana el selector con mayor **especificidad** (calculada en el orden: estilos en línea > selectores de `#id` > selectores de `.clase`, atributos y pseudoclases > selectores de elemento como `section` o `p`). Si ambos tienen exactamente la misma especificidad, gana la regla declarada **más abajo** en la cascada del archivo CSS.
2. **¿Qué cambia entre `content-box` y `border-box`?**
   En `content-box` (valor por defecto), el `width` solo mide el contenido interno, sumando aparte el `padding` y el `border`, lo que agranda la caja final. En `border-box`, el `width` incluye el contenido, el `padding` y el `border`, manteniendo el tamaño total exacto.
3. **¿Cómo funcionan Flexbox, Grid y una media query?**
   * **Flexbox:** distribuye elementos en una sola dimensión (fila o columna), ideal para alinear el logotipo y el menú.
   * **CSS Grid:** organiza contenedores en dos dimensiones simultáneas (filas y columnas), ideal para grillas de tarjetas.
   * **Media query (`@media`):** evalúa condiciones del visor (como `min-width: 601px`) y aplica bloques CSS solo cuando se cumplen.

## Aplicación en nuestro proyecto
Aplicamos `* { box-sizing: border-box; }` y variables en `:root` dentro de `css/estilos.css`. Diseñamos la vista base para móviles (`<= 600px`) con menú desplegable, y añadimos dos media queries (`min-width: 601px` y `min-width: 961px`) que transforman la grilla `.cards-grid` de 1 a 2 y 3 columnas con CSS Grid.

## Dudas surgidas
¿En qué casos conviene usar unidades `rem` frente a `clamp()` para escalar títulos automáticamente entre móvil y escritorio?

## Referencias (APA 7)
* Mozilla. (s. f.). *CSS layout y diseño responsive*. MDN Web Docs. https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout
* W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/