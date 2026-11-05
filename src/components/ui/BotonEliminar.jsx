"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BotonEliminar({ id, nombre, accion }) {
    const router = useRouter();
    const [paso, setPaso] = useState("inicio");
    const [error, setError] = useState("");

    async function borrar() {
        setPaso("borrando");
        setError("");
        const resultado = await accion(id);
        if (resultado?.error) {
            setError(resultado.error);
            setPaso("inicio");
        } else {
            router.refresh();
        }
    }

    if (paso === "borrando") {
        return <span className="text-xs text-tinta-suave">Borrando...</span>;
    }

    if (paso === "confirmar") {
        return (
            <span className="inline-flex items-center gap-3">
                <button
                    type="button"
                    onClick={borrar}
                    className="rounded-md bg-error px-2.5 py-1 text-xs font-medium text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
                >
                    Sí, borrar
                </button>
                <button
                    type="button"
                    onClick={() => setPaso("inicio")}
                    className="text-xs text-tinta-suave hover:text-tinta focus-visible:outline-2 focus-visible:outline-hoja"
                >
                    Cancelar
                </button>
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-3">
            {error && (
                <span role="alert" className="text-xs text-error">
                    {error}
                </span>
            )}
            <button
                type="button"
                onClick={() => setPaso("confirmar")}
                aria-label={`Eliminar ${nombre}`}
                className="rounded-md px-2 py-1 text-xs font-medium text-tinta-suave hover:bg-error/10 hover:text-error focus-visible:outline-2 focus-visible:outline-error"
            >
                Eliminar
            </button>
        </span>
    );
}