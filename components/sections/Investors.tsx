import Lines from "../ui/Lines";
import Eyebrow from "../ui/Eyebrow";
import CtaLink from "../ui/CtaLink";
import { Arrow } from "../ui/Arrow";

const LINKS = [
  ["Resultados", "2T26 · divulgado em 06 ago"],
  ["Governança", "Conselho e comitês"],
  ["Indicadores", "Operacionais e ESG"],
  ["Relatórios", "Integrado · Sustentabilidade"],
  ["Investidores", "Central e calendário"],
];

/** Investidores — a seção mais objetiva. Clareza acima de tudo. */
export default function Investors() {
  return (
    <section id="investidores" data-scene="Investidores" className="relative py-28 md:py-40" aria-labelledby="inv-title">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow n="06">Investidores</Eyebrow>
          <Lines
            id="inv-title"
            lines={["Uma empresa", "preparada", "para crescer."]}
            className="display mt-10 text-[clamp(2.6rem,5vw,5.4rem)]"
          />
          <div data-fade="" className="mt-12 inline-flex items-center gap-5 rounded-full border border-ink/10 px-5 py-3">
            <span className="label">ALVR3</span>
            <span className="h-4 w-px bg-ink/15" />
            <span className="label text-mute">B3 · Novo Mercado</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <ul>
            {LINKS.map(([t, d]) => (
              <li key={t}>
                <div data-draw="" className="hairline" />
                <a
                  href="#investidores"
                  data-fade=""
                  className="group flex items-center justify-between gap-6 py-6 md:py-7"
                >
                  <span className="text-2xl tracking-tight transition-transform duration-700 ease-cine group-hover:translate-x-2 md:text-3xl">
                    {t}
                  </span>
                  <span className="flex items-center gap-6">
                    <span className="label hidden text-mute sm:block">{d}</span>
                    <Arrow diagonal className="opacity-40 transition-all duration-500 group-hover:text-sun group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div data-draw="" className="hairline" />
          <div data-fade="" className="mt-12">
            <CtaLink href="#investidores">Área de investidores</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
