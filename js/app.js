document.addEventListener("DOMContentLoaded", () => {
    configurarMenuMovil();

    const pagina = document.body.dataset.pagina;
    if (pagina === "catalogo") iniciarCatalogo();
    if (pagina === "agregar") iniciarFormulario();
    if (pagina === "comparar") iniciarComparador();
});

// Mostrar u ocultar menu en pantallas moviles
function configurarMenuMovil() {
    const boton = document.getElementById("btn-menu");
    const menu = document.getElementById("menu-principal");
    if (!boton || !menu) return;

    boton.addEventListener("click", () => {
        const abierto = boton.getAttribute("aria-expanded") === "true";
        boton.setAttribute("aria-expanded", String(!abierto));
        menu.classList.toggle("abierto");
    });
}

// Validar que la URL inicie con http:// o https://
function validarUrlSegura(url) {
    try {
        const objetoUrl = new URL(url.trim());
        return objetoUrl.protocol === "http:" || objetoUrl.protocol === "https:";
    } catch (e) {
        return false;
    }
}

/* --- PAGINA 1: CATALOGO --- */
function iniciarCatalogo() {
    const inputBuscar = document.getElementById("input-buscar");
    const filtroTipo = document.getElementById("filtro-tipo");
    const filtroImpacto = document.getElementById("filtro-impacto");
    const ordenLista = document.getElementById("orden-lista");
    const filtroFav = document.getElementById("filtro-favoritos");
    const btnEjemplos = document.getElementById("btn-ejemplos");
    const btnExportar = document.getElementById("btn-exportar");

    function actualizarPantalla() {
        const todas = leerAmenazas();
        dibujarResumen(todas);

        const texto = inputBuscar.value.trim().toLowerCase();
        const tipo = filtroTipo.value;
        const impacto = filtroImpacto.value;
        const soloFav = filtroFav.checked;

        // Filtrar registros
        const filtradas = todas.filter((a) => {
            const cumpleTexto =
                a.nombre.toLowerCase().includes(texto) ||
                a.descripcion.toLowerCase().includes(texto) ||
                a.indicadores.toLowerCase().includes(texto);
            const cumpleTipo = tipo === "todos" || a.tipo === tipo;
            const cumpleImpacto = impacto === "todos" || String(a.impacto) === impacto;
            const cumpleFav = !soloFav || a.favorito === true;
            return cumpleTexto && cumpleTipo && cumpleImpacto && cumpleFav;
        });

        // Ordenar registros
        filtradas.sort((a, b) => {
            if (ordenLista.value === "impacto-desc") return b.impacto - a.impacto;
            if (ordenLista.value === "impacto-asc") return a.impacto - b.impacto;
            return a.nombre.localeCompare(b.nombre);
        });

        dibujarTarjetas(filtradas, actualizarPantalla);
    }

    inputBuscar.addEventListener("input", actualizarPantalla);
    filtroTipo.addEventListener("change", actualizarPantalla);
    filtroImpacto.addEventListener("change", actualizarPantalla);
    ordenLista.addEventListener("change", actualizarPantalla);
    filtroFav.addEventListener("change", actualizarPantalla);

    btnEjemplos.addEventListener("click", () => {
        if (confirm("Se restauraran las 10 amenazas de ejemplo. ¿Continuar?")) {
            cargarEjemplos();
            actualizarPantalla();
        }
    });

    btnExportar.addEventListener("click", () => {
        const datos = JSON.stringify(leerAmenazas(), null, 2);
        const blob = new Blob([datos], { type: "application/json" });
        const enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(blob);
        enlace.download = "catalogo-amenazas.json";
        enlace.click();
    });

    actualizarPantalla();
}

function dibujarResumen(lista) {
    const contenedor = document.getElementById("contenedor-resumen");
    contenedor.textContent = "";

    const tipos = ["malware", "phishing", "ransomware", "ingenieria social", "DDoS", "otro"];
    contenedor.appendChild(crearCajaResumen("Total", lista.length));

    tipos.forEach((tipo) => {
        const cantidad = lista.filter((a) => a.tipo === tipo).length;
        contenedor.appendChild(crearCajaResumen(tipo, cantidad));
    });
}

function crearCajaResumen(titulo, cantidad) {
    const div = document.createElement("div");
    div.className = "item-resumen";
    const num = document.createElement("strong");
    num.textContent = String(cantidad);
    const texto = document.createElement("span");
    texto.textContent = titulo;
    div.appendChild(num);
    div.appendChild(texto);
    return div;
}

function dibujarTarjetas(lista, recargar) {
    const contenedor = document.getElementById("contenedor-tarjetas");
    const contador = document.getElementById("contador-lista");
    const alerta = document.getElementById("mensaje-catalogo");

    contenedor.textContent = "";
    contador.textContent = lista.length + " registros";

    if (lista.length === 0) {
        alerta.className = "alerta alerta-info";
        alerta.textContent = "No hay amenazas que coincidan con la busqueda.";
        return;
    }

    alerta.className = "alerta oculto";
    lista.forEach((item) => {
        contenedor.appendChild(crearTarjetaDOM(item, true, recargar));
    });
}

// Construye una tarjeta usando solo textContent por seguridad
function crearTarjetaDOM(item, conBotones, recargar) {
    const art = document.createElement("article");
    art.className = "tarjeta";

    const cabecera = document.createElement("div");
    cabecera.className = "panel-cabecera";

    const etqTipo = document.createElement("span");
    etqTipo.className = "etiqueta";
    etqTipo.textContent = item.tipo.toUpperCase() + " | Impacto: " + item.impacto + "/5";
    cabecera.appendChild(etqTipo);

    if (conBotones) {
        const btnFav = document.createElement("button");
        btnFav.type = "button";
        btnFav.className = "btn btn-borde btn-fav " + (item.favorito ? "activo" : "");
        btnFav.textContent = item.favorito ? "Favorito [Si]" : "Favorito [No]";
        btnFav.addEventListener("click", () => {
            cambiarFavorito(item.id);
            recargar();
        });
        cabecera.appendChild(btnFav);
    }

    const titulo = document.createElement("h3");
    titulo.textContent = item.id + " - " + item.nombre;

    const desc = document.createElement("p");
    desc.textContent = item.descripcion;

    const prop = document.createElement("p");
    prop.textContent = "Propagacion: " + item.propagacion;

    const ind = document.createElement("p");
    ind.textContent = "Indicadores: " + item.indicadores;

    const listaPrev = document.createElement("ul");
    item.prevenciones.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = p;
        listaPrev.appendChild(li);
    });

    const acciones = document.createElement("div");
    acciones.className = "grupo-botones";

    const linkFuente = document.createElement("a");
    linkFuente.className = "btn btn-borde";
    linkFuente.textContent = "Ver fuente";
    linkFuente.href = validarUrlSegura(item.fuente) ? item.fuente : "#";
    linkFuente.target = "_blank";
    linkFuente.rel = "noopener noreferrer";
    acciones.appendChild(linkFuente);

    if (conBotones) {
        const btnEditar = document.createElement("a");
        btnEditar.className = "btn btn-borde";
        btnEditar.href = "agregar.html?id=" + encodeURIComponent(item.id);
        btnEditar.textContent = "Editar";

        const btnBorrar = document.createElement("button");
        btnBorrar.type = "button";
        btnBorrar.className = "btn btn-peligro";
        btnBorrar.textContent = "Eliminar";
        btnBorrar.addEventListener("click", () => {
            if (confirm("¿Seguro que desea eliminar " + item.nombre + "?")) {
                eliminarAmenaza(item.id);
                recargar();
            }
        });

        acciones.appendChild(btnEditar);
        acciones.appendChild(btnBorrar);
    }

    art.append(cabecera, titulo, desc, prop, ind, listaPrev, acciones);
    return art;
}

/* --- PAGINA 2: FORMULARIO --- */
function iniciarFormulario() {
    const form = document.getElementById("form-amenaza");
    const params = new URLSearchParams(window.location.search);
    const idEditar = params.get("id");

    if (idEditar) {
        const actual = buscarPorId(idEditar);
        if (actual) {
            document.getElementById("titulo-form").textContent = "Editar Amenaza " + actual.id;
            document.getElementById("campo-id").value = actual.id;
            document.getElementById("nombre").value = actual.nombre;
            document.getElementById("tipo").value = actual.tipo;
            document.getElementById("impacto").value = String(actual.impacto);
            document.getElementById("fuente").value = actual.fuente;
            document.getElementById("descripcion").value = actual.descripcion;
            document.getElementById("propagacion").value = actual.propagacion;
            document.getElementById("indicadores").value = actual.indicadores;
            document.getElementById("prevencion1").value = actual.prevenciones[0] || "";
            document.getElementById("prevencion2").value = actual.prevenciones[1] || "";
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        limpiarErrores();

        const datos = {
            id: document.getElementById("campo-id").value,
            nombre: document.getElementById("nombre").value.trim(),
            tipo: document.getElementById("tipo").value,
            impacto: Number(document.getElementById("impacto").value),
            fuente: document.getElementById("fuente").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            propagacion: document.getElementById("propagacion").value.trim(),
            indicadores: document.getElementById("indicadores").value.trim(),
            prevenciones: [
                document.getElementById("prevencion1").value.trim(),
                document.getElementById("prevencion2").value.trim()
            ]
        };

        if (!validarFormulario(datos)) return;

        guardarRegistroAmenaza(datos);
        const alerta = document.getElementById("mensaje-form");
        alerta.className = "alerta alerta-exito";
        alerta.textContent = "Amenaza guardada correctamente. Redirigiendo...";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);
    });
}

function validarFormulario(d) {
    let valido = true;

    if (d.nombre.length < 3) {
        mostrarError("nombre", "err-nombre", "Ingrese un nombre de al menos 3 caracteres.");
        valido = false;
    }
    if (!d.tipo) {
        mostrarError("tipo", "err-tipo", "Seleccione un tipo de amenaza.");
        valido = false;
    }
    if (!d.impacto || d.impacto < 1 || d.impacto > 5) {
        mostrarError("impacto", "err-impacto", "Seleccione un nivel del 1 al 5.");
        valido = false;
    }
    if (!validarUrlSegura(d.fuente)) {
        mostrarError("fuente", "err-fuente", "La URL debe iniciar con http:// o https://.");
        valido = false;
    }
    if (d.descripcion.length < 20 || d.descripcion.length > 400) {
        mostrarError("descripcion", "err-descripcion", "La descripcion debe tener entre 20 y 400 caracteres.");
        valido = false;
    }
    if (d.propagacion.length < 5) {
        mostrarError("propagacion", "err-propagacion", "Explique la forma de propagacion.");
        valido = false;
    }
    if (d.indicadores.length < 5) {
        mostrarError("indicadores", "err-indicadores", "Ingrese al menos un indicador.");
        valido = false;
    }
    if (d.prevenciones[0].length < 5) {
        mostrarError("prevencion1", "err-prevencion1", "Ingrese la primera medida de prevencion.");
        valido = false;
    }
    if (d.prevenciones[1].length < 5) {
        mostrarError("prevencion2", "err-prevencion2", "Ingrese la segunda medida de prevencion.");
        valido = false;
    }

    return valido;
}

function mostrarError(idCampo, idError, mensaje) {
    document.getElementById(idCampo).classList.add("campo-invalido");
    document.getElementById(idError).textContent = "Error: " + mensaje;
}

function limpiarErrores() {
    document.querySelectorAll(".campo-invalido").forEach((el) => el.classList.remove("campo-invalido"));
    document.querySelectorAll(".texto-error").forEach((el) => (el.textContent = ""));
}

/* --- PAGINA 3: COMPARADOR --- */
function iniciarComparador() {
    const selectA = document.getElementById("select-a");
    const selectB = document.getElementById("select-b");
    const contenedor = document.getElementById("contenedor-comparar");
    const alerta = document.getElementById("mensaje-comparar");
    const lista = leerAmenazas();

    lista.forEach((item) => {
        const opA = document.createElement("option");
        opA.value = item.id;
        opA.textContent = item.nombre + " (" + item.tipo + ")";
        selectA.appendChild(opA);
        selectB.appendChild(opA.cloneNode(true));
    });

    if (lista.length > 1) selectB.value = lista[1].id;

    function renderizarComparacion() {
        contenedor.textContent = "";
        const itemA = buscarPorId(selectA.value);
        const itemB = buscarPorId(selectB.value);

        if (itemA && itemB) {
            alerta.className = itemA.id === itemB.id ? "alerta alerta-info" : "alerta oculto";
            alerta.textContent = "Selecciono la misma amenaza en ambos lados.";
            contenedor.appendChild(crearTarjetaDOM(itemA, false, null));
            contenedor.appendChild(crearTarjetaDOM(itemB, false, null));
        }
    }

    selectA.addEventListener("change", renderizarComparacion);
    selectB.addEventListener("change", renderizarComparacion);
    renderizarComparacion();
}