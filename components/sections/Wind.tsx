import Photo from "../ui/Photo";
import Lines from "../ui/Lines";

const DATA = [
  ["Capacidade", "820 MW instalados"],
  ["Localização", "Serra do Espinhaço · MG / BA"],
  ["Operação", "214 aerogeradores · desde 2014"],
];

/** Capítulo 02 — Eólica. Layout invertido: imagem à esquerda, a força do vento. */
export default function Wind() {
  return (
    <section id="eolica" data-scene="Geração eólica" className="relative py-28 md:py-40 xl:py-48" aria-labelledby="eolica-title">
      <div className="container-x grid grid-cols-12 items-center gap-x-4 gap-y-16 md:gap-x-6">
        <Photo
          src="/images/eolica-serra.webp"
          alt="Fileira de aerogeradores sobre a serra ao nascer do sol."
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="col-span-12 aspect-[4/5] rounded-[26px] sm:aspect-[4/3] lg:col-span-7 lg:aspect-[6/7]"
          motion={{ "data-parallax": 9 }}
        />

        <div className="col-span-12 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
          <p data-fade="" className="label text-mute">
            Capítulo 02 — Geração eólica
          </p>
          <Lines
            id="eolica-title"
            lines={["Quando o vento", "vira potência."]}
            
            className="display mt-8 text-[clamp(2.5rem,4vw,4.4rem)]"
          />
          <p data-fade="" className="mt-8 max-w-[36ch] text-graphite">
            Medimos o vento por anos antes de erguer a primeira torre. Cada parque nasce de dados — e de diálogo
            com quem vive ali.
          </p>
          <dl className="mt-14">
            {DATA.map(([k, v]) => (
              <div key={k}>
                <div data-draw="" className="hairline" />
                <div data-fade="" className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="label text-mute">{k}</dt>
                  <dd className="text-right text-[15px]">{v}</dd>
                </div>
              </div>
            ))}
            <div data-draw="" className="hairline" />
          </dl>
        </div>
      </div>
    </section>
  );
}
