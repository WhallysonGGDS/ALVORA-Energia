import Photo from "../ui/Photo";
import Lines from "../ui/Lines";

const SIGNALS = [
  ["Monitoramento", "Tempo real"],
  ["Dados", "Integrados"],
  ["Operação", "Inteligente"],
];

/** Tecnologia — a cena escurece. A fotografia mostra inteligência, sem virar dashboard. */
export default function Technology() {
  return (
    <section
      id="tecnologia"
      data-scene="Tecnologia"
      data-tone="dark"
      className="relative bg-ink py-28 text-paper md:py-40"
      aria-labelledby="tec-title"
    >
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-fade="" className="label text-paper/50">
              Centro de Operação Integrada · Belo Horizonte
            </p>
            <Lines
              id="tec-title"
              lines={["Tecnologia por trás", "de cada decisão."]}
              className="display mt-8 text-[clamp(2.6rem,6vw,6.6rem)]"
            />
          </div>
          <p data-fade="" className="max-w-[34ch] text-paper/60">
            Cada módulo, cada torre, cada quilômetro de linha reporta ao mesmo lugar — 24 horas por dia.
          </p>
        </div>

        <div className="relative mt-16 md:mt-24">
          <Photo
            src="/images/centro-controle.webp"
            alt="Centro de controle com telões de monitoramento e janelas panorâmicas voltadas para um parque eólico."
            sizes="100vw"
            className="aspect-[4/5] rounded-[26px] sm:aspect-[16/9]"
            motion={{ "data-parallax": 7 }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

          {/* Indicadores ancorados na base da imagem */}
          <ul className="absolute inset-x-0 bottom-0 grid grid-cols-1 gap-0 p-5 sm:grid-cols-3 md:p-8">
            {SIGNALS.map(([a, b], i) => (
              <li key={a} data-fade="" data-delay={i * 0.12} className="border-t border-paper/20 py-4 sm:pr-6">
                <span className="flex items-center gap-2">
                  <span className="pulse h-1.5 w-1.5 rounded-full bg-sun" style={{ animationDelay: `${i * 0.6}s` }} />
                  <span className="label text-paper/55">{a}</span>
                </span>
                <span className="mt-2 block text-xl font-light tracking-tight md:text-2xl">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid grid-cols-12 items-center gap-6 md:mt-28">
          <Photo
            src="/images/conectores.webp"
            alt="Detalhe de conectores e cabos sob um módulo solar."
            sizes="(min-width: 768px) 25vw, 50vw"
            className="col-span-6 aspect-square rounded-[20px] md:col-span-3"
            motion={{ "data-clip": "up" }}
          />
          <Photo
            src="/images/tecnico-tablet.webp"
            alt="Técnico consulta dados em um tablet ao lado de inversores na usina."
            sizes="(min-width: 768px) 25vw, 50vw"
            className="col-span-6 aspect-square rounded-[20px] md:col-span-3"
            motion={{ "data-clip": "up", "data-delay": 0.1 }}
          />
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p data-fade="" className="display text-[clamp(3rem,5vw,5rem)]">
              <span data-counter="1.2" data-decimals="1">
                1,2
              </span>{" "}
              mi
            </p>
            <p data-fade="" className="mt-4 max-w-[36ch] text-paper/60">
              pontos de telemetria lidos a cada segundo. Previsão de geração, manutenção preditiva e despacho
              decididos com dados — não com estimativas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
