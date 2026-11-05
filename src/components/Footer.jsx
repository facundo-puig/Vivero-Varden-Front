import Link from "next/link";
import { getCategorias } from "@/lib/api";

import { NUMERO_WHATSAPP } from "@/lib/productos";

export default async function Footer() {
    const categorias = await getCategorias().catch(() => []);

    return (
        <footer className="border-t border-borde bg-brote/40">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p className="font-titulos text-2xl font-semibold text-titulo">
                        Vivero Varden
                    </p>
                    <p className="mt-3 text-sm text-tinta-suave">
                        Vivero dedicado a la selección de plantas, árboles, macetas y todo
                        lo necesario para tu jardín.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-titulo">
                        Colecciones
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-tinta-suave">
                        {categorias.map((categoria) => (
                            <li key={categoria.id}>
                                <Link
                                    href={`/productos?categoria=${categoria.id}`}
                                    className="hover:text-enlace hover:underline"
                                >
                                    {categoria.nombre}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-titulo">Atención</h3>
                    <ul className="mt-3 space-y-2 text-sm text-tinta-suave">
                        <li>
                            <Link
                                href="/preguntas-frecuentes"
                                className="hover:text-enlace hover:underline"
                            >
                                Preguntas frecuentes
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/terminos-y-condiciones"
                                className="hover:text-enlace hover:underline"
                            >
                                Términos y Condiciones
                            </Link>
                        </li>
                        <li>
                            <a
                                href={`https://wa.me/${NUMERO_WHATSAPP}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-enlace hover:underline"
                            >
                                WhatsApp
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-titulo">Visitanos</h3>
                    <p className="mt-3 text-sm text-tinta-suave">Av. Alvear y Ecuador, Río Cuarto, Córdoba</p>
                    <p className="text-sm text-tinta-suave">
                        Martes a domingos: 10:00 a 19:00 hs
                    </p>
                </div>
            </div>

            <div className="border-t border-borde">
                <p className="mx-auto max-w-7xl px-4 py-4 text-sm text-tinta-suave">
                    © {new Date().getFullYear()} Vivero Varden. Río Cuarto, Córdoba.
                </p>
            </div>
        </footer>
    );
}