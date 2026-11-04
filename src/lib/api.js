import { cache } from "react";
import { getToken } from "@/lib/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
    categorias: "/api/categorias/",
    etiquetas: "/api/etiquetas/",
    especies: "/api/especies/",
    guiasCuidado: "/api/guias-cuidado/",
    proveedores: "/api/proveedores/",
    productos: "/api/productos/",
    comentarios: "/api/comentarios/",
    login: "/api/auth/login/",
    perfil: "/api/auth/perfil/",
};

async function armarHeaders() {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// Arma el query string. Ignora vacíos y repite la clave si el valor es una lista
function armarParametros(filtros = {}) {
    const parametros = new URLSearchParams();
    for (const [clave, valor] of Object.entries(filtros)) {
        if (Array.isArray(valor)) {
            valor.forEach((item) => parametros.append(clave, item));
        } else if (valor !== undefined && valor !== null && valor !== "") {
            parametros.set(clave, valor);
        }
    }
    return parametros;
}

// Recorre todas las páginas y devuelve una lista (para selects y datos chicos)
async function list(path, filtros = {}) {
    const headers = await armarHeaders();

    let page = 1;
    let all = [];
    while (true) {
        const params = armarParametros({ ...filtros, page });
        const res = await fetch(`${API_URL}${path}?${params}`, { headers, cache: "no-store" });
        if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}`);
        const data = await res.json();
        if (Array.isArray(data)) return data;
        all = all.concat(data.results ?? []);
        if (!data.next) return all;
        page += 1;
    }
}

// Pide una página y devuelve { count, next, previous, results }. null si no existe
async function pagina(path, filtros = {}) {
    const headers = await armarHeaders();
    const params = armarParametros(filtros);
    const res = await fetch(`${API_URL}${path}?${params}`, { headers, cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}`);
    return res.json();
}

// Un solo objeto por id. null si no existe
async function detalle(path, id) {
    const headers = await armarHeaders();
    const res = await fetch(`${API_URL}${path}${id}/`, { headers, cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}${id}/`);
    return res.json();
}

export const getCategorias = () => list(ENDPOINTS.categorias);
export const getEtiquetas = () => list(ENDPOINTS.etiquetas);
export const getEspecies = () => list(ENDPOINTS.especies);
export const getProveedores = () => list(ENDPOINTS.proveedores);
export const getComentarios = (filtros) => list(ENDPOINTS.comentarios, filtros);

export const getProductos = (filtros) => list(ENDPOINTS.productos, filtros);
export const getProductosPagina = (filtros) => pagina(ENDPOINTS.productos, filtros);
export const getProductosBajoStock = (filtros) =>
    pagina(`${ENDPOINTS.productos}bajo_stock/`, filtros);
export const getProducto = (id) => detalle(ENDPOINTS.productos, id);

export async function getOpcionesProducto() {
    const [categorias, proveedores, especies, etiquetas] = await Promise.all([
        getCategorias(),
        getProveedores(),
        getEspecies(),
        getEtiquetas(),
    ]);
    return { categorias, proveedores, especies, etiquetas };
}

// Datos del usuario logueado (incluye is_staff). null si no hay sesión válida.
// cache() evita repetir la llamada si se pide dos veces en la misma request
export const getPerfil = cache(async () => {
    const token = await getToken();
    if (!token) return null;
    try {
        const res = await fetch(`${API_URL}${ENDPOINTS.perfil}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
});