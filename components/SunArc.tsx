"use client";

import { useEffect, useRef } from "react";

const START = 5 * 60 + 40; // 05:40 — primeira luz
const END = 18 * 60 + 30; // 18:30 — pôr do sol

/**
 * O arco do sol: a página atravessa um dia.
 * Um ponto percorre o arco conforme o scroll, com o horário e a cena atual.
 */
export default function SunArc() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const time = useRef<HTMLSpanElement>(null);
  const scene = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const LEN = Math.PI * 22;
    let ticking = false;
    let last = "";

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, max)));
      const a = Math.PI * p;
      dot.current?.setAttribute("cx", String(26 - 22 * Math.cos(a)));
      dot.current?.setAttribute("cy", String(26 - 22 * Math.sin(a)));
      if (trail.current) trail.current.style.strokeDashoffset = String(LEN * (1 - p));

      const m = Math.round(START + (END - START) * p);
      if (time.current)
        time.current.textContent = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

      const mid = window.innerHeight * 0.5;
      let i = 0;
      scenes.forEach((s, idx) => {
        if (s.getBoundingClientRect().top <= mid) i = idx;
      });
      const s = scenes[i];
      const key = s?.dataset.scene ?? "";
      if (key !== last && scene.current && root.current) {
        last = key;
        scene.current.textContent = `${String(i + 1).padStart(2, "0")} — ${key}`;
        root.current.dataset.tone = s?.dataset.tone ?? "light";
        root.current.style.opacity = i === 0 || i === scenes.length - 1 ? "0" : "1";
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      data-tone="dark"
      className="group pointer-events-none fixed bottom-6 right-6 z-40 hidden items-end gap-4 text-ink opacity-0 transition-[color,opacity] duration-700 data-[tone=dark]:text-paper lg:flex xl:bottom-8 xl:right-8"
    >
      <div className="flex flex-col items-end gap-1 text-right">
        <span ref={time} className="label tabular-nums opacity-90">
          05:40
        </span>
        <span ref={scene} className="label opacity-50">
          01 — Abertura
        </span>
      </div>
      <svg viewBox="0 0 52 30" className="h-[30px] w-[52px] overflow-visible">
        <path d="M4 26a22 22 0 0 1 44 0" stroke="currentColor" strokeOpacity=".25" fill="none" />
        <path
          ref={trail}
          d="M4 26a22 22 0 0 1 44 0"
          stroke="var(--color-sun)"
          fill="none"
          strokeDasharray={Math.PI * 22}
          strokeDashoffset={Math.PI * 22}
        />
        <path d="M0 26.5h52" stroke="currentColor" strokeOpacity=".35" />
        <circle ref={dot} cx="4" cy="26" r="3" fill="var(--color-sun)" />
      </svg>
    </div>
  );
}
