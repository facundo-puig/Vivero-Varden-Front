import { LUZ, PROPAGACION } from "@/lib/productos";

function Dato({ etiqueta, valor }) {
    if (!valor) return null;
    return (
        <div>
            <dt className="text-xs font-semibold uppercase text-tinta-suave">{etiqueta}</dt>
            <dd className="text-sm">{valor}</dd>
        </div>
    );
}

export default function CuidadosEspecie({ especie }) {
    const guia = especie.guia;
    const hayTemperatura = guia?.temperatura_min != null && guia?.temperatura_max != null;

    return (
        <section className="rounded-xl border border-borde bg-superficie p-5">
            <h2 className="font-titulos text-xl font-semibold text-titulo">
                {especie.nombre_comun}
            </h2>
            <p className="text-sm italic text-tinta-suave">{especie.nombre_cientifico}</p>

            {especie.descripcion && <p className="mt-3 text-sm">{especie.descripcion}</p>}

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <Dato etiqueta="Familia" valor={especie.familia?.nombre} />
                <Dato etiqueta="Origen" valor={especie.origen} />
                <Dato etiqueta="Propagación" valor={PROPAGACION[especie.tipo_propagacion]} />
            </dl>

            {guia && (
                <>
                    <h3 className="mt-5 text-sm font-semibold text-titulo">Cuidados</h3>
                    <dl className="mt-2 grid gap-3 sm:grid-cols-2">
                        <Dato etiqueta="Riego" valor={guia.riego} />
                        <Dato etiqueta="Luz" valor={LUZ[guia.luz]} />
                        <Dato
                            etiqueta="Temperatura"
                            valor={hayTemperatura ? `${guia.temperatura_min}° a ${guia.temperatura_max}°C` : ""}
                        />
                        <Dato etiqueta="Sustrato" valor={guia.sustrato} />
                        <Dato
                            etiqueta="Mascotas"
                            valor={guia.toxica_mascotas ? "Tóxica para mascotas" : "No es tóxica para mascotas"}
                        />
                    </dl>
                </>
            )}
        </section>
    );
}