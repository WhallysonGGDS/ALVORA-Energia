import Photo from "../ui/Photo";
import Lines from "../ui/Lines";

/** Capítulo 03 — Infraestrutura. A imagem apresenta conexão: da subestação até a cidade. */
export default function Infrastructure() {
  return (
    <section
      id="infraestrutura"
      data-scene="Infraestrutura"
      className="relative bg-paper-2/60 py-28 md:py-40"
      aria-labelledby="infra-title"
    >
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <p data-fade="" className="label col-span-12 text-mute lg:col-span-3 lg:pt-6">
            Capítulo 03 — Infraestrutura
          </p>
          <Lines
            id="infra-title"
            lines={["Infraestrutura para", "ir mais longe."]}
            className="display col-span-12 text-[clamp(2.6rem,6.4vw,7rem)] lg:col-span-9"
          />
        </div>

        <Photo
          src="/images/subestacao.webp"
          alt="Subestação de energia com transformadores e torres, lago e serras ao fundo ao entardecer."
          sizes="100vw"
          className="mt-16 aspect-[4/5] rounded-[26px] sm:aspect-[16/9] md:mt-24 lg:aspect-[21/9]"
          motion={{ "data-clip": "left" }}
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-24">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-4">
            <p data-fade="" className="text-xl leading-snug md:text-2xl">
              Conectamos geração, tecnologia e distribuição para levar energia onde ela é necessária.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-8">
              {[
                ["Linhas de transmissão", "3.400 km"],
                ["Subestações", "28"],
              ].map(([k, v]) => (
                <div key={k} data-fade="">
                  <dd className="display text-4xl">{v}</dd>
                  <dt className="label mt-3 text-mute">{k}</dt>
                </div>
              ))}
            </dl>
          </div>
          <figure className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-9" data-depth="40">
            <Photo
              src="/images/cidade.webp"
              alt="Linhas de transmissão chegando a uma metrópole ao pôr do sol."
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 48vw, 100vw"
              className="aspect-[4/5] rounded-[22px]"
              motion={{ "data-clip": "up" }}
            />
            <figcaption className="label mt-4 flex justify-between text-mute">
              <span>Destino</span>
              <span>186 municípios</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
