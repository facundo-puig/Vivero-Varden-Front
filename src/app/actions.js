"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { API_URL, ENDPOINTS } from "@/lib/api";
import { getToken } from "@/lib/auth";

export async function login(_estadoPrevio, datos) {
    const res = await fetch(`${API_URL}${ENDPOINTS.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: datos.username,
            password: datos.password,
        }),
        cache: "no-store",
    }).catch(() => null);

    if (!res) return { error: "No se pudo conectar con la API. Si estaba dormida, prueba de nuevo en unos segundos." };
    if (res.status === 401) return { error: "Usuario o contraseña incorrectos." };
    if (!res.ok) return { error: "La API respondió con un error. Intenta de nuevo." };

    const { access } = await res.json();
    (await cookies()).set("access", access, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 2,
    });
    redirect("/");
}

export async function logout() {
    (await cookies()).delete("access");
    redirect("/login");
}

async function llamar(path, opciones = {}) {
    const token = await getToken();
    return fetch(`${API_URL}${path}`, {
        ...opciones,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
    }).catch(() => null);
}

export async function crearProducto(datos) {
    const res = await llamar(ENDPOINTS.productos, { method: "POST", body: JSON.stringify(datos) });
    if (!res) return { error: "No se pudo conectar con la API." };
    if (res.status === 401 || res.status === 403) return { error: "Tu sesión venció. Vuelve a iniciar sesión." };
    if (!res.ok) return { error: "No se pudo guardar. Revisa los datos del formulario." };
    revalidatePath("/dashboard/productos");
    revalidatePath("/productos");
    return {};
}

export async function editarProducto(id, datos) {
    const res = await llamar(`${ENDPOINTS.productos}${id}/`, { method: "PUT", body: JSON.stringify(datos) });
    if (!res) return { error: "No se pudo conectar con la API." };
    if (res.status === 401 || res.status === 403) return { error: "Tu sesión venció. Vuelve a iniciar sesión." };
    if (!res.ok) return { error: "No se pudo guardar. Revisa los datos del formulario." };
    revalidatePath("/dashboard/productos");
    revalidatePath("/productos");
    return {};
}

export async function eliminarProducto(id) {
    const res = await llamar(`${ENDPOINTS.productos}${id}/`, { method: "DELETE" });
    if (!res) return { error: "Sin conexión con la API." };
    if (res.status === 401 || res.status === 403) return { error: "Sesión vencida." };
    if (!res.ok && res.status !== 404) return { error: "No se pudo borrar." };
    revalidatePath("/dashboard/productos");
    revalidatePath("/productos");
    return {};
}