import { z } from "zod";

export const esquemaComentario = z.object({
    texto: z
        .string()
        .trim()
        .min(1, "Escribí un comentario")
        .max(1000, "Máximo 1000 caracteres"),
});