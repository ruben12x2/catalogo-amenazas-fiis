// Clave unica para guardar en el navegador
const CLAVE_STORAGE = "catalogo_amenazas_datos";

// Lista inicial de 10 amenazas ficticias/documentadas
const DATOS_EJEMPLO = [
    {
        id: "AMZ-001",
        nombre: "WannaCry",
        tipo: "ransomware",
        impacto: 5,
        descripcion: "Criptogusano que cifra los archivos del equipo y exige un pago para recuperarlos.",
        propagacion: "Vulnerabilidad EternalBlue en el protocolo SMBv1 de red.",
        indicadores: "Archivos con extension .WNCRY y mensaje de rescate en pantalla.",
        prevenciones: ["Actualizar el sistema operativo", "Deshabilitar protocolo SMBv1"],
        fuente: "https://www.incibe.es/ciudadania/blog/wannacry-cinco-anos-despues",
        favorito: true
    },
    {
        id: "AMZ-002",
        nombre: "Spear Phishing",
        tipo: "phishing",
        impacto: 4,
        descripcion: "Correo fraudulento dirigido a un usuario especifico para robar sus credenciales.",
        propagacion: "Correos que suplantan a soporte tecnico o jefaturas.",
        indicadores: "Remitente con dominio alterado y enlaces hacia portales de login falsos.",
        prevenciones: ["Activar autenticacion multifactor (MFA)", "Verificar la URL antes de ingresar datos"],
        fuente: "https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks",
        favorito: true
    },
    {
        id: "AMZ-003",
        nombre: "Troyano Emotet",
        tipo: "malware",
        impacto: 5,
        descripcion: "Malware que roba informacion y descarga otros programas maliciosos en el equipo.",
        propagacion: "Archivos de Word o Excel adjuntos con macros maliciosas.",
        indicadores: "Documentos que piden habilitar contenido de macros al abrirse.",
        prevenciones: ["Bloquear macros de archivos de Internet", "No abrir adjuntos inesperados"],
        fuente: "https://www.incibe.es/empresas/avisos/emotet-vuelve-la-carga-con-nuevas-campanas-de-infeccion",
        favorito: false
    },
    {
        id: "AMZ-004",
        nombre: "Fraude del CEO",
        tipo: "ingenieria social",
        impacto: 4,
        descripcion: "Engano donde el atacante suplanta a un directivo para solicitar transferencias urgentes.",
        propagacion: "Correos electronicos o mensajes directos al area de contabilidad.",
        indicadores: "Pedido urgente, confidencial y fuera de los canales habituales.",
        prevenciones: ["Confirmar pagos por via telefonica", "Usar doble autorizacion para transferencias"],
        fuente: "https://www.incibe.es/empresas/tematicas/fraude-del-ceo",
        favorito: false
    },
    {
        id: "AMZ-005",
        nombre: "Inundacion SYN (DDoS)",
        tipo: "DDoS",
        impacto: 4,
        descripcion: "Saturacion de un servidor mediante miles de conexiones simultaneas incompletas.",
        propagacion: "Redes de dispositivos infectados (botnets) atacando una direccion IP.",
        indicadores: "Caida del sitio web y lentitud extrema en la red.",
        prevenciones: ["Configurar firewall con limite de conexiones", "Usar servicios de mitigacion DDoS"],
        fuente: "https://www.cisa.gov/sites/default/files/publications/understanding-and-responding-to-ddos-attacks_508c.pdf",
        favorito: false
    },
    {
        id: "AMZ-006",
        nombre: "RedLine Stealer",
        tipo: "malware",
        impacto: 4,
        descripcion: "Programa espia que extrae contrasenas y cookies guardadas en el navegador.",
        propagacion: "Descargas de programas piratas y enlaces de publicidad enganosa.",
        indicadores: "Accesos no autorizados a cuentas personales pese a tener contrasena.",
        prevenciones: ["No descargar software pirata", "Usar un gestor de contrasenas cifrado"],
        fuente: "https://owasp.org/Top10/2025/",
        favorito: false
    },
    {
        id: "AMZ-007",
        nombre: "LockBit Ransomware",
        tipo: "ransomware",
        impacto: 5,
        descripcion: "Ransomware de doble extorsion que roba datos antes de cifrar los servidores.",
        propagacion: "Accesos remotos RDP expuestos y credenciales filtradas.",
        indicadores: "Eliminacion de copias de seguridad locales y archivos inaccesibles.",
        prevenciones: ["Mantener copias de seguridad desconectadas", "Cerrar puertos RDP expuestos"],
        fuente: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-165a",
        favorito: false
    },
    {
        id: "AMZ-008",
        nombre: "Smishing Bancario",
        tipo: "phishing",
        impacto: 3,
        descripcion: "Mensajes de texto SMS que fingen alertas de banco o entregas de paquetes.",
        propagacion: "Envio masivo de SMS con enlaces cortos hacia paginas falsas.",
        indicadores: "Enlaces acortados pidiendo claves o datos de tarjeta de credito.",
        prevenciones: ["No abrir enlaces recibidos por SMS", "Entrar siempre desde la aplicacion oficial"],
        fuente: "https://www.incibe.es/ciudadania/blog/smishing-que-es-y-como-protegerse",
        favorito: false
    },
    {
        id: "AMZ-009",
        nombre: "Vishing de Soporte",
        tipo: "ingenieria social",
        impacto: 3,
        descripcion: "Llamada telefonica donde fingen ser soporte tecnico para tomar control del equipo.",
        propagacion: "Llamadas directas al usuario pidiendo instalar programas remotos.",
        indicadores: "Solicitud de instalar programas de acceso remoto o dictar codigos SMS.",
        prevenciones: ["Colgar y llamar al numero oficial de soporte", "No compartir codigos de verificacion"],
        fuente: "https://www.incibe.es/aprendeciberseguridad/vishing",
        favorito: false
    },
    {
        id: "AMZ-010",
        nombre: "Inyeccion SQL (SQLi)",
        tipo: "otro",
        impacto: 5,
        descripcion: "Insercion de comandos SQL en formularios web para leer o alterar la base de datos.",
        propagacion: "Campos de formulario web que no validan ni parametrizan las entradas.",
        indicadores: "Errores de base de datos visibles y consultas con comillas en los registros.",
        prevenciones: ["Usar consultas preparadas (Prepared Statements)", "Validar los datos en el servidor"],
        fuente: "https://owasp.org/www-community/attacks/SQL_Injection",
        favorito: false
    }
];

// Leer lista desde localStorage
function leerAmenazas() {
    const texto = localStorage.getItem(CLAVE_STORAGE);
    if (!texto) {
        guardarAmenazas(DATOS_EJEMPLO);
        return [...DATOS_EJEMPLO];
    }
    try {
        return JSON.parse(texto);
    } catch (e) {
        return [...DATOS_EJEMPLO];
    }
}

// Guardar lista en localStorage
function guardarAmenazas(lista) {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
}

// Cargar los 10 registros de ejemplo
function cargarEjemplos() {
    guardarAmenazas(DATOS_EJEMPLO);
}

// Buscar una amenaza por su ID
function buscarPorId(id) {
    const lista = leerAmenazas();
    return lista.find((item) => item.id === id) || null;
}

// Crear o actualizar una amenaza
function guardarRegistroAmenaza(datos) {
    const lista = leerAmenazas();

    if (datos.id) {
        const indice = lista.findIndex((item) => item.id === datos.id);
        if (indice !== -1) {
            lista[indice] = { ...lista[indice], ...datos };
        }
    } else {
        const nuevoNumero = lista.length + 1;
        const nuevoId = "AMZ-" + String(nuevoNumero).padStart(3, "0");
        lista.push({
            ...datos,
            id: nuevoId,
            favorito: false
        });
    }
    guardarAmenazas(lista);
}

// Eliminar una amenaza por ID
function eliminarAmenaza(id) {
    const lista = leerAmenazas().filter((item) => item.id !== id);
    guardarAmenazas(lista);
}

// Cambiar estado de favorito
function cambiarFavorito(id) {
    const lista = leerAmenazas();
    const encontrado = lista.find((item) => item.id === id);
    if (encontrado) {
        encontrado.favorito = !encontrado.favorito;
        guardarAmenazas(lista);
    }
}