export default function PaginaTexto({ titulo, introduccion, children }) {
    return (
        <article className="mx-auto max-w-3xl">
            <h1 className="font-titulos text-3xl font-semibold text-hoja-oscuro">
                {titulo}
            </h1>
            {introduccion && <p className="mt-2 text-tinta-suave">{introduccion}</p>}
            <div className="mt-8 space-y-6">{children}</div>
        </article>
    );
}