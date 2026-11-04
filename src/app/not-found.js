import Link from "next/link";

export default function NoEncontrada() {
    return (
        <div className="py-16 text-center">
            <p className="font-titulos text-3xl text-hoja-oscuro">Página no encontrada</p>
            <p className="mt-2 text-sm text-tinta-suave">La dirección que buscás no existe.</p>
            <Link href="/" className="mt-4 inline-block text-sm text-hoja hover:underline">
                Volver al inicio
            </Link>
        </div>
    );
}