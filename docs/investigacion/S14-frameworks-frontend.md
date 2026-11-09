# Ficha S14: Frameworks Front-End y Componentes (Etapa 5)

## Resumen 
A medida que una aplicación web crece en cantidad de vistas, filtros y estados compartidos, actualizar el DOM manualmente con JavaScript puro vuelve el código repetitivo y propenso a desincronizaciones entre los datos guardados y lo que muestra la pantalla. Los frameworks y librerías modernas de Front-End resuelven este problema mediante una arquitectura declarativa basada en estados: el programador define cómo debe lucir la interfaz para cada estado de los datos y el framework actualiza eficientemente solo los nodos que cambiaron. La pieza fundamental de este enfoque es el componente, una unidad encapsulada e independiente que agrupa estructura, estilo y comportamiento. Dividir la interfaz en componentes reutilizables reduce la duplicación de código y facilita el mantenimiento colaborativo en equipos de ingeniería de software.

## Respuestas a las preguntas guía
1. **¿Qué problema resuelve un framework y qué es un componente?**
   Un framework resuelve el problema de mantener sincronizado el estado de los datos con el DOM sin tener que reconstruir ni manipular nodos manualmente en cada evento. Un **componente** es un bloque de interfaz autónomo y reutilizable que recibe datos de entrada (*props*) y gestiona su propia vista y lógica.
2. **¿Qué partes de tu proyecto serían componentes reutilizables?**
   * `Navbar`: la cabecera y menú responsive común a las 3 páginas.
   * `SummaryBar`: la grilla de contadores estadísticos por tipo de amenaza.
   * `ThreatCard`: la tarjeta individual de amenaza (reutilizada tanto en la lista del catálogo como en las dos columnas del comparador).
   * `FilterPanel`: la barra de búsqueda, selectores y casilla de favoritos.
3. **¿En qué se diferencian React y Vue, en una frase cada uno?**
   * **React:** es una librería centrada en la interfaz que combina la lógica de JavaScript y el marcado directamente mediante sintaxis JSX y un flujo de datos unidireccional.
   * **Vue:** es un framework progresivo que separa plantilla HTML, lógica JavaScript y estilos CSS en archivos de un solo componente (`.vue`) con reactividad automática.

## Aplicación en nuestro proyecto
En `js/app.js` simulamos la modularidad creando la función pura `construirElementoTarjeta(item, mostrarAcciones)`, que reutilizamos tanto en `index.html` como en `comparar.html`.

## Dudas surgidas
¿Qué sobrecarga de tamaño de descarga inicial añade un framework como React frente a nuestro proyecto en JavaScript puro de menos de 20 KB?

## Referencias (APA 7)
* Meta Open Source. (s. f.). *Documentación oficial de React*. https://react.dev/
* You, E. (s. f.). *Guía oficial de Vue.js*. https://vuejs.org/guide/