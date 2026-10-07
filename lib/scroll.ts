import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/** Rola até uma âncora usando Lenis quando disponível (fallback nativo). */
export function scrollToTarget(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el as HTMLElement, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
