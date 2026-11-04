import Link from "next/link";

export default function NoEncontradoDashboard() {
    return (
        <div className="py-12 text-center">
            <p className="font-titulos text-2xl text-hoja-oscuro">No encontramos lo que buscabas</p>
            <Link href="/dashboard/productos" className="mt-4 inline-block text-sm text-hoja hover:underline">
                Volver a productos
            </Link>
        </div>
    );
}