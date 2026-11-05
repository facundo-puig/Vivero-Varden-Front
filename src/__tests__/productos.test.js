import { describe, expect, it } from "vitest";
import { armarPayloadProducto, formatearPrecio } from "@/lib/productos";

describe("formatearPrecio", () => {
    it("da formato de pesos argentinos sin decimales", () => {
        // Intl usa un espacio especial entre el símbolo y el número: lo normalizamos
        const texto = formatearPrecio("4500.00").replace(/\s/g, " ");
        expect(texto).toBe("$ 4.500");
    });
});

describe("armarPayloadProducto", () => {
    it("convierte el texto del formulario en lo que espera la API", () => {
        const payload = armarPayloadProducto({
            nombre: "Potus",
            descripcion: "",
            precio: "4500.00",
            stock: "12",
            tamano: "",
            imagen: "",
            activo: true,
            categoria: "1",
            proveedor: "2",
            especie: "",
            etiquetas: ["3", "5"],
        });

        expect(payload.stock).toBe(12);
        expect(payload.categoria).toBe(1);
        expect(payload.proveedor).toBe(2);
        expect(payload.especie).toBeNull();
        expect(payload.etiquetas).toEqual([3, 5]);
    });
});