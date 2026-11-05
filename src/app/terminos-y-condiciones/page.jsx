import PaginaTexto from "@/components/PaginaTexto";

export const metadata = { title: "Términos y condiciones | Vivero Varden" };

const SECCIONES = [
    {
        titulo: "1. Uso del sitio",
        texto:
            "Este sitio presenta el catálogo de Vivero Varden con fines informativos. Al usarlo aceptás estos términos. Nos reservamos el derecho de modificarlos en cualquier momento.",
    },
    {
        titulo: "2. Productos y precios",
        texto:
            "Los precios están expresados en pesos argentinos y pueden cambiar sin previo aviso. La disponibilidad depende del stock del vivero y puede no estar actualizada al instante. Las fotos y descripciones son orientativas: al ser seres vivos, cada planta puede variar en tamaño y aspecto.",
    },
    {
        titulo: "3. Cuentas de usuario",
        texto:
            "Para comentar es necesario crear una cuenta. Cada persona es responsable de mantener la confidencialidad de su contraseña y de lo que se publique con su usuario.",
    },
    {
        titulo: "4. Comentarios",
        texto:
            "Esperamos opiniones respetuosas y relacionadas con el producto. Podemos eliminar comentarios ofensivos, engañosos o que no correspondan.",
    },
    {
        titulo: "5. Cuidado de las plantas",
        texto:
            "Las guías de cuidados son recomendaciones generales. Los resultados dependen de las condiciones de cada hogar, como la luz, el riego y el clima.",
    },
    {
        titulo: "6. Contacto",
        texto:
            "Ante cualquier consulta, escribinos por WhatsApp o visitanos en el vivero.",
    },
];

export default function PaginaTerminos() {
    return (
        <PaginaTexto
            titulo="Términos y condiciones"
            introduccion="Condiciones generales de uso del sitio de Vivero Varden."
        >
            {SECCIONES.map((seccion) => (
                <section key={seccion.titulo}>
                    <h2 className="font-semibold text-titulo">{seccion.titulo}</h2>
                    <p className="mt-1 text-sm text-tinta-suave">{seccion.texto}</p>
                </section>
            ))}
        </PaginaTexto>
    );
}