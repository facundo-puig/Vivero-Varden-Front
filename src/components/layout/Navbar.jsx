import Link from "next/link";
import { LayoutDashboard, LogOut, Search, User } from "lucide-react";
import { getCategorias, getPerfil } from "@/lib/api";
import { logout } from "@/app/actions";
import BotonTema from "@/components/layout/BotonTema";

export default async function Navbar() {
    // Si la API no responde, el navbar igual se muestra (sin categorías)
    const [perfil, categorias] = await Promise.all([
        getPerfil(),
        getCategorias().catch(() => []),
    ]);

    return (
        <header className="border-b border-borde bg-crema">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
                    <Link
                        href="/"
                        className="font-titulos text-2xl font-semibold text-titulo"
                    >
                        Vivero Varden
                    </Link>

                    <form
                        action="/productos"
                        className="order-last flex w-full items-center gap-2 rounded-lg border border-borde bg-superficie px-3 py-2 md:order-none md:w-auto md:flex-1"
                    >
                        <Search size={18} className="text-tinta-suave" />
                        <input
                            type="search"
                            name="search"
                            placeholder="Buscar plantas, macetas, sustratos..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-tinta-suave"
                        />
                    </form>

                    <div className="ml-auto flex items-center gap-4 md:ml-0">
                        <BotonTema />
                        {perfil ? (
                            <>
                                {perfil.is_staff && (
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-2 rounded-lg bg-tierra px-4 py-2 text-sm font-medium text-white hover:bg-tierra-oscuro"
                                    >
                                        <LayoutDashboard size={18} />
                                        Panel
                                    </Link>
                                )}
                                <form action={logout}>
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 text-sm font-medium text-tinta hover:text-enlace"
                                    >
                                        <LogOut size={20} />
                                        <span className="hidden sm:inline">Cerrar sesión</span>
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-lg bg-tierra px-4 py-2 text-sm font-medium text-white hover:bg-tierra-oscuro"
                            >
                                <User size={18} />
                                Ingresar
                            </Link>
                        )}
                    </div>
                </div>

                <nav className="flex gap-6 overflow-x-auto pb-3 text-sm font-medium text-enlace">
                    {categorias.map((categoria) => (
                        <Link
                            key={categoria.id}
                            href={`/productos?categoria=${categoria.id}`}
                            className="whitespace-nowrap hover:text-titulo hover:underline"
                        >
                            {categoria.nombre}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}