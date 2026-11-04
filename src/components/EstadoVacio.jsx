export default function EstadoVacio({ titulo, mensaje }) {
    return (
        <div className="rounded-xl border border-dashed border-borde bg-white px-6 py-12 text-center">
            <p className="font-titulos text-xl text-hoja-oscuro">{titulo}</p>
            {mensaje && <p className="mt-2 text-sm text-tinta-suave">{mensaje}</p>}
        </div>
    );
}