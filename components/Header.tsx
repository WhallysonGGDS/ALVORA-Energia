"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./ui/Logo";
import { Arrow } from "./ui/Arrow";
import { scrollToTarget } from "@/lib/scroll";
import { externalHref } from "@/lib/links";

const NAV = [
  { label: "Energia", href: "#energia" },
  { label: "Operações", href: "#operacoes" },
  { label: "Impacto", href: "#impacto" },
  { label: "Investidores", href: "#investidores" },
  { label: "Sobre", href: "#sobre" },
];

const CLIENTE = externalHref("cliente");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToTarget(href));
  };


  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-700 ease-cine ${
          scrolled ? "py-2" : "py-3 md:py-5"
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between rounded-full border px-4 transition-all duration-700 ease-cine md:px-6 ${
              scrolled
                ? "h-12 border-ink/[0.07] bg-paper/70 text-ink backdrop-blur-xl backdrop-saturate-150"
                : "h-14 border-transparent bg-transparent text-paper"
            }`}
          >
            <a href="#topo" onClick={(e) => go(e, "#topo")} aria-label="ALVORA Energia — início">
              <Logo />
            </a>

            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      onClick={(e) => go(e, n.href)}
                      className="group relative text-[13px] tracking-[0.02em] opacity-80 transition-opacity hover:opacity-100"
                    >
                      {n.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-cine group-hover:origin-left group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={CLIENTE}
                onClick={(e) => go(e, CLIENTE)}
                className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium tracking-[0.04em] transition-colors duration-500 sm:inline-flex ${
                  scrolled
                    ? "border-ink/15 hover:bg-ink hover:text-paper"
                    : "border-paper/35 hover:bg-paper hover:text-ink"
                }`}
              >
                Área do cliente <Arrow diagonal />
              </a>
              <button
                ref={menuBtn}
                type="button"
                className="label inline-flex h-10 items-center gap-2 px-2 lg:hidden"
                aria-expanded={open}
                aria-controls="menu-mobile"
                onClick={() => setOpen(true)}
              >
                Menu
                <span className="flex flex-col gap-[5px]" aria-hidden>
                  <span className="block h-px w-5 bg-current" />
                  <span className="block h-px w-3.5 self-end bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile fullscreen */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-ink text-paper transition-[clip-path] duration-[900ms] ease-cine lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        inert={!open}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo />
          <button
            type="button"
            className="label h-10 px-2"
            onClick={() => {
              setOpen(false);
              menuBtn.current?.focus();
            }}
          >
            Fechar
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x mt-10 flex-1">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.href} className="overflow-hidden border-b border-paper/10">
                <a
                  href={n.href}
                  onClick={(e) => go(e, n.href)}
                  className="flex items-baseline justify-between py-5 transition-transform duration-[900ms] ease-cine"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(100%)",
                    transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                  }}
                >
                  <span className="display text-[2.6rem]">{n.label}</span>
                  <span className="label text-paper/40">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x flex items-end justify-between pb-10 pt-8">
          <a href={CLIENTE} onClick={(e) => go(e, CLIENTE)} className="inline-flex items-center gap-2 text-sm">
            Área do cliente <Arrow diagonal />
          </a>
          <p className="label text-paper/40">Belo Horizonte · MG</p>
        </div>
      </div>
    </>
  );
}
