import { z } from "zod";

export const productoSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio")
        .max(150, "Máximo 150 caracteres"),
    descripcion: z.string(),
    precio: z
        .string()
        .min(1, "El precio es obligatorio")
        .regex(/^\d{1,8}(\.\d{1,2})?$/, "Ingresá un precio válido (hasta 2 decimales, con punto)"),
    stock: z.string().regex(/^\d+$/, "El stock debe ser un número entero, 0 o mayor"),
    tamano: z.enum(["", "chica", "mediana", "grande"]),
    imagen: z.union([z.literal(""), z.string().url("Ingresá una URL válida")]),
    activo: z.boolean(),
    categoria: z.string().min(1, "Elegí una categoría"),
    proveedor: z.string().min(1, "Elegí un proveedor"),
    especie: z.string(),
    etiquetas: z.array(z.string()),
});