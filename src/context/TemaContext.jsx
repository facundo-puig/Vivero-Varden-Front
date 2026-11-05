"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TemaContext = createContext(null);

export function TemaProvider({ children }) {
    const [tema, setTema] = useState("claro");

    // Al cargar, recupera el tema que el usuario eligió la última vez
    useEffect(() => {
        if (localStorage.getItem("tema") === "oscuro") setTema("oscuro");
    }, []);

    // Cada vez que cambia, agrega o saca la clase "dark" del <html>
    useEffect(() => {
        document.documentElement.classList.toggle("dark", tema === "oscuro");
    }, [tema]);

    function alternarTema() {
        const nuevo = tema === "claro" ? "oscuro" : "claro";
        setTema(nuevo);
        localStorage.setItem("tema", nuevo);
    }

    return (
        <TemaContext.Provider value={{ tema, alternarTema }}>
            {children}
        </TemaContext.Provider>
    );
}

export function useTema() {
    return useContext(TemaContext);
}