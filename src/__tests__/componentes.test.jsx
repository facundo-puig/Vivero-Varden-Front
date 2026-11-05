import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import EstadoVacio from "@/components/ui/EstadoVacio";
import BotonTema from "@/components/layout/BotonTema";
import { TemaProvider } from "@/context/TemaContext";

describe("EstadoVacio", () => {
    it("muestra el título y el mensaje", () => {
        render(<EstadoVacio titulo="No encontramos productos" mensaje="Probá otros filtros." />);
        expect(screen.getByText("No encontramos productos")).toBeInTheDocument();
        expect(screen.getByText("Probá otros filtros.")).toBeInTheDocument();
    });

    it("no muestra mensaje si no se le pasa", () => {
        render(<EstadoVacio titulo="Sin datos" />);
        expect(screen.getByText("Sin datos")).toBeInTheDocument();
        expect(screen.queryByText("Probá otros filtros.")).not.toBeInTheDocument();
    });
});

describe("TemaContext", () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove("dark");
    });

    it("el botón alterna entre modo claro y oscuro", () => {
        render(
            <TemaProvider>
                <BotonTema />
            </TemaProvider>
        );

        const boton = screen.getByRole("button", { name: "Activar modo oscuro" });
        fireEvent.click(boton);

        expect(document.documentElement).toHaveClass("dark");
        expect(localStorage.getItem("tema")).toBe("oscuro");
        expect(screen.getByRole("button", { name: "Activar modo claro" })).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Activar modo claro" }));
        expect(document.documentElement).not.toHaveClass("dark");
    });
});