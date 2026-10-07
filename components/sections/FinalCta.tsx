import Image from "next/image";
import Lines from "../ui/Lines";
import CtaLink from "../ui/CtaLink";

/** Cena 06 — Conversão. O pôr do sol final: a imagem apresenta o futuro. */
export default function FinalCta() {
  return (
    <section
      id="contato"
      data-scene="Pôr do sol"
      data-tone="dark"
      data-sticky-scene=""
      className="relative h-[180vh]"
      aria-labelledby="cta-title"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        <div data-zoom="1.12" data-zoom-from="1" className="absolute inset-0 will-change-transform">
          <Image
            src="/images/final-panorama.webp"
            alt="Panorama de um complexo energético com usina solar, subestação e aerogeradores ao pôr do sol."
            fill
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(12,23,25,.5)_0%,rgba(12,23,25,.18)_100%)]" />

        <div className="container-x relative flex h-full flex-col items-center justify-center text-center text-paper">
          <p data-late="" className="label mb-10 text-paper/70">
            18:30 — Último capítulo
          </p>
          <Lines
            id="cta-title"
            lines={["O futuro precisa", "de energia."]}
            className="display text-[clamp(3rem,8vw,9rem)]"
          />
          <p data-late="" className="mt-8 max-w-[34ch] text-lg text-paper/75 md:text-xl">
            Nós estamos construindo essa próxima etapa.
          </p>
          <div data-late="" className="mt-12">
            <CtaLink href="mailto:contato@alvora.com.br" tone="light">
              Fale com a gente
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
