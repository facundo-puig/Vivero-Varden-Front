import { notFound } from "next/navigation";
import { getCategorias, getEtiquetas, getProductosPagina } from "@/lib/api";
import { TAMANO_PAGINA } from "@/lib/productos";
import FiltrosProductos from "@/components/FiltrosProductos";
import TarjetaProducto from "@/components/TarjetaProducto";
import Paginacion from "@/components/Paginacion";
import EstadoVacio from "@/components/EstadoVacio";

export const metadata = { title: "Catálogo | Vivero Varden" };

export default async function PaginaCatalogo({ searchParams }) {
    const consulta = await searchParams;

    // Los filtros vienen de la URL (?search=...&categoria=...&etiquetas=1&etiquetas=2)
    const filtros = {
        search: consulta.search ?? "",
        categoria: consulta.categoria ?? "",
        tamano: consulta.tamano ?? "",
        etiquetas: [].concat(consulta.etiquetas ?? []),
        ordering: consulta.ordering ?? "",
    };
    const pagina = consulta.page ?? "1";

    const [datos, categorias, etiquetas] = await Promise.all([
        getProductosPagina({ ...filtros, page: pagina }),
        getCategorias(),
        getEtiquetas(),
    ]);

    if (!datos) notFound();

    const totalPaginas = Math.ceil(datos.count / TAMANO_PAGINA);

    return (
        <section>
            <h1 className="font-titulos text-3xl font-semibold text-hoja-oscuro">
                Nuestra colección
            </h1>
            <p className="mt-1 text-sm text-tinta-suave">
                {datos.count} {datos.count === 1 ? "producto" : "productos"}
            </p>

            <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
                <aside>
                    <FiltrosProductos
                        filtros={filtros}
                        categorias={categorias}
                        etiquetas={etiquetas}
                    />
                </aside>

                <div>
                    {datos.results.length === 0 ? (
                        <EstadoVacio
                            titulo="No encontramos productos"
                            mensaje="Probá con otros filtros o limpiá la búsqueda."
                        />
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {datos.results.map((producto) => (
                                <TarjetaProducto key={producto.id} producto={producto} />
                            ))}
                        </div>
                    )}

                    <Paginacion
                        paginaActual={Number(pagina)}
                        totalPaginas={totalPaginas}
                        ruta="/productos"
                        parametros={filtros}
                    />
                </div>
            </div>
        </section>
    );
}