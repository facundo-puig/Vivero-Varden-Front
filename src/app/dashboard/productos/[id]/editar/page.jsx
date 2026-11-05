import { notFound } from "next/navigation";
import { getOpcionesProducto, getProducto } from "@/lib/api";
import FormularioProducto from "@/components/dashboard/FormularioProducto";

export const metadata = { title: "Editar producto | Panel" };

export default async function PaginaEditarProducto({ params }) {
    const { id } = await params;
    const [producto, opciones] = await Promise.all([
        getProducto(id),
        getOpcionesProducto(),
    ]);
    if (!producto) notFound();

    return (
        <section>
            <h2 className="mb-4 text-lg font-semibold">Editar: {producto.nombre}</h2>
            <FormularioProducto producto={producto} {...opciones} />
        </section>
    );
}