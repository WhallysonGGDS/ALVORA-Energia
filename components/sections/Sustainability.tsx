import Photo from "../ui/Photo";
import Lines from "../ui/Lines";
import Eyebrow from "../ui/Eyebrow";

const PILLARS = [
  ["Biodiversidade", "Corredores de vegetação nativa preservados entre as fileiras de módulos."],
  ["Eficiência", "Mais energia por hectare, com rastreadores solares e repotenciação."],
  ["Responsabilidade", "Licenciamento rigoroso e monitoramento ambiental contínuo."],
  ["Desenvolvimento regional", "Mão de obra local e arrendamento que complementa a renda rural."],
];

/** Sustentabilidade — a cena mais leve. A imagem apresenta responsabilidade. */
export default function Sustainability() {
  return (
    <section
      id="sustentabilidade"
      data-scene="Sustentabilidade"
      className="relative bg-sage py-28 md:py-40"
      aria-labelledby="sust-title"
    >
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow n="05">Sustentabilidade</Eyebrow>
            <Lines
              id="sust-title"
              lines={["Desenvolver sem", "deixar para trás."]}
              className="display mt-10 text-forest text-[clamp(2.6rem,5.6vw,6rem)]"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 px-2 md:mt-24 md:px-3">
        <Photo
          src="/images/solar-eolica-lago.webp"
          alt="Módulos solares e aerogeradores entre a mata e um grande lago ao entardecer."
          sizes="100vw"
          className="h-[78svh] min-h-[460px] rounded-[26px] md:h-[92svh] md:rounded-[30px]"
          motion={{ "data-parallax": 5 }}
        />
      </div>

      <div className="container-x mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24">
        <div className="col-span-12 lg:col-span-4">
          <Photo
            src="/images/painel-natureza.webp"
            alt="Módulo solar cercado por vegetação florida."
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="aspect-[4/5] rounded-[22px]"
            motion={{ "data-clip": "up" }}
          />
        </div>
        <ol className="col-span-12 lg:col-span-7 lg:col-start-6 lg:self-end">
          {PILLARS.map(([t, d], i) => (
            <li key={t}>
              <div data-draw="" className="hairline text-forest" />
              <div data-fade="" className="grid grid-cols-[3rem_1fr] gap-4 py-7 md:grid-cols-[4rem_14rem_1fr] md:gap-8">
                <span className="label pt-1.5 tabular-nums text-mute">0{i + 1}</span>
                <h3 className="text-xl tracking-tight text-forest md:text-2xl">{t}</h3>
                <p className="col-start-2 text-graphite md:col-start-3">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
