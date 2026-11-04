import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { CATEGORIAS } from "@/lib/categorias";

export default function Navbar() {
    return (
        <header className="border-b border-borde bg-crema">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
                    <Link
                        href="/"
                        className="font-titulos text-2xl font-semibold text-hoja-oscuro"
                    >
                        Vivero Varden
                    </Link>

                    <form
                        action="/productos"
                        className="order-last flex w-full items-center gap-2 rounded-lg border border-borde bg-white px-3 py-2 md:order-none md:w-auto md:flex-1"
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
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-sm font-medium text-tinta hover:text-hoja"
                        >
                            <User size={20} />
                            <span className="hidden sm:inline">Ingresar / Mi Cuenta</span>
                        </Link>
                        <Link
                            href="/carrito"
                            className="flex items-center gap-2 rounded-lg bg-tierra px-4 py-2 text-sm font-medium text-white hover:bg-tierra-oscuro"
                        >
                            <ShoppingBag size={18} />
                            Carrito
                        </Link>
                    </div>
                </div>

                <nav className="flex gap-6 overflow-x-auto pb-3 text-sm font-medium text-hoja">
                    {CATEGORIAS.map((categoria) => (
                        <Link
                            key={categoria}
                            href={`/productos?categoria=${encodeURIComponent(categoria)}`}
                            className="whitespace-nowrap hover:text-hoja-oscuro hover:underline"
                        >
                            {categoria}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}