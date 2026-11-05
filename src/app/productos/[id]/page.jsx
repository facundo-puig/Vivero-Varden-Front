import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sprout } from "lucide-react";
import {
    getCategorias,
    getComentarios,
    getEspecies,
    getEtiquetas,
    getPerfil,
    getProducto,
} from "@/lib/api";
import { TAMANOS, formatearPrecio } from "@/lib/productos";
import CuidadosEspecie from "@/components/productos/CuidadosEspecie";
import FormularioComentario from "@/components/productos/FormularioComentario";
import ListaComentarios from "@/components/productos/ListaComentarios";
import BotonWhatsapp from "@/components/productos/BotonWhatsapp";

export const metadata = { title: "Producto | Vivero Varden" };

export default async function PaginaDetalleProducto({ params }) {
    const { id } = await params;

    const producto = await getProducto(id);
    if (!producto) notFound();

    const [categorias, etiquetas, especies, comentarios, perfil] = await Promise.all([
        getCategorias(),
        getEtiquetas(),
        getEspecies(),
        getComentarios({ producto: id }),
        getPerfil(),
    ]);

    // El detalle de la API devuelve ids: buscamos el nombre de cada uno
    const categoria = categorias.find((item) => item.id === producto.categoria);
    const etiquetasProducto = etiquetas.filter((item) => producto.etiquetas.includes(item.id));
    const especie = especies.find((item) => item.id === producto.especie);
    const tamano = TAMANOS.find((item) => item.valor === producto.tamano);

    return (
        <section>
            <Link
                href="/productos"
                className="mb-6 inline-flex items-center gap-1 text-sm text-enlace hover:underline"
            >
                <ArrowLeft size={16} />
                Volver al catálogo
            </Link>

            <div className="grid gap-8 md:grid-cols-2">
                {producto.imagen ? (
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="h-80 w-full rounded-xl object-cover md:h-full"
                    />
                ) : (
                    <div className="flex h-80 items-center justify-center rounded-xl bg-brote text-enlace md:h-full">
                        <Sprout size={80} />
                    </div>
                )}

                <div>
                    <p className="text-xs font-semibold uppercase text-tierra">{categoria?.nombre}</p>
                    <h1 className="mt-1 font-titulos text-3xl font-semibold text-titulo">
                        {producto.nombre}
                    </h1>
                    <p className="mt-3 font-titulos text-3xl">{formatearPrecio(producto.precio)}</p>

                    <p className={`mt-1 text-sm ${producto.stock === 0 ? "font-semibold text-error" : "text-tinta-suave"}`}>
                        {producto.stock === 0 ? "Sin stock" : `${producto.stock} disponibles`}
                    </p>

                    {tamano && <p className="mt-1 text-sm text-tinta-suave">Tamaño: {tamano.etiqueta}</p>}

                    <BotonWhatsapp producto={producto} />

                    {etiquetasProducto.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {etiquetasProducto.map((etiqueta) => (
                                <span
                                    key={etiqueta.id}
                                    className="rounded-full bg-brote px-3 py-1 text-xs text-titulo"
                                >
                                    {etiqueta.nombre}
                                </span>
                            ))}
                        </div>
                    )}

                    {producto.descripcion && <p className="mt-5 text-sm">{producto.descripcion}</p>}
                </div>
            </div>

            {especie && (
                <div className="mt-10">
                    <CuidadosEspecie especie={especie} />
                </div>
            )}

            <section className="mt-10">
                <h2 className="font-titulos text-2xl font-semibold text-titulo">
                    Comentarios ({comentarios.length})
                </h2>

                <div className="mt-4 rounded-xl border border-borde bg-superficie p-5">
                    {perfil ? (
                        <FormularioComentario productoId={producto.id} />
                    ) : (
                        <p className="text-sm text-tinta-suave">
                            <Link href="/login" className="font-medium text-enlace hover:underline">
                                Iniciá sesión
                            </Link>{" "}
                            para dejar un comentario.
                        </p>
                    )}
                </div>

                <div className="mt-6">
                    <ListaComentarios comentarios={comentarios} perfil={perfil} />
                </div>
            </section>
        </section>
    );
}