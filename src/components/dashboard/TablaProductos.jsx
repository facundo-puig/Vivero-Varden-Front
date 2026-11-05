import Link from "next/link";
import { Pencil } from "lucide-react";
import { eliminarProducto } from "@/app/actions";
import { formatearPrecio } from "@/lib/productos";
import BotonEliminar from "@/components/ui/BotonEliminar";

export default function TablaProductos({ productos }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-borde bg-superficie">
            <table className="w-full text-left text-sm">
                <thead className="bg-brote/60 text-xs uppercase text-tinta-suave">
                    <tr>
                        <th className="px-4 py-3">Nombre</th>
                        <th className="px-4 py-3">Categoría</th>
                        <th className="px-4 py-3">Proveedor</th>
                        <th className="px-4 py-3">Precio</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id} className="border-t border-borde">
                            <td className="px-4 py-3 font-medium">{producto.nombre}</td>
                            <td className="px-4 py-3">{producto.categoria?.nombre}</td>
                            <td className="px-4 py-3">{producto.proveedor?.nombre}</td>
                            <td className="px-4 py-3">{formatearPrecio(producto.precio)}</td>
                            <td
                                className={`px-4 py-3 ${producto.stock <= 5 ? "font-semibold text-tierra" : ""
                                    }`}
                            >
                                {producto.stock}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-start gap-4">
                                    <Link
                                        href={`/dashboard/productos/${producto.id}/editar`}
                                        className="flex items-center gap-1 text-sm font-medium text-enlace hover:underline"
                                    >
                                        <Pencil size={16} />
                                        Editar
                                    </Link>
                                    <BotonEliminar
                                        id={producto.id}
                                        nombre={producto.nombre}
                                        accion={eliminarProducto}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}