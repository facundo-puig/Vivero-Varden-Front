import Link from "next/link";
import { Sprout } from "lucide-react";
import { formatearPrecio } from "@/lib/productos";

export default function TarjetaProducto({ producto }) {
    return (
        <Link
            href={`/productos/${producto.id}`}
            className="flex flex-col overflow-hidden rounded-xl border border-borde bg-superficie transition hover:border-hoja hover:shadow-md"
        >
            {producto.imagen ? (
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                />
            ) : (
                <div className="flex h-48 items-center justify-center bg-brote text-enlace">
                    <Sprout size={48} />
                </div>
            )}

            <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-semibold uppercase text-tierra">
                    {producto.categoria?.nombre}
                </p>
                <h3 className="mt-1 font-titulos text-lg font-semibold text-titulo">
                    {producto.nombre}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-tinta-suave">
                    {producto.descripcion}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                    {producto.etiquetas.slice(0, 3).map((etiqueta) => (
                        <span
                            key={etiqueta.id}
                            className="rounded-full bg-brote px-2 py-0.5 text-xs text-titulo"
                        >
                            {etiqueta.nombre}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex items-end justify-between pt-4">
                    <p className="font-titulos text-xl font-semibold">
                        {formatearPrecio(producto.precio)}
                    </p>
                    {producto.stock === 0 && (
                        <span className="text-xs font-semibold text-error">Sin stock</span>
                    )}
                </div>
            </div>
        </Link>
    );
}