"use client";

import { Moon, Sun } from "lucide-react";
import { useTema } from "@/context/TemaContext";

export default function BotonTema() {
    const { tema, alternarTema } = useTema();

    return (
        <button
            type="button"
            onClick={alternarTema}
            aria-label={tema === "claro" ? "Activar modo oscuro" : "Activar modo claro"}
            className="rounded-lg p-2 text-tinta-suave hover:bg-brote"
        >
            {tema === "claro" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}