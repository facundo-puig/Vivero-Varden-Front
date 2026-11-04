import Link from "next/link";
import { redirect } from "next/navigation";
import { requireToken } from "@/lib/auth";
import { getPerfil } from "@/lib/api";

export default async function LayoutDashboard({ children }) {
    await requireToken();
    const perfil = await getPerfil();
    if (!perfil) redirect("/login");
    if (!perfil.is_staff) redirect("/");

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-borde pb-4">
                <h1 className="font-titulos text-2xl font-semibold text-hoja-oscuro">
                    Panel de administración
                </h1>
                <nav className="flex gap-4 text-sm font-medium text-hoja">
                    <Link href="/dashboard" className="hover:underline">
                        Resumen
                    </Link>
                    <Link href="/dashboard/productos" className="hover:underline">
                        Productos
                    </Link>
                </nav>
            </div>
            {children}
        </div>
    );
}