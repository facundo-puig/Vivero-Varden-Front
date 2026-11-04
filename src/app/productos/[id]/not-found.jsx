import Link from "next/link";

export default function ProductoNoEncontrado() {
    return (
        <div className="py-16 text-center">
            <p className="font-titulos text-3xl text-hoja-oscuro">Producto no encontrado</p>
            <p className="mt-2 text-sm text-tinta-suave">
                Puede que el producto ya no exista o no esté disponible.
            </p>
            <Link href="/productos" className="mt-4 inline-block text-sm text-hoja hover:underline">
                Volver al catálogo
            </Link>
        </div>
    );
}