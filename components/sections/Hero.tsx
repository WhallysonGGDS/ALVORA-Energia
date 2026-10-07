import Image from "next/image";
import Lines from "../ui/Lines";
import CtaLink from "../ui/CtaLink";
import { Arrow } from "../ui/Arrow";

const STATS = [
  { label: "Presença", value: 186, decimals: 0, unit: "", caption: "municípios conectados" },
  { label: "Capacidade", value: 2.8, decimals: 1, unit: "GW", caption: "em fontes renováveis" },
];

/** Cena 01 — Impacto. A imagem apresenta a escala. */
export default function Hero() {
  return (
    <section
      id="topo"
      data-hero=""
      data-scene="Primeira luz"
      data-tone="dark"
      className="relative px-2 pt-2 md:px-3 md:pt-3"
      aria-labelledby="hero-title"
    >
      <div className="grid gap-2 md:gap-3 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Fotografia editorial */}
        <div className="relative h-[100svh] min-h-[620px] overflow-hidden rounded-[22px] bg-ink md:h-[calc(100svh-24px)] md:rounded-[30px]">
          <div data-hero-media="" className="media absolute inset-0">
            <Image
              src="/images/hero-complexo.webp"
              alt="Complexo de energia ao pôr do sol: painéis solares em primeiro plano, aerogeradores nas serras e chapadas ao fundo."
              fill
              priority
              sizes="(min-width: 1024px) 78vw, 100vw"
              quality={82}
              className="scale-[1.06] object-cover object-[60%_50%]"
            />
          </div>
          {/* Vinheta: legibilidade sem matar a luz */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,23,25,.45)_0%,rgba(12,23,25,0)_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,23,25,.45)_0%,rgba(12,23,25,0)_22%,rgba(12,23,25,0)_45%,rgba(12,23,25,.72)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 p-5 pb-8 md:p-10 xl:p-14">
            <p data-fade="" className="label mb-6 inline-flex items-center gap-3 text-paper/80">
              <span className="h-1.5 w-1.5 rounded-full bg-sun" /> Energia renovável · Brasil
            </p>
            <Lines
              as="h1"
              id="hero-title"
              lines={[
                "Energia que",
                "nasce aqui.",
                <span key="b" className="text-paper/70">
                  Futuro que chega
                </span>,
                <span key="c" className="text-paper/70">
                  mais longe.
                </span>,
              ]}
              className="display max-w-[14ch] text-[clamp(2.9rem,7.6vw,8.4rem)] text-paper"
            />

            <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
              <p data-fade="" className="max-w-[38ch] text-[15px] leading-relaxed text-paper/75 md:text-base">
                De energia limpa a infraestrutura inteligente, transformamos recursos naturais em soluções
                que movem pessoas, negócios e cidades.
              </p>
              <div data-fade="">
                <CtaLink href="#operacoes" tone="light">
                  Conheça nossas operações
                </CtaLink>
              </div>
            </div>
          </div>

          {/* Único elemento flutuante: a usina, agora */}
          <div
            data-fade=""
            className="absolute right-5 top-24 hidden items-center gap-4 rounded-2xl border border-paper/15 bg-ink/25 px-4 py-3 text-paper backdrop-blur-md md:flex xl:right-10 xl:top-28"
          >
            <span className="pulse h-2 w-2 rounded-full bg-sun" />
            <div>
              <p className="label text-paper/60">Gerando agora</p>
              <p className="text-lg font-light tabular-nums tracking-tight">1.942 MW</p>
            </div>
            <span className="h-8 w-px bg-paper/15" />
            <div>
              <p className="label text-paper/60">Complexo Serra do Sol</p>
              <p className="text-[13px] text-paper/80">Janaúba · MG</p>
            </div>
          </div>
        </div>

        {/* Painel institucional — números editoriais */}
        <aside
          aria-label="Números da ALVORA"
          className="flex flex-col px-3 pb-6 pt-10 md:px-6 lg:h-[calc(100svh-24px)] lg:px-4 lg:pb-0 lg:pt-28 xl:px-6"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-1 lg:gap-0">
            {STATS.map((s, i) => (
              <div key={s.label} className={i > 0 ? "lg:mt-10 lg:pt-10" : ""}>
                {i > 0 && <div data-draw="" className="hairline -mt-10 mb-10 hidden lg:block" />}
                <p data-fade="" className="label text-mute">
                  {s.label}
                </p>
                <p className="display mt-3 text-[clamp(3rem,5.4vw,5.6rem)] tabular-nums">
                  <span data-counter={s.value} data-decimals={s.decimals}>
                    {s.value.toLocaleString("pt-BR", { minimumFractionDigits: s.decimals })}
                  </span>
                  {s.unit && <span className="ml-2 text-[0.5em] tracking-tight">{s.unit}</span>}
                </p>
                <p data-fade="" className="mt-2 text-sm text-mute">
                  {s.caption}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#impacto"
            data-fade=""
            className="group relative mt-10 block aspect-[16/11] overflow-hidden rounded-[22px] lg:mt-auto lg:mb-0"
          >
            <Image
              src="/images/painel-macro.webp"
              alt="Detalhe de módulos solares refletindo o sol."
              fill
              sizes="340px"
              className="object-cover transition-transform duration-[1400ms] ease-cine group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-paper">
              <div>
                <p className="label text-paper/70">Matriz renovável</p>
                <p className="display mt-1 text-5xl">
                  <span data-counter="94">94</span>%
                </p>
              </div>
              <span className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sun text-ink transition-transform duration-700 ease-cine group-hover:-rotate-45">
                <Arrow />
              </span>
            </div>
          </a>
        </aside>
      </div>
    </section>
  );
}
