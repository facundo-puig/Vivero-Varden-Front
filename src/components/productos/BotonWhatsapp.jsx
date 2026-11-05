import { MessageCircle } from "lucide-react";
import { NUMERO_WHATSAPP, formatearPrecio } from "@/lib/productos";

export default function BotonWhatsapp({ producto }) {
    const mensaje = `Hola! Quisiera consultar por "${producto.nombre}" (${formatearPrecio(producto.precio)}).`;

    return (
        <a
            href={`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-tierra px-5 py-2.5 text-sm font-medium text-white hover:bg-tierra-oscuro"
        >
            <MessageCircle size={18} />
            Consultar por WhatsApp
        </a>
    );
}