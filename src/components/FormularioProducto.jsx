"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productoSchema } from "@/app/validations/ProductoSchema";
import {
    armarPayloadProducto,
    valoresIniciales,
    GRUPOS_ETIQUETA,
    TAMANOS,
} from "@/lib/productos";
import { crearProducto, editarProducto } from "@/app/actions";

const claseCampo =
    "mt-1 w-full rounded-lg border border-borde bg-white px-3 py-2 text-sm outline-none focus:border-hoja";

function Campo({ etiqueta, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium">
                {etiqueta}
                {children}
            </label>
            {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
        </div>
    );
}

export default function FormularioProducto({
    producto = null,
    categorias,
    proveedores,
    especies,
    etiquetas,
}) {
    const router = useRouter();
    const [errorGeneral, setErrorGeneral] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(productoSchema),
        defaultValues: valoresIniciales(producto),
    });

    // Agrupa las etiquetas por su grupo (ubicación, clima, etc.)
    const etiquetasPorGrupo = etiquetas.reduce((acumulado, etiqueta) => {
        (acumulado[etiqueta.grupo] ??= []).push(etiqueta);
        return acumulado;
    }, {});

    async function alEnviar(datos) {
        setErrorGeneral("");
        const payload = armarPayloadProducto(datos);
        const resultado = producto
            ? await editarProducto(producto.id, payload)
            : await crearProducto(payload);

        if (resultado.error) {
            setErrorGeneral(resultado.error);
            return;
        }

        router.push("/dashboard/productos");
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit(alEnviar)}
            className="space-y-5 rounded-xl border border-borde bg-white p-6"
            noValidate
        >
            {errorGeneral && (
                <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
                    {errorGeneral}
                </p>
            )}

            <Campo etiqueta="Nombre" error={errors.nombre}>
                <input type="text" {...register("nombre")} className={claseCampo} />
            </Campo>

            <Campo etiqueta="Descripción" error={errors.descripcion}>
                <textarea rows={3} {...register("descripcion")} className={claseCampo} />
            </Campo>

            <div className="grid gap-5 sm:grid-cols-3">
                <Campo etiqueta="Precio (ARS)" error={errors.precio}>
                    <input
                        type="text"
                        inputMode="decimal"
                        placeholder="2800.00"
                        {...register("precio")}
                        className={claseCampo}
                    />
                </Campo>

                <Campo etiqueta="Stock" error={errors.stock}>
                    <input type="number" min="0" {...register("stock")} className={claseCampo} />
                </Campo>

                <Campo etiqueta="Tamaño" error={errors.tamano}>
                    <select {...register("tamano")} className={claseCampo}>
                        <option value="">Sin especificar</option>
                        {TAMANOS.map((tamano) => (
                            <option key={tamano.valor} value={tamano.valor}>
                                {tamano.etiqueta}
                            </option>
                        ))}
                    </select>
                </Campo>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
                <Campo etiqueta="Categoría" error={errors.categoria}>
                    <select {...register("categoria")} className={claseCampo}>
                        <option value="">Elegí una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </Campo>

                <Campo etiqueta="Proveedor" error={errors.proveedor}>
                    <select {...register("proveedor")} className={claseCampo}>
                        <option value="">Elegí un proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.nombre}
                            </option>
                        ))}
                    </select>
                </Campo>

                <Campo etiqueta="Especie (opcional)" error={errors.especie}>
                    <select {...register("especie")} className={claseCampo}>
                        <option value="">Sin especie</option>
                        {especies.map((especie) => (
                            <option key={especie.id} value={especie.id}>
                                {especie.nombre_comun}
                            </option>
                        ))}
                    </select>
                </Campo>
            </div>

            <Campo etiqueta="URL de la imagen (opcional)" error={errors.imagen}>
                <input
                    type="url"
                    placeholder="https://..."
                    {...register("imagen")}
                    className={claseCampo}
                />
            </Campo>

            <fieldset>
                <legend className="text-sm font-medium">Etiquetas</legend>
                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    {Object.entries(etiquetasPorGrupo).map(([grupo, lista]) => (
                        <div key={grupo}>
                            <p className="text-xs font-semibold uppercase text-tinta-suave">
                                {GRUPOS_ETIQUETA[grupo] ?? grupo}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                {lista.map((etiqueta) => (
                                    <label key={etiqueta.id} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            value={String(etiqueta.id)}
                                            {...register("etiquetas")}
                                        />
                                        {etiqueta.nombre}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>

            <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" {...register("activo")} />
                Producto activo (visible en la tienda)
            </label>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-hoja px-5 py-2 text-sm font-medium text-white hover:bg-hoja-oscuro disabled:opacity-60"
                >
                    {isSubmitting ? "Guardando..." : producto ? "Guardar cambios" : "Crear producto"}
                </button>
                <button
                    type="button"
                    onClick={() => router.push("/dashboard/productos")}
                    className="rounded-lg border border-borde px-5 py-2 text-sm font-medium hover:bg-brote"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}