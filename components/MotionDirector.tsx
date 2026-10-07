"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const EASE = "expo.out";
const fmt = (v: number, d: number) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

/**
 * Diretor de movimento: um único lugar que lê atributos data-* e cria as animações.
 * Mantém as seções como Server Components (sem JS próprio) e o motion consistente.
 */
export default function MotionDirector() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Counters exibem o valor final no HTML; só animam quando há movimento.
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const isHero = (el: Element) => !!el.closest("[data-hero]");
    const all = <T extends Element = HTMLElement>(sel: string) =>
      gsap.utils.toArray<T>(sel).filter((el) => !isHero(el));

    const ctx = gsap.context(() => {
      /* ---------- HERO: abertura ---------- */
      const hero = document.querySelector("[data-hero]");
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: EASE } });
        tl.fromTo(
          hero.querySelector("[data-hero-media]"),
          { scale: 1.08 },
          { scale: 1, duration: 2.6, ease: "power2.out" },
          0
        )
          .to(hero.querySelectorAll("[data-lines] .line-inner"), { y: 0, duration: 1.5, stagger: 0.09 }, 0.35)
          .to(hero.querySelectorAll("[data-fade]"), { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.9)
          .to(hero.querySelectorAll("[data-draw]"), { scaleX: 1, duration: 1.4, stagger: 0.1 }, 0.9);

        hero.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => countUp(el, 1.1));

        gsap.to(hero.querySelector("[data-hero-media] img"), {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* ---------- Text reveal por linhas ---------- */
      all("[data-lines]").forEach((el) => {
        gsap.to(el.querySelectorAll(".line-inner"), {
          y: 0,
          duration: 1.4,
          ease: EASE,
          stagger: 0.085,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* ---------- Fade + leve subida ---------- */
      all("[data-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: EASE,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      /* ---------- Image reveal por clip-path ---------- */
      const clipFrom: Record<string, string> = {
        up: "inset(100% 0% 0% 0%)",
        left: "inset(0% 100% 0% 0%)",
        right: "inset(0% 0% 0% 100%)",
        inset: "inset(12% 12% 12% 12%)",
      };
      all("[data-clip]").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } });
        tl.fromTo(
          el,
          { clipPath: clipFrom[el.dataset.clip ?? "up"] },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }
        );
        const img = el.querySelector("img");
        if (img && !el.hasAttribute("data-parallax")) {
          tl.fromTo(img, { scale: 1.22 }, { scale: 1, duration: 2.2, ease: "expo.out" }, 0.1);
        }
      });

      /* ---------- Hairlines desenhadas ---------- */
      all("[data-draw]").forEach((el) => {
        gsap.to(el, {
          scaleX: 1,
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      /* ---------- Counters ---------- */
      all("[data-counter]").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => countUp(el) });
      });

      /* ---------- Parallax (mais leve no mobile) ---------- */
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (c) => {
        const factor = c.conditions?.desktop ? 1 : 0.45;
        all("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset.parallax || 10) * factor;
          const target = el.querySelector("img") ?? el;
          gsap.fromTo(
            target,
            { yPercent: -amt, scale: 1 + amt / 50 },
            {
              yPercent: amt,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
        // Profundidade: elementos que flutuam em velocidade diferente
        all("[data-depth]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: Number(el.dataset.depth) * factor },
            {
              y: -Number(el.dataset.depth) * factor,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });

      /* ---------- Cenas sticky: abrir a máscara + zoom lento ---------- */
      gsap.utils.toArray<HTMLElement>("[data-sticky-scene]").forEach((scene) => {
        const frame = scene.querySelector<HTMLElement>("[data-unclip]");
        const zoom = scene.querySelector<HTMLElement>("[data-zoom]");
        const late = scene.querySelectorAll<HTMLElement>("[data-late]");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: scene, start: "top top", end: "bottom bottom", scrub: 1 },
        });
        if (frame)
          tl.fromTo(
            frame,
            { clipPath: frame.dataset.unclip },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.45 },
            0
          );
        if (zoom)
          tl.fromTo(
            zoom,
            { scale: Number(zoom.dataset.zoomFrom ?? 1.12) },
            { scale: Number(zoom.dataset.zoom ?? 1), duration: 1 },
            0
          );
        if (late.length)
          tl.fromTo(late, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.05 }, 0.38);
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}

function countUp(el: HTMLElement, delay = 0) {
  const target = Number(el.dataset.counter);
  const decimals = Number(el.dataset.decimals ?? 0);
  const obj = { v: 0 };
  el.textContent = fmt(0, decimals);
  gsap.to(obj, {
    v: target,
    duration: 2.2,
    delay,
    ease: "power3.out",
    onUpdate: () => {
      el.textContent = fmt(obj.v, decimals);
    },
  });
}
