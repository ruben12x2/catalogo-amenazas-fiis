# Ficha S13: Interfaces Graficas, Validacion y Usabilidad (Etapa 4)

## Resumen
Una interfaz grafica usable permite que cualquier estudiante o analista cumpla su objetivo sin confusion ni errores accidentales. Las heuristicas de usabilidad de Jakob Nielsen proporcionan principios practicos para evaluar pantallas, tales como informar siempre que ocurre en el sistema, hablar el lenguaje del usuario y prevenir fallos antes de que sucedan. En los formularios web, la accesibilidad exige que los errores no se indiquen unicamente pintando el borde de rojo, pues las personas con daltonismo o lectores de pantalla no percibiran la falla; por ello cada mensaje debe contener texto claro y vincularse al campo mediante atributos ARIA. Ademas, aunque la validacion en JavaScript mejora la experiencia inmediata, en sistemas reales jamas reemplaza la verificacion en el servidor por razones de seguridad.

## Respuestas a las preguntas guia
1. Explica 5 de las 10 heuristicas de Nielsen con un ejemplo aplicado al proyecto:
   - H1. Visibilidad del estado del sistema: mostramos el contador de resultados filtrados, la pagina activa en el menu y alertas al guardar o exportar.
   - H3. Control y libertad del usuario: incluimos el boton "Cancelar" en el formulario y filtros para restaurar la vista completa.
   - H4. Consistencia y estandares: mantenemos la misma cabecera, estructura de tarjetas y botones en las 3 paginas.
   - H5. Prevencion de errores: pedimos confirmacion con confirm() antes de eliminar una amenaza o restaurar los 10 datos de ejemplo.
   - H9. Ayuda para reconocer y recuperarse de errores: junto a cada campo invalido explicamos como corregirlo (ej. "La URL debe iniciar con http:// o https://").
2. ¿Como se vincula un error con su campo y por que no basta el color?
   Se vincula asociando el input con el span del mensaje de error mediante el atributo aria-describedby="err-campo". El color por si solo no basta porque excluye a usuarios con daltonismo y no es leido por lectores de pantalla (WCAG 1.4.1).
3. ¿Que valida el cliente y que debe validar el servidor?
   El cliente (navegador) valida el formato inmediato para guiar al usuario sin esperas. El servidor debe revalidar absolutamente todo (tipos, longitudes, permisos y protocolos), porque un atacante puede desactivar JavaScript o enviar peticiones HTTP alteradas directamente.

## Aplicacion en nuestro proyecto
Implementamos en agregar.html validacion personalizada en JavaScript que rechaza esquemas javascript: y asocia cada campo con su mensaje de error mediante aria-describedby.

## Dudas surgidas
¿Cuando es preferible validar un campo mientras el usuario escribe (evento input) en lugar de esperar al envio del formulario (evento submit)?

## Referencias (APA 7)
- Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '94), 152-158.
- W3C. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/