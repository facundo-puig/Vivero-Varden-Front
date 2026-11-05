// Igual que PAGE_SIZE de REST_FRAMEWORK en el back
export const TAMANO_PAGINA = 10;

// Producto.tamano (array porque lo usan los selects)
export const TAMANOS = [
    { valor: "chica", etiqueta: "Chica" },
    { valor: "mediana", etiqueta: "Mediana" },
    { valor: "grande", etiqueta: "Grande" },
];

// Etiqueta.grupo
export const GRUPOS_ETIQUETA = {
    ubicacion: "Ubicación",
    clima: "Clima",
    tipo_planta: "Tipo de planta",
    uso: "Uso",
};

// GuiaCuidado.luz
export const LUZ = {
    poca_luz: "Poca luz",
    sombra: "Sombra",
    media_sombra: "Media sombra",
    pleno_sol: "Pleno sol",
};

// Especie.tipo_propagacion
export const PROPAGACION = {
    semilla: "Semilla",
    esqueje: "Esqueje",
    gajo: "Gajo",
    division: "División",
};

export function formatearPrecio(valor) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(Number(valor));
}

// Valores con los que arranca el formulario (vacío para crear, cargado para editar)
export function valoresIniciales(producto) {
    if (!producto) {
        return {
            nombre: "",
            descripcion: "",
            precio: "",
            stock: "0",
            tamano: "",
            imagen: "",
            activo: true,
            categoria: "",
            proveedor: "",
            especie: "",
            etiquetas: [],
        };
    }

    return {
        nombre: producto.nombre,
        descripcion: producto.descripcion ?? "",
        precio: String(producto.precio),
        stock: String(producto.stock),
        tamano: producto.tamano ?? "",
        imagen: producto.imagen ?? "",
        activo: producto.activo,
        categoria: String(producto.categoria),
        proveedor: String(producto.proveedor),
        especie: producto.especie ? String(producto.especie) : "",
        etiquetas: producto.etiquetas.map(String),
    };
}

// Convierte los valores del formulario (todo texto) en lo que espera la API
export function armarPayloadProducto(datos) {
    return {
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        precio: datos.precio,
        stock: Number(datos.stock),
        tamano: datos.tamano,
        imagen: datos.imagen,
        activo: datos.activo,
        categoria: Number(datos.categoria),
        proveedor: Number(datos.proveedor),
        especie: datos.especie ? Number(datos.especie) : null,
        etiquetas: datos.etiquetas.map(Number),
    };
}

export const NUMERO_WHATSAPP = "5493580000000";