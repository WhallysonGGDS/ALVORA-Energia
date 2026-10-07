import Photo from "../ui/Photo";
import Lines from "../ui/Lines";
import CtaLink from "../ui/CtaLink";
import Eyebrow from "../ui/Eyebrow";

/** Pessoas — a imagem apresenta humanidade. Registro documental, não "foto de equipe". */
export default function People() {
  return (
    <section id="sobre" data-scene="Pessoas" className="relative pb-28 md:pb-40" aria-labelledby="pessoas-title">
      <div className="container-x">
        <Eyebrow n="04">Pessoas</Eyebrow>
        <Lines
          id="pessoas-title"
          lines={["Por trás da energia,", "existem pessoas."]}
          className="display mt-10 text-[clamp(2.6rem,6.4vw,7rem)]"
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-24">
          <figure className="col-span-12 lg:col-span-8">
            <Photo
              src="/images/equipe.webp"
              alt="Equipe de técnicos com capacetes e óculos de proteção analisa um painel elétrico na usina solar."
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="aspect-[4/5] rounded-[26px] sm:aspect-[16/10]"
              motion={{ "data-clip": "up" }}
            />
            <figcaption className="label mt-4 flex justify-between text-mute">
              <span>Equipe de O&amp;M · inspeção de inversores</span>
              <span>06:40</span>
            </figcaption>
          </figure>

          <div className="col-span-12 flex flex-col justify-between gap-12 lg:col-span-4">
            <div data-depth="50" className="hidden lg:block">
              <Photo
                src="/images/tecnico-retrato.webp"
                alt="Técnico de capacete observa a usina ao pôr do sol."
                sizes="30vw"
                className="aspect-[4/5] rounded-[22px]"
                motion={{ "data-clip": "up" }}
              />
            </div>
            <div>
              <p data-fade="" className="text-lg leading-relaxed text-graphite">
                Engenheiros, técnicos e especialistas trabalhando todos os dias para construir uma infraestrutura
                energética mais eficiente.
              </p>
              <div data-fade="" className="mt-10">
                <CtaLink href="#carreiras">Conheça quem opera a energia</CtaLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
