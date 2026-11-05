import { borrarComentario } from "@/app/actions";
import BotonEliminar from "@/components/BotonEliminar";
import EstadoVacio from "@/components/EstadoVacio";

export default function ListaComentarios({ comentarios, perfil }) {
    if (comentarios.length === 0) {
        return (
            <EstadoVacio
                titulo="Todavía no hay comentarios"
                mensaje="Sé el primero en opinar sobre este producto."
            />
        );
    }

    return (
        <ul className="space-y-3">
            {comentarios.map((comentario) => {
                // Puede borrar el autor del comentario o el staff
                const puedeBorrar =
                    perfil && (perfil.is_staff || perfil.username === comentario.autor);

                return (
                    <li
                        key={comentario.id}
                        className="rounded-xl border border-borde bg-superficie p-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-titulo">
                                    {comentario.autor}
                                </p>
                                <p className="text-xs text-tinta-suave">
                                    {new Date(comentario.fecha).toLocaleDateString("es-AR", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            {puedeBorrar && (
                                <BotonEliminar
                                    id={comentario.id}
                                    nombre="este comentario"
                                    accion={borrarComentario}
                                />
                            )}
                        </div>
                        <p className="mt-2 whitespace-pre-line text-sm">{comentario.texto}</p>
                    </li>
                );
            })}
        </ul>
    );
}