"use client";

export default function ErrorDashboard({ error, reset }) {
    return (
        <div className="rounded-xl border border-error/30 bg-error/5 p-6">
            <p className="font-semibold text-error">No se pudo cargar esta sección</p>
            <p className="mt-1 text-sm text-tinta-suave">{error.message}</p>
            <button
                type="button"
                onClick={() => reset()}
                className="mt-4 rounded-lg bg-hoja px-4 py-2 text-sm font-medium text-white hover:bg-hoja-oscuro"
            >
                Reintentar
            </button>
        </div>
    );
}