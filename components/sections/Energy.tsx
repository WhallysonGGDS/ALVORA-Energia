import Photo from "../ui/Photo";
import Lines from "../ui/Lines";
import Eyebrow from "../ui/Eyebrow";

/** Cena 02 — Contexto. Composição assimétrica, muito ar. */
export default function Energy() {
  return (
    <section id="energia" data-scene="Nossa energia" className="relative py-28 md:py-40 xl:py-52" aria-labelledby="energia-title">
      <div className="container-x grid grid-cols-12 gap-x-4 md:gap-x-6">
        <div className="col-span-12 lg:col-span-5 lg:pt-16">
          <Eyebrow n="01">Nossa energia</Eyebrow>
          <Lines
            id="energia-title"
            lines={["Da geração à", "transformação."]}
            className="display mt-10 text-[clamp(2.6rem,5.6vw,6rem)]"
          />
          <p data-fade="" className="mt-10 max-w-[42ch] text-[17px] leading-relaxed text-graphite md:text-lg">
            Construímos soluções de energia renovável que combinam tecnologia, infraestrutura e eficiência para
            entregar energia mais segura e sustentável.
          </p>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {[
              ["Fontes", "Sol · Vento"],
              ["Estados", "7"],
              ["Desde", "2009"],
            ].map(([k, v]) => (
              <div key={k} data-fade="">
                <dt className="label text-mute">{k}</dt>
                <dd className="mt-2 text-[15px]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative col-span-12 mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <Photo
            src="/images/solar-cerrado.webp"
            alt="Usina solar integrada à vegetação do cerrado, com chapadas ao fundo."
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="aspect-[4/5] rounded-[26px] md:aspect-[5/6]"
            motion={{ "data-clip": "up" }}
          />
          <p data-fade="" className="label mt-4 flex justify-between text-mute">
            <span>Usina Cerrado Alto</span>
            <span>Buritizeiro · MG</span>
          </p>

          {/* Profundidade: detalhe em outra velocidade */}
          <div
            data-depth="60"
            className="absolute -bottom-20 -left-4 w-[46%] md:-left-16 lg:-left-[38%] lg:bottom-24 lg:w-[52%]"
          >
            <Photo
              src="/images/complexo-subestacao.webp"
              alt="Complexo com módulos solares, subestação e aerogeradores ao pôr do sol."
              sizes="(min-width: 1024px) 26vw, 46vw"
              className="aspect-[4/3] rounded-[18px] shadow-[0_40px_80px_-30px_rgba(12,23,25,.45)]"
              motion={{ "data-clip": "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
