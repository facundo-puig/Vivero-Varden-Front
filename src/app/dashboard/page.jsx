import Link from "next/link";
import { getProductosPagina, getProductosBajoStock } from "@/lib/api";

export default async function PaginaResumen() {
    const [todos, bajoStock] = await Promise.all([
        getProductosPagina({}),
        getProductosBajoStock({}),
    ]);

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <Link
                href="/dashboard/productos"
                className="rounded-xl border border-borde bg-superficie p-6 hover:border-hoja"
            >
                <p className="text-sm text-tinta-suave">Productos cargados</p>
                <p className="mt-1 font-titulos text-4xl text-titulo">{todos?.count ?? 0}</p>
            </Link>
            <div className="rounded-xl border border-borde bg-superficie p-6">
                <p className="text-sm text-tinta-suave">Con stock bajo (5 o menos)</p>
                <p className="mt-1 font-titulos text-4xl text-tierra">{bajoStock?.count ?? 0}</p>
            </div>
        </div>
    );
}