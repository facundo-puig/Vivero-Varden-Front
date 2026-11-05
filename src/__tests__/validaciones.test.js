import { describe, expect, it } from "vitest";
import { loginSchema } from "@/app/validations/LoginSchema";
import { productoSchema } from "@/app/validations/ProductoSchema";
import { valoresIniciales } from "@/lib/productos";

describe("loginSchema", () => {
    it("acepta usuario y contraseña", () => {
        const resultado = loginSchema.safeParse({ username: "admin", password: "clave123" });
        expect(resultado.success).toBe(true);
    });

    it("rechaza campos vacíos con el mensaje de error", () => {
        const resultado = loginSchema.safeParse({ username: "", password: "" });
        expect(resultado.success).toBe(false);
        expect(resultado.error.issues.map((i) => i.message)).toEqual([
            "El usuario es obligatorio",
            "La contraseña es obligatoria",
        ]);
    });
});

describe("productoSchema", () => {
    const valido = {
        ...valoresIniciales(null),
        nombre: "Potus",
        precio: "4500.50",
        categoria: "1",
        proveedor: "2",
    };

    it("acepta un producto bien cargado", () => {
        expect(productoSchema.safeParse(valido).success).toBe(true);
    });

    it("rechaza un precio con más de 2 decimales", () => {
        const resultado = productoSchema.safeParse({ ...valido, precio: "10.999" });
        expect(resultado.success).toBe(false);
    });

    it("rechaza un stock negativo o con decimales", () => {
        expect(productoSchema.safeParse({ ...valido, stock: "-1" }).success).toBe(false);
        expect(productoSchema.safeParse({ ...valido, stock: "2.5" }).success).toBe(false);
    });

    it("exige categoría y proveedor", () => {
        const resultado = productoSchema.safeParse({ ...valido, categoria: "", proveedor: "" });
        expect(resultado.success).toBe(false);
        expect(resultado.error.issues.map((i) => i.message)).toEqual([
            "Elegí una categoría",
            "Elegí un proveedor",
        ]);
    });
});