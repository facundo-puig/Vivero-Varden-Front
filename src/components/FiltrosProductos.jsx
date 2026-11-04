import Link from "next/link";
import { GRUPOS_ETIQUETA, TAMANOS } from "@/lib/productos";

const ORDENES = [
    { valor: "", etiqueta: "Por defecto" },
    { valor: "precio", etiqueta: "Precio: menor a mayor" },
    { valor: "-precio", etiqueta: "Precio: mayor a menor" },
    { valor: "nombre", etiqueta: "Nombre: A a Z" },
    { valor: "-nombre", etiqueta: "Nombre: Z a A" },
];

const claseCampo =
    "mt-1 w-full rounded-lg border border-borde bg-white px-3 py-2 text-sm outline-none focus:border-hoja";

export default function FiltrosProductos({ filtros, categorias, etiquetas }) {
    // Agrupa las etiquetas por su grupo (ubicación, clima, etc.)
    const etiquetasPorGrupo = etiquetas.reduce((acumulado, etiqueta) => {
        (acumulado[etiqueta.grupo] ??= []).push(etiqueta);
        return acumulado;
    }, {});

    return (
        <form
            action="/productos"
            className="space-y-5 rounded-xl border border-borde bg-white p-5"
        >
            <label className="block text-sm font-medium">
                Buscar
                <input
                    type="search"
                    name="search"
                    defaultValue={filtros.search}
                    placeholder="Nombre o descripción"
                    className={claseCampo}
                />
            </label>

            <label className="block text-sm font-medium">
                Ordenar por
                <select name="ordering" defaultValue={filtros.ordering} className={claseCampo}>
                    {ORDENES.map((orden) => (
                        <option key={orden.valor} value={orden.valor}>
                            {orden.etiqueta}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block text-sm font-medium">
                Categoría
                <select name="categoria" defaultValue={filtros.categoria} className={claseCampo}>
                    <option value="">Todas</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block text-sm font-medium">
                Tamaño
                <select name="tamano" defaultValue={filtros.tamano} className={claseCampo}>
                    <option value="">Todos</option>
                    {TAMANOS.map((tamano) => (
                        <option key={tamano.valor} value={tamano.valor}>
                            {tamano.etiqueta}
                        </option>
                    ))}
                </select>
            </label>

            <fieldset className="space-y-3">
                <legend className="text-sm font-medium">Etiquetas</legend>
                {Object.entries(etiquetasPorGrupo).map(([grupo, lista]) => (
                    <div key={grupo}>
                        <p className="text-xs font-semibold uppercase text-tinta-suave">
                            {GRUPOS_ETIQUETA[grupo] ?? grupo}
                        </p>
                        <div className="mt-1 space-y-1">
                            {lista.map((etiqueta) => (
                                <label key={etiqueta.id} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        name="etiquetas"
                                        value={etiqueta.id}
                                        defaultChecked={filtros.etiquetas.includes(String(etiqueta.id))}
                                    />
                                    {etiqueta.nombre}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </fieldset>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    className="flex-1 rounded-lg bg-hoja px-4 py-2 text-sm font-medium text-white hover:bg-hoja-oscuro"
                >
                    Aplicar filtros
                </button>
                <Link href="/productos" className="text-sm text-tinta-suave hover:underline">
                    Limpiar
                </Link>
            </div>
        </form>
    );
}