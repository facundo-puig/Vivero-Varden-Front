import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { getProductosPagina } from "@/lib/api";
import { TAMANO_PAGINA } from "@/lib/productos";
import TablaProductos from "@/components/TablaProductos";
import Paginacion from "@/components/Paginacion";
import EstadoVacio from "@/components/EstadoVacio";

export const metadata = { title: "Productos | Panel" };

export default async function PaginaProductosDashboard({ searchParams }) {
    const { page = "1" } = await searchParams;
    const datos = await getProductosPagina({ page });

    if (!datos) {
        // Si la página ya no existe (se borró el último de la última página), volvemos a la primera
        if (page !== "1") redirect("/dashboard/productos");
        notFound();
    }

    const totalPaginas = Math.ceil(datos.count / TAMANO_PAGINA);

    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Productos ({datos.count})</h2>
                <Link
                    href="/dashboard/productos/nuevo"
                    className="flex items-center gap-2 rounded-lg bg-hoja px-4 py-2 text-sm font-medium text-white hover:bg-hoja-oscuro"
                >
                    <Plus size={18} />
                    Nuevo producto
                </Link>
            </div>

            {datos.results.length === 0 ? (
                <EstadoVacio
                    titulo="Todavía no hay productos"
                    mensaje="Creá el primero con el botón de arriba."
                />
            ) : (
                <TablaProductos productos={datos.results} />
            )}

            <Paginacion
                paginaActual={Number(page)}
                totalPaginas={totalPaginas}
                ruta="/dashboard/productos"
            />
        </section>
    );
}