import Logo from "./ui/Logo";
import { Arrow } from "./ui/Arrow";

const COLS = [
  { t: "Empresa", l: ["Energia", "Operações", "Impacto", "Investidores", "Sobre", "Contato"] },
  { t: "Acesso", l: ["Área do cliente", "Fornecedores", "Carreiras", "Imprensa"] },
  { t: "Redes", l: ["LinkedIn", "Instagram", "YouTube"] },
];

export default function Footer() {
  return (
    <footer data-scene="Créditos" data-tone="dark" className="relative overflow-hidden bg-ink pt-24 text-paper md:pt-32">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <Logo />
            <p className="mt-8 max-w-[34ch] text-paper/55">
              Geração solar, eólica e infraestrutura de transmissão. Energia brasileira, de Minas para o país.
            </p>
            <a href="mailto:contato@alvora.com.br" className="mt-8 inline-flex items-center gap-2 text-lg hover:text-sun">
              contato@alvora.com.br <Arrow diagonal />
            </a>
            <p className="mt-3 text-paper/55">+55 31 3000-0000 · Belo Horizonte · MG</p>
          </div>
          {COLS.map((c) => (
            <nav key={c.t} aria-label={c.t} className="col-span-6 md:col-span-4 lg:col-span-2 lg:col-start-auto">
              <p className="label text-paper/40">{c.t}</p>
              <ul className="mt-6 space-y-3">
                {c.l.map((l) => (
                  <li key={l}>
                    <a href="#topo" className="text-paper/75 transition-colors hover:text-paper">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Wordmark como horizonte */}
      <div className="container-x mt-24 md:mt-32">
        <div className="hairline text-paper" />
        <p
          aria-hidden
          className="display select-none pt-6 text-center text-[24vw] leading-[0.8] tracking-[-0.06em] text-paper/[0.06]"
        >
          ALVORA
        </p>
        <div className="flex flex-col gap-3 py-8 text-paper/40 md:flex-row md:justify-between">
          <p className="label">© 2026 ALVORA Energia S.A. — Projeto conceitual</p>
          <p className="label">Privacidade · Termos · Ética</p>
        </div>
      </div>
    </footer>
  );
}
