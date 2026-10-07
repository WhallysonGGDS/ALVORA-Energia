# ALVORA Energia — site institucional

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Conceito — "o arco do sol"
A página atravessa um dia: da primeira luz (hero) ao pôr do sol (CTA final).
O indicador no canto (`components/SunArc.tsx`) mostra o horário e a cena atual.

## Arquitetura
- `components/sections/*` — uma seção por arquivo. Quase todas são Server Components (zero JS próprio).
- `components/MotionDirector.tsx` — único lugar do motion. Lê atributos e cria as animações:
  - `data-lines` (reveal por linha, via `<Lines>`), `data-fade`, `data-draw` (hairlines)
  - `data-clip="up|left|right|inset"` (image reveal), `data-parallax="n"`, `data-depth="px"`
  - `data-counter="2.8" data-decimals="1"`
  - `data-sticky-scene` + `data-unclip` + `data-zoom` (cenas Solar e CTA final)
- `prefers-reduced-motion`: sem Lenis, sem animação, conteúdo visível; parallax reduzido no mobile.
- Fontes auto-hospedadas (`next/font/local` + Fontsource): Inter Tight e IBM Plex Mono.
- Imagens em `public/images` (WebP 2400px); `next/image` entrega AVIF/WebP responsivo, `priority` só no hero.

## Preview estático
`STATIC_EXPORT=1 npm run build` gera `out/` (imagens não otimizadas).
