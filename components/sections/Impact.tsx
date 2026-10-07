import Lines from "../ui/Lines";
import Eyebrow from "../ui/Eyebrow";

const NUMBERS = [
  { v: 4.1, d: 1, unit: "TWh", label: "Energia renovável gerada por ano" },
  { v: 1.3, d: 1, unit: "mi t", label: "De CO₂ evitadas por ano" },
  { v: 3400, d: 0, unit: "km", label: "De linhas de transmissão" },
  { v: 2100, d: 0, unit: "", label: "Empregos diretos no interior" },
];

/** Cena 05 — Clímax. Números novos, grandes, sem cards: só tipografia e hairlines. */
export default function Impact() {
  return (
    <section id="impacto" data-scene="Impacto" className="relative py-28 md:py-40 xl:py-48" aria-labelledby="impacto-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow n="03">Impacto</Eyebrow>
            <Lines
              id="impacto-title"
              lines={["Impacto que", "permanece."]}
              className="display mt-10 text-[clamp(2.6rem,5.6vw,6rem)]"
            />
          </div>
          <p data-fade="" className="col-span-12 max-w-[38ch] self-end text-graphite lg:col-span-4 lg:col-start-9">
            O que a energia deixa quando chega: menos emissões, mais trabalho e cidades conectadas.
          </p>
        </div>

        <dl className="mt-20 grid grid-cols-1 md:mt-28 md:grid-cols-2">
          {NUMBERS.map((n, i) => (
            <div key={n.label} className={`relative py-10 md:py-14 ${i % 2 === 1 ? "md:pl-12" : "md:pr-12"}`}>
              <div data-draw="" className="hairline absolute inset-x-0 top-0" />
              {i % 2 === 1 && <span className="absolute bottom-10 left-0 top-10 hidden w-px bg-ink/10 md:block" />}
              <dt className="label flex justify-between text-mute">
                <span>{n.label}</span>
                <span className="tabular-nums">0{i + 1}</span>
              </dt>
              <dd className="display mt-8 flex items-baseline gap-3 text-[clamp(4.2rem,9vw,10rem)] tabular-nums">
                <span data-counter={n.v} data-decimals={n.d}>
                  {n.v.toLocaleString("pt-BR", { minimumFractionDigits: n.d })}
                </span>
                {n.unit && <span className="text-[0.28em] tracking-tight text-sun">{n.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
        <div data-draw="" className="hairline" />
        <p data-fade="" className="label mt-6 text-mute">
          Dados consolidados 2025 · Relatório Integrado ALVORA
        </p>
      </div>
    </section>
  );
}
