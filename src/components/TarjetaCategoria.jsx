import Link from "next/link";
import { Leaf } from "lucide-react";

export default function TarjetaCategoria({ categoria }) {
    return (
        <Link
            href={`/productos?categoria=${categoria.id}`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-borde bg-superficie p-5 text-center transition hover:border-hoja hover:shadow-md"
        >
            <span className="flex size-14 items-center justify-center rounded-full bg-brote text-enlace transition group-hover:bg-hoja group-hover:text-white">
                <Leaf size={26} />
            </span>
            <span className="font-titulos text-lg font-semibold text-titulo">
                {categoria.nombre}
            </span>
            {categoria.descripcion && (
                <span className="line-clamp-2 text-xs text-tinta-suave">
                    {categoria.descripcion}
                </span>
            )}
        </Link>
    );
}