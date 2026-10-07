import Image from "next/image";
import Lines from "../ui/Lines";

/**
 * Capítulo 01 — Solar. Cena sticky: a moldura se abre até virar tela cheia
 * e a fotografia aérea faz um zoom lento. O texto permanece estável.
 */
export default function Solar() {
  return (
    <section
      id="solar"
      data-scene="Geração solar"
      data-tone="dark"
      data-sticky-scene=""
      className="relative h-[240vh] bg-paper"
      aria-labelledby="solar-title"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          data-unclip="inset(9% 5% 9% 5% round 30px)"
          className="absolute inset-0 overflow-hidden bg-ink"
        >
          <div data-zoom="1.14" data-zoom-from="1" className="absolute inset-0 will-change-transform">
            <Image
              src="/images/solar-aerea.webp"
              alt="Vista aérea de uma grande usina solar com fileiras de módulos até as chapadas no horizonte."
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,23,25,.66)_0%,rgba(12,23,25,.15)_55%,rgba(12,23,25,0)_100%)]" />
        </div>

        <div className="container-x relative flex h-full flex-col justify-end pb-[14vh] text-paper md:pb-[16vh]">
          <p data-late="" className="label mb-8 text-paper/70">
            Capítulo 01 — Geração solar
          </p>
          <Lines
            id="solar-title"
            lines={["Sol transformado", "em energia."]}
            className="display text-[clamp(2.8rem,7vw,7.6rem)]"
          />
          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <p data-late="" className="max-w-[40ch] text-paper/80 md:text-lg">
              Grandes projetos de geração solar conectando tecnologia, eficiência e potencial energético.
            </p>
            <dl data-late="" className="grid grid-cols-3 gap-8 md:gap-14">
              {[
                ["1,6 GW", "Potência solar"],
                ["3,1 mi", "Módulos"],
                ["12", "Usinas"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dd className="text-2xl font-light tracking-tight md:text-3xl">{v}</dd>
                  <dt className="label mt-2 text-paper/60">{k}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
