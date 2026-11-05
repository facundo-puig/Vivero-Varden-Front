import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle, Sprout } from "lucide-react";
import { getCategorias, getProductosPagina } from "@/lib/api";
import TarjetaCategoria from "@/components/TarjetaCategoria";
import TarjetaProducto from "@/components/TarjetaProducto";
import EstadoVacio from "@/components/EstadoVacio";

const BENEFICIOS = [
  {
    icono: Sprout,
    titulo: "Información de cada especie",
    texto:
      "Familia, origen y forma de propagación de cada planta, para que sepas qué estás llevando.",
  },
  {
    icono: BookOpen,
    titulo: "Guías de cuidado",
    texto:
      "Riego, luz, temperatura y si es tóxica para tus mascotas, en el detalle de cada producto.",
  },
  {
    icono: MessageCircle,
    titulo: "Te ayudamos a elegir",
    texto:
      "Si te queda alguna duda, mirá las preguntas frecuentes o escribinos por WhatsApp.",
  },
];

// Si la API falla, la home igual se muestra (sin esa sección) y el motivo queda en la terminal
function avisarError(error) {
  console.error("Inicio: no se pudo cargar de la API:", error.message);
  return null;
}

export default async function PaginaInicio() {
  const [categorias, datos] = await Promise.all([
    getCategorias().catch(avisarError),
    getProductosPagina({}).catch(avisarError),
  ]);

  const destacados = datos?.results.slice(0, 6) ?? [];

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="rounded-3xl bg-brote p-8 md:p-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-tierra">
            Vivero Varden
          </p>
          <h1 className="mt-3 font-titulos text-4xl font-semibold leading-tight text-hoja-oscuro md:text-5xl">
            Llená tus espacios de vida natural
          </h1>
          <p className="mt-4 max-w-md text-tinta-suave">
            Plantas, árboles, macetas, sustratos y todo lo que necesitás para
            tu jardín, con la información para cuidarlos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/productos"
              className="flex items-center gap-2 rounded-lg bg-tierra px-5 py-2.5 text-sm font-medium text-white hover:bg-tierra-oscuro"
            >
              Ver productos
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#categorias"
              className="rounded-lg border border-hoja px-5 py-2.5 text-sm font-medium text-hoja hover:bg-white"
            >
              Explorar categorías
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      {categorias?.length > 0 && (
        <section id="categorias" className="scroll-mt-8">
          <h2 className="font-titulos text-2xl font-semibold text-hoja-oscuro">
            Explorá nuestro catálogo
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categorias.map((categoria) => (
              <TarjetaCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </section>
      )}

      {/* Beneficios */}
      <section className="grid gap-4 md:grid-cols-3">
        {BENEFICIOS.map(({ icono: Icono, titulo, texto }) => (
          <div key={titulo} className="rounded-xl border border-borde bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-lg bg-brote text-hoja">
              <Icono size={22} />
            </span>
            <h3 className="mt-4 font-titulos text-lg font-semibold text-hoja-oscuro">
              {titulo}
            </h3>
            <p className="mt-2 text-sm text-tinta-suave">{texto}</p>
          </div>
        ))}
      </section>

      {/* Productos destacados */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-titulos text-2xl font-semibold text-hoja-oscuro">
            Productos destacados
          </h2>
          <Link
            href="/productos"
            className="flex items-center gap-1 text-sm font-medium text-hoja hover:underline"
          >
            Ver todo el catálogo
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-6">
          {destacados.length === 0 ? (
            <EstadoVacio
              titulo="No pudimos cargar los productos"
              mensaje="Si la API estaba dormida, recargá la página en unos segundos."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destacados.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}