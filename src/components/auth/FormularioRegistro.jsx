"use client";

import Link from "next/link";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema } from "@/app/validations/RegistroSchema";
import { registro } from "@/app/actions";

const CLASE_INPUT =
    "mt-1 w-full rounded-lg border border-borde bg-superficie px-3 py-2 text-sm outline-none focus:border-hoja";

export default function FormularioRegistro() {
    const [estado, accion, pendiente] = useActionState(registro, null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registroSchema),
        defaultValues: {
            username: "", email: "", password: "", confirmar: "",
            first_name: "", last_name: "", telefono: "", direccion: "", localidad: "",
        },
    });

    function alEnviar(datos) {
        startTransition(() => accion(datos));
    }

    // Un campo del formulario: etiqueta + input + error de Zod
    function campo(nombre, etiqueta, tipo = "text", autoComplete) {
        return (
            <div>
                <label htmlFor={nombre} className="text-sm font-medium">
                    {etiqueta}
                </label>
                <input
                    id={nombre}
                    type={tipo}
                    autoComplete={autoComplete}
                    {...register(nombre)}
                    className={CLASE_INPUT}
                />
                {errors[nombre] && (
                    <p className="mt-1 text-sm text-error">{errors[nombre].message}</p>
                )}
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(alEnviar)}
            className="mx-auto w-full max-w-lg space-y-4 rounded-xl border border-borde bg-superficie p-6 shadow-sm"
            noValidate
        >
            <h1 className="font-titulos text-2xl font-semibold text-titulo">
                Crear cuenta
            </h1>

            {estado?.error && (
                <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
                    {estado.error}
                </p>
            )}

            {campo("username", "Usuario", "text", "username")}
            {campo("email", "Email", "email", "email")}

            <div className="grid gap-4 sm:grid-cols-2">
                {campo("password", "Contraseña", "password", "new-password")}
                {campo("confirmar", "Repetir contraseña", "password", "new-password")}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {campo("first_name", "Nombre (opcional)", "text", "given-name")}
                {campo("last_name", "Apellido (opcional)", "text", "family-name")}
            </div>

            {campo("telefono", "Teléfono (opcional)", "tel", "tel")}
            {campo("direccion", "Dirección (opcional)", "text", "street-address")}
            {campo("localidad", "Localidad (opcional)", "text", "address-level2")}

            <button
                type="submit"
                disabled={pendiente}
                className="w-full rounded-lg bg-hoja px-4 py-2 text-sm font-medium text-white hover:bg-hoja-oscuro disabled:opacity-60"
            >
                {pendiente ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            {pendiente && (
                <p className="text-center text-xs text-tinta-suave">
                    Si la API estaba dormida, puede tardar hasta un minuto.
                </p>
            )}

            <p className="text-center text-sm text-tinta-suave">
                ¿Ya tenés cuenta?{" "}
                <Link href="/login" className="font-medium text-enlace hover:underline">
                    Ingresá
                </Link>
            </p>
        </form>
    );
}