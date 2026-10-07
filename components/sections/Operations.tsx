"use client";

import { useState } from "react";
import Image from "next/image";
import Lines from "../ui/Lines";
import Eyebrow from "../ui/Eyebrow";
import { Arrow } from "../ui/Arrow";
import { scrollToTarget } from "@/lib/scroll";

const OPS = [
  {
    n: "01",
    name: "Geração solar",
    desc: "Usinas fotovoltaicas de grande escala no semiárido e no cerrado mineiro.",
    meta: "1,6 GW · 12 usinas",
    href: "#solar",
    img: "/images/solar-vale.webp",
    alt: "Usina solar em vale com lago e montanhas ao entardecer.",
  },
  {
    n: "02",
    name: "Geração eólica",
    desc: "Parques nas serras, onde o vento é constante e o território é parceiro.",
    meta: "820 MW · 214 aerogeradores",
    href: "#eolica",
    img: "/images/solar-eolica-lago.webp",
    alt: "Aerogeradores no topo das serras com módulos solares em primeiro plano.",
  },
  {
    n: "03",
    name: "Infraestrutura energética",
    desc: "Subestações e linhas que conectam a geração a quem consome.",
    meta: "3.400 km de linhas",
    href: "#infraestrutura",
    img: "/images/transmissao.webp",
    alt: "Torres de transmissão atravessando a mata em direção a um lago ao pôr do sol.",
  },
];

/** Índice de capítulos: hover troca a fotografia, clique leva ao capítulo. */
export default function Operations() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="operacoes"
      data-scene="Operações"
      className="relative bg-paper-2/60 py-28 md:py-40"
      aria-labelledby="operacoes-title"
    >
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow n="02">Operações</Eyebrow>
            <Lines
              id="operacoes-title"
              lines={["Operações que", "movem o futuro."]}
              className="display mt-10 text-[clamp(2.6rem,5.6vw,6rem)]"
            />
          </div>
          <p data-fade="" className="max-w-[34ch] text-graphite">
            Três frentes, uma mesma engenharia: gerar perto da natureza e entregar longe, com precisão.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          {/* Fotografia protagonista com crossfade mascarado */}
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[26px] lg:col-span-7 lg:block" data-clip="inset">
            {OPS.map((o, i) => (
              <div
                key={o.n}
                className="absolute inset-0 transition-[clip-path,opacity] duration-[1200ms] ease-cine"
                style={{
                  clipPath: i === active ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
                  opacity: i === active ? 1 : 0.6,
                  zIndex: i === active ? 2 : 1,
                }}
                aria-hidden={i !== active}
              >
                <Image
                  src={o.img}
                  alt={o.alt}
                  fill
                  sizes="(min-width: 1024px) 56vw, 1px"
                  className={`object-cover transition-transform duration-[2400ms] ease-cine ${
                    i === active ? "scale-100" : "scale-110"
                  }`}
                />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-between bg-gradient-to-t from-ink/60 to-transparent p-6 pt-20 text-paper">
              <span className="label">{OPS[active].n} / 03</span>
              <span className="label">{OPS[active].meta}</span>
            </div>
          </div>

          <ol className="lg:col-span-5 lg:col-start-8 lg:self-center">
            {OPS.map((o, i) => (
              <li key={o.n} data-fade="" data-delay={i * 0.08}>
                {i === 0 && <div data-draw="" className="hairline" />}
                <a
                  href={o.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(o.href);
                  }}
                  className={`group grid grid-cols-[auto_1fr_auto] items-start gap-x-6 py-8 transition-opacity duration-700 lg:py-10 ${
                    i === active ? "opacity-100" : "lg:opacity-35"
                  }`}
                >
                  <span className="label pt-3 tabular-nums text-mute">{o.n}</span>
                  <span>
                    <span className="display block text-[clamp(1.9rem,2.8vw,3rem)] leading-[1.02]">{o.name}</span>
                    <span className="mt-3 block max-w-[36ch] text-[15px] text-graphite">{o.desc}</span>
                    {/* Mobile: a imagem vive dentro do item */}
                    <span className="relative mt-6 block aspect-[16/10] overflow-hidden rounded-[18px] lg:hidden">
                      <Image src={o.img} alt="" fill sizes="100vw" className="object-cover" />
                    </span>
                  </span>
                  <span className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 ease-cine group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <Arrow className="rotate-90" />
                  </span>
                </a>
                <div data-draw="" className="hairline" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
