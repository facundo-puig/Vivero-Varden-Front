import { getOpcionesProducto } from "@/lib/api";
import FormularioProducto from "@/components/dashboard/FormularioProducto";

export const metadata = { title: "Nuevo producto | Panel" };

export default async function PaginaNuevoProducto() {
    const opciones = await getOpcionesProducto();

    return (
        <section>
            <h2 className="mb-4 text-lg font-semibold">Nuevo producto</h2>
            <FormularioProducto {...opciones} />
        </section>
    );
}