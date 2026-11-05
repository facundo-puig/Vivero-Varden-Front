import Link from "next/link";

export default function Paginacion({ paginaActual, totalPaginas, ruta, parametros = {} }) {
    if (totalPaginas <= 1) return null;

    function armarHref(numero) {
        const params = new URLSearchParams();
        for (const [clave, valor] of Object.entries(parametros)) {
            if (Array.isArray(valor)) {
                valor.forEach((item) => params.append(clave, item));
            } else if (valor) {
                params.set(clave, valor);
            }
        }
        params.set("page", numero);
        return `${ruta}?${params}`;
    }

    const numeros = Array.from({ length: totalPaginas }, (_, i) => i + 1);

    return (
        <nav className="mt-6 flex items-center justify-center gap-2 text-sm">
            {paginaActual > 1 && (
                <Link href={armarHref(paginaActual - 1)} className="rounded-lg px-3 py-1 hover:bg-brote">
                    Anterior
                </Link>
            )}
            {numeros.map((numero) => (
                <Link
                    key={numero}
                    href={armarHref(numero)}
                    className={`rounded-lg px-3 py-1 ${numero === paginaActual ? "bg-hoja text-white" : "hover:bg-brote"
                        }`}
                >
                    {numero}
                </Link>
            ))}
            {paginaActual < totalPaginas && (
                <Link href={armarHref(paginaActual + 1)} className="rounded-lg px-3 py-1 hover:bg-brote">
                    Siguiente
                </Link>
            )}
        </nav>
    );
}