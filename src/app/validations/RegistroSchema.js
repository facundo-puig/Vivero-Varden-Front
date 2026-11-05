import { z } from "zod";

export const registroSchema = z
    .object({
        username: z.string().trim().min(1, "El usuario es obligatorio").max(150, "Máximo 150 caracteres"),
        email: z.email("Ingresá un email válido"),
        password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
        confirmar: z.string().min(1, "Repetí la contraseña"),
        first_name: z.string().trim(),
        last_name: z.string().trim(),
        telefono: z.string().trim(),
        direccion: z.string().trim(),
        localidad: z.string().trim(),
    })
    .refine((datos) => datos.password === datos.confirmar, {
        message: "Las contraseñas no coinciden",
        path: ["confirmar"],
    });