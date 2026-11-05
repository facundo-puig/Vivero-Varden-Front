"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaComentario } from "@/app/validations/ComentarioSchema";
import { crearComentario } from "@/app/actions";

export default function FormularioComentario({ productoId }) {
    const router = useRouter();
    const [errorGeneral, setErrorGeneral] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(esquemaComentario),
        defaultValues: { texto: "" },
    });

    async function alEnviar(datos) {
        setErrorGeneral("");
        const resultado = await crearComentario({
            producto: Number(productoId),
            texto: datos.texto,
        });

        if (resultado.error) {
            setErrorGeneral(resultado.error);
            return;
        }

        reset();
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit(alEnviar)} className="space-y-3" noValidate>
            {errorGeneral && (
                <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
                    {errorGeneral}
                </p>
            )}

            <label className="block text-sm font-medium">
                Tu comentario
                <textarea
                    rows={3}
                    {...register("texto")}
                    className="mt-1 w-full rounded-lg border border-borde bg-superficie px-3 py-2 text-sm outline-none focus:border-hoja"
                />
            </label>
            {errors.texto && <p className="text-sm text-error">{errors.texto.message}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-hoja px-4 py-2 text-sm font-medium text-white hover:bg-hoja-oscuro disabled:opacity-60"
            >
                {isSubmitting ? "Publicando..." : "Publicar comentario"}
            </button>
        </form>
    );
}