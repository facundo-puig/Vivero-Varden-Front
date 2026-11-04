"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/validations/LoginSchema";
import { login } from "@/app/actions";

export default function FormularioLogin() {
    const [estado, accion, pendiente] = useActionState(login, null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    // RHF valida con Zod; solo si es válido se llama a la Server Action
    function alEnviar(datos) {
        startTransition(() => accion(datos));
    }

    return (
        <form
            onSubmit={handleSubmit(alEnviar)}
            className="mx-auto w-full max-w-sm space-y-4 rounded-xl border border-borde bg-white p-6 shadow-sm"
            noValidate
        >
            <h1 className="font-titulos text-2xl font-semibold text-hoja-oscuro">
                Ingresar
            </h1>

            {estado?.error && (
                <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
                    {estado.error}
                </p>
            )}

            <div>
                <label htmlFor="username" className="text-sm font-medium">
                    Usuario
                </label>
                <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    {...register("username")}
                    className="mt-1 w-full rounded-lg border border-borde px-3 py-2 text-sm outline-none focus:border-hoja"
                />
                {errors.username && (
                    <p className="mt-1 text-sm text-error">{errors.username.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password")}
                    className="mt-1 w-full rounded-lg border border-borde px-3 py-2 text-sm outline-none focus:border-hoja"
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={pendiente}
                className="w-full rounded-lg bg-hoja px-4 py-2 text-sm font-medium text-white hover:bg-hoja-oscuro disabled:opacity-60"
            >
                {pendiente ? "Ingresando..." : "Ingresar"}
            </button>

            {pendiente && (
                <p className="text-center text-xs text-tinta-suave">
                    Si la API estaba dormida, puede tardar hasta un minuto.
                </p>
            )}
        </form>
    );
}