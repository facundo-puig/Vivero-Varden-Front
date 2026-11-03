import { getToken } from "@/lib/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
    categorias: "/api/categorias/",
    etiquetas: "/api/etiquetas/",
    productos: "/api/productos/",
    comentarios: "/api/comentarios/",
};

async function list(path, filtros = {}) {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    let page = 1;
    let all = [];
    while (true) {
        const params = new URLSearchParams({ ...filtros, page });
        const res = await fetch(`${API_URL}${path}?${params}`, { headers, cache: "no-store" });
        if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}`);
        const data = await res.json();
        if (Array.isArray(data)) return data;
        all = all.concat(data.results ?? []);
        if (!data.next) return all;
        page += 1;
    }
}

export const getCategorias = () => list(ENDPOINTS.categorias);
export const getEtiquetas = () => list(ENDPOINTS.etiquetas);
export const getProductos = (filtros) => list(ENDPOINTS.productos, filtros);
export const getComentarios = (filtros) => list(ENDPOINTS.comentarios, filtros);