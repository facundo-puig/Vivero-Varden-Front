import PaginaTexto from "@/components/PaginaTexto";

export const metadata = { title: "Preguntas frecuentes | Vivero Varden" };

const PREGUNTAS = [
    {
        pregunta: "¿Cómo sé qué planta es la mejor para mi casa?",
        respuesta:
            "En el catálogo podés filtrar por ubicación (interior o exterior), clima y tamaño. Cada producto con especie asociada muestra además su guía de cuidados: riego, luz y temperatura.",
    },
    {
        pregunta: "¿Las plantas son tóxicas para las mascotas?",
        respuesta:
            "Depende de la especie. En el detalle de cada producto, dentro de los cuidados, indicamos si la planta es tóxica para mascotas.",
    },
    {
        pregunta: "¿Puedo comprar desde la página?",
        respuesta:
            "Por ahora la página funciona como catálogo. Para consultar disponibilidad o coordinar una compra, escribinos por WhatsApp o visitá el vivero.",
    },
    {
        pregunta: "¿Qué significa que un producto no tenga stock?",
        respuesta:
            "Que por el momento no hay unidades disponibles. Escribinos por WhatsApp para saber cuándo vuelve a ingresar.",
    },
    {
        pregunta: "¿Puedo dejar comentarios sobre un producto?",
        respuesta:
            "Sí. Iniciá sesión y vas a poder comentar en el detalle de cada producto. Podés borrar tus propios comentarios cuando quieras.",
    },
    {
        pregunta: "¿Cuándo puedo visitar el vivero?",
        respuesta: "De martes a domingos, de 10:00 a 19:00 hs.",
    },
];

export default function PaginaPreguntasFrecuentes() {
    return (
        <PaginaTexto
            titulo="Preguntas frecuentes"
            introduccion="Las dudas más comunes sobre nuestras plantas y el catálogo."
        >
            <div className="space-y-3">
                {PREGUNTAS.map((item) => (
                    <details
                        key={item.pregunta}
                        className="rounded-xl border border-borde bg-superficie p-4"
                    >
                        <summary className="cursor-pointer font-medium text-titulo">
                            {item.pregunta}
                        </summary>
                        <p className="mt-3 text-sm text-tinta-suave">{item.respuesta}</p>
                    </details>
                ))}
            </div>
        </PaginaTexto>
    );
}