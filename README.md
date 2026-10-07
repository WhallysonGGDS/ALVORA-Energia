# ALVORA Energia — site institucional

Site institucional *one-page* de uma empresa (fictícia) de energia renovável: geração solar, eólica e infraestrutura de transmissão. A página é contada como um dia, da primeira luz ao pôr do sol, com fotografia em destaque, tipografia editorial e movimento guiado pelo scroll.

> **Projeto conceitual.** Nomes, números, endereços, ticker (ALVR3) e usinas são ilustrativos.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis

---

## Sumário

- [Começando](#começando)
- [Scripts](#scripts)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Conceito: o arco do sol](#conceito-o-arco-do-sol)
- [Mapa da página](#mapa-da-página)
- [Arquitetura](#arquitetura)
- [Sistema de motion (`data-*`)](#sistema-de-motion-data-)
- [Design system](#design-system)
- [Componentes de UI](#componentes-de-ui)
- [Imagens](#imagens)
- [Acessibilidade](#acessibilidade)
- [Performance](#performance)
- [Build e deploy](#build-e-deploy)
- [Guias rápidos](#guias-rápidos)
- [Pontos de atenção](#pontos-de-atenção)

---

## Começando

**Requisitos:** Node.js 18.18 ou superior (recomendado 20 LTS+) e npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Produção local:

```bash
npm run build
npm start          # http://localhost:3000
```

O projeto não usa variáveis de ambiente, exceto `STATIC_EXPORT` (ver [Build e deploy](#build-e-deploy)).

## Scripts

| Comando         | O que faz                                                                    |
| --------------- | ---------------------------------------------------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento com hot reload.                                  |
| `npm run build` | Build de produção em `.next/` (ou `out/` com `STATIC_EXPORT=1`).             |
| `npm start`     | Serve o build de produção. Não funciona com o export estático.               |
| `npm run lint`  | ESLint (`eslint .`) com as regras `next/core-web-vitals` e `next/typescript`. |

## Estrutura de pastas

```
alvora-energia/
├── app/
│   ├── layout.tsx          # <html>, fontes locais, metadata, viewport, classe .js
│   ├── page.tsx            # Monta a página: Header, seções, Footer, SunArc, MotionDirector
│   └── globals.css         # Tokens (@theme), classes base, estados iniciais do motion
├── components/
│   ├── Header.tsx          # Navegação fixa + menu mobile fullscreen (client)
│   ├── Footer.tsx          # Rodapé com wordmark "horizonte"
│   ├── MotionDirector.tsx  # Único ponto de animação: Lenis + GSAP + ScrollTrigger (client)
│   ├── SunArc.tsx          # Indicador "arco do sol" com horário e cena atual (client)
│   ├── sections/           # Uma seção da página por arquivo
│   │   ├── Hero.tsx
│   │   ├── Energy.tsx
│   │   ├── Operations.tsx  # Única seção client (estado de hover)
│   │   ├── Solar.tsx
│   │   ├── Wind.tsx
│   │   ├── Infrastructure.tsx
│   │   ├── Technology.tsx
│   │   ├── Impact.tsx
│   │   ├── People.tsx
│   │   ├── Sustainability.tsx
│   │   ├── Investors.tsx
│   │   └── FinalCta.tsx
│   └── ui/                 # Peças reutilizáveis
│       ├── Arrow.tsx
│       ├── CtaLink.tsx
│       ├── Eyebrow.tsx
│       ├── Lines.tsx
│       ├── Logo.tsx
│       └── Photo.tsx
├── lib/
│   ├── links.ts            # Destinos externos (portais, redes) em um só lugar
│   └── scroll.ts           # Instância compartilhada do Lenis + scrollToTarget()
├── public/images/          # 18 fotografias WebP (2400px)
├── next.config.ts          # Formatos de imagem e modo de export estático
├── eslint.config.mjs       # ESLint 9 (flat config) com as regras do Next
├── postcss.config.mjs      # Plugin do Tailwind 4
└── tsconfig.json           # strict, alias @/* → raiz do projeto
```

## Conceito: o arco do sol

A página atravessa um dia. O hero é a primeira luz (05:40) e o CTA final é o pôr do sol (18:30). O texto, as cores das seções e as fotografias acompanham essa progressão.

O componente [`components/SunArc.tsx`](components/SunArc.tsx) materializa a ideia: um pequeno arco fixo no canto inferior direito, com um ponto que percorre o semicírculo conforme o scroll. Ele mostra:

- **Horário:** interpolado linearmente entre 05:40 e 18:30 pela proporção do scroll (`scrollY / (scrollHeight - innerHeight)`).
- **Cena atual:** o último elemento com `data-scene` cujo topo passou da metade da viewport, exibido como `NN — Nome`.
- **Tom:** lê o `data-tone` da cena (`dark` ou `light`, padrão `light`) e troca a cor do indicador para manter o contraste.

O indicador aparece só a partir de `lg` (1024px), fica oculto na primeira e na última cena (hero e rodapé) e é `aria-hidden`, já que é decorativo.

## Mapa da página

A ordem vem de [`app/page.tsx`](app/page.tsx). Cada seção tem uma âncora (`id`) e um nome de cena (`data-scene`).

| #  | Componente           | Âncora              | `data-scene`      | Tom   | Destaques                                                                    |
| -- | -------------------- | ------------------- | ----------------- | ----- | ---------------------------------------------------------------------------- |
| 01 | `Hero`               | `#topo`             | Primeira luz      | dark  | Foto full-height, H1 em 4 linhas, card "Gerando agora", contadores 186 / 2,8 GW / 94% |
| 02 | `Energy`             | `#energia`          | Nossa energia     | light | Composição assimétrica, segunda foto flutuando em outra velocidade (`data-depth`) |
| 03 | `Operations`         | `#operacoes`        | Operações         | light | Índice de 3 frentes. O hover troca a foto com crossfade mascarado            |
| 04 | `Solar`              | `#solar`            | Geração solar     | dark  | Cena sticky de 240vh: a moldura abre até tela cheia e a foto aérea faz zoom  |
| 05 | `Wind`               | `#eolica`           | Geração eólica    | light | Layout invertido, foto com parallax e ficha técnica                          |
| 06 | `Infrastructure`     | `#infraestrutura`   | Infraestrutura    | light | Foto panorâmica 21:9 e foto da cidade com profundidade                       |
| 07 | `Technology`         | `#tecnologia`       | Tecnologia        | dark  | Fundo escuro, indicadores pulsando sobre a imagem, contador de telemetria    |
| 08 | `Impact`             | `#impacto`          | Impacto           | light | Quatro números grandes, só tipografia e hairlines                            |
| 09 | `People`             | `#sobre`            | Pessoas           | light | Registro documental da equipe                                                |
| 10 | `Sustainability`     | `#sustentabilidade` | Sustentabilidade  | light | Fundo `sage`, foto full-bleed e quatro pilares                               |
| 11 | `Investors`          | `#investidores`     | Investidores      | light | Lista de links de RI e selo B3 · Novo Mercado                                |
| 12 | `FinalCta`           | `#contato`          | Pôr do sol        | dark  | Cena sticky de 180vh com zoom e CTA "Fale com a gente"                       |
| —  | `Footer`             | —                   | Créditos          | dark  | Contato, colunas de links e wordmark "ALVORA" como horizonte                 |

A navegação principal (`Header`) aponta para `#energia`, `#operacoes`, `#impacto`, `#investidores` e `#sobre`.

## Arquitetura

### Server Components por padrão

Quase todas as seções são **Server Components**: renderizam HTML no servidor e não enviam JavaScript próprio ao navegador. Só quatro arquivos usam `"use client"`:

| Arquivo              | Por que é client                                              |
| -------------------- | ------------------------------------------------------------- |
| `MotionDirector.tsx` | Cria Lenis, timelines GSAP e ScrollTriggers.                  |
| `SunArc.tsx`         | Escuta o scroll e atualiza o SVG.                             |
| `Header.tsx`         | Estado de scroll, menu mobile, tecla Esc, scroll suave.       |
| `Operations.tsx`     | Estado do item ativo (hover/foco troca a fotografia).         |

### Motion declarativo

As seções não importam GSAP. Elas só marcam elementos com atributos `data-*` (`data-fade`, `data-clip`, `data-parallax`…). O [`MotionDirector`](components/MotionDirector.tsx) é renderizado uma vez no fim da página, lê esses atributos no `useLayoutEffect` e cria todas as animações dentro de um `gsap.context()`, que é revertido no unmount.

Com isso:

- as seções continuam sendo Server Components;
- easing, durações e gatilhos ficam iguais na página inteira;
- adicionar uma animação nova a um elemento é só acrescentar um atributo.

### Scroll suave

O Lenis é criado pelo `MotionDirector` (`lerp: 0.09`, `wheelMultiplier: 0.9`) e sincronizado com o GSAP: o `gsap.ticker` dirige o `lenis.raf` e cada evento de scroll do Lenis chama `ScrollTrigger.update`.

A instância fica registrada em [`lib/scroll.ts`](lib/scroll.ts). A função `scrollToTarget("#ancora")` usa o Lenis quando ele existe (1,6 s, easing quartic-out) e cai para `scrollIntoView({ behavior: "smooth" })` quando não existe, por exemplo com `prefers-reduced-motion`. O `Header` e o `Operations` usam essa função nos links de âncora.

### Sem flash de conteúdo

O `<head>` do [`layout.tsx`](app/layout.tsx) roda um script inline que adiciona a classe `js` ao `<html>` antes da pintura. Os estados iniciais das animações (texto deslocado, opacidade 0, clip-path fechado) ficam em [`globals.css`](app/globals.css) atrás de `.js` e de `@media (prefers-reduced-motion: no-preference)`. Sem JS, ou com movimento reduzido, o conteúdo aparece direto, visível e estático.

## Sistema de motion (`data-*`)

Referência dos atributos lidos pelo [`MotionDirector`](components/MotionDirector.tsx). Elementos dentro de `[data-hero]` são ignorados pelos handlers genéricos, porque o hero tem uma timeline de abertura própria.

### Revelações (disparam uma vez)

| Atributo                     | Efeito                                                                 | Gatilho      | Duração / easing         |
| ---------------------------- | ---------------------------------------------------------------------- | ------------ | ------------------------ |
| `data-lines`                 | Cada `.line-inner` sobe de `translateY(110%)` para 0, com stagger 0,085 s | `top 88%`    | 1,4 s · `expo.out`       |
| `data-fade`                  | Opacidade 0 → 1 e subida de 22px                                       | `top 90%`    | 1,2 s · `expo.out`       |
| `data-clip="up\|left\|right\|inset"` | Revela pelo `clip-path`. A `<img>` interna faz zoom de 1,22 → 1 (exceto com `data-parallax`) | `top 82%`    | 1,8 s · `expo.inOut`     |
| `data-draw`                  | Hairline desenhada com `scaleX` 0 → 1 a partir da esquerda             | `top 92%`    | 1,6 s · `expo.inOut`     |
| `data-counter="2.8"`         | Contagem de 0 até o valor, formatada em pt-BR                          | `top 88%`    | 2,2 s · `power3.out`     |
| `data-decimals="1"`          | Casas decimais do contador (padrão 0)                                  | —            | —                        |
| `data-delay="0.1"`           | Atraso em segundos para `data-lines`, `data-fade` e `data-clip`        | —            | —                        |

O valor final dos contadores já vem no HTML. Sem animação, o número correto aparece direto.

### Scrub (acompanham o scroll)

| Atributo             | Efeito                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `data-parallax="n"`  | A `<img>` interna (ou o próprio elemento) desloca de `-n%` a `+n%` em `yPercent`, com escala `1 + n/50` para não mostrar bordas. |
| `data-depth="px"`    | O elemento inteiro desloca de `+px` a `-px`, flutuando em velocidade diferente do resto.  |

No mobile (abaixo de 1024px) os dois usam 45% da intensidade, via `gsap.matchMedia()`.

### Cenas sticky

Usadas em `Solar` e `FinalCta`. A seção é alta (240vh / 180vh) e contém um filho `sticky top-0 h-[100svh]`. Uma timeline com `scrub: 1` vai do topo ao fim da seção:

| Atributo                          | Papel                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `data-sticky-scene`               | Na `<section>`. Define o trecho de scroll da timeline.                           |
| `data-unclip="inset(...)"`        | Moldura que abre do `clip-path` informado até tela cheia (primeiros 45% da cena). Passe o mesmo valor em `style={{ "--unclip": ... }}`: o CSS usa a variável para o estado inicial antes do JS. |
| `data-zoom="1.14"` `data-zoom-from="1"` | Escala da imagem ao longo da cena inteira (padrões: de 1,12 para 1).        |
| `data-late`                       | Textos que entram por fade + subida por volta de 38% da cena.                    |

### Hero

O `[data-hero]` tem uma timeline de abertura que roda no carregamento, sem depender de scroll:

1. `[data-hero-media]` reduz de 1,08 para 1 (2,6 s);
2. as linhas do título sobem com stagger (a partir de 0,35 s);
3. `data-fade` e `data-draw` entram a partir de 0,9 s;
4. os contadores começam após 1,1 s.

A imagem do hero também tem parallax leve (`yPercent: 7`) enquanto a seção sai da tela.

### Atributos de navegação (lidos pelo `SunArc`)

| Atributo                  | Papel                                              |
| ------------------------- | -------------------------------------------------- |
| `data-scene="Nome"`       | Marca o início de uma cena no arco do sol.         |
| `data-tone="dark\|light"` | Cor do indicador sobre aquela cena.                |

## Design system

Todos os tokens ficam no bloco `@theme` de [`app/globals.css`](app/globals.css) e viram classes do Tailwind 4 automaticamente (`bg-ink`, `text-sun`, `ease-cine`…).

### Cores

| Token       | Hex       | Uso                                             |
| ----------- | --------- | ----------------------------------------------- |
| `paper`     | `#f2f0ea` | Fundo principal (papel quente)                  |
| `paper-2`   | `#e8e6de` | Fundo alternado de seções                       |
| `sage`      | `#e4e7df` | Fundo da seção de Sustentabilidade              |
| `ink`       | `#0c1719` | Texto principal e seções escuras               |
| `ink-2`     | `#142427` | Variação de `ink`                               |
| `petrol`    | `#17383d` | Acento frio                                     |
| `forest`    | `#203a30` | Títulos de Sustentabilidade                     |
| `sky`       | `#aac4cf` | Acento claro                                    |
| `graphite`  | `#2c3235` | Texto de corpo                                  |
| `mute`      | `#6b7472` | Legendas, labels, metadados                     |
| `sun`       | `#c9a15f` | Cor da marca: sol, CTAs, foco, seleção          |
| `sun-soft`  | `#e6cf9f` | Variação suave do `sun`                         |

### Tipografia

Fontes auto-hospedadas via `next/font/local`, com os arquivos `.woff2` vindos dos pacotes Fontsource. Nenhuma requisição externa em build ou runtime.

| Família         | Variável CSS          | Uso                                               |
| --------------- | --------------------- | ------------------------------------------------- |
| Inter Tight (variável, 100–900) | `--font-display` | Títulos e corpo                         |
| IBM Plex Mono (400, 500)        | `--font-mono`    | Labels técnicos, números de capítulo, metadados |

Classes utilitárias:

- **`.display`**: peso 300, `letter-spacing: -0.045em`, `line-height: 0.95`. Usada nos títulos, quase sempre com `text-[clamp(...)]` para escala fluida.
- **`.label`**: mono, 11px, caixa alta, `letter-spacing: 0.18em`.

### Layout e utilitários

- **`.container-x`**: largura máxima de 1680px, com padding lateral de 20px (mobile), 40px (≥768px) e 64px (≥1280px).
- **`.hairline`**: linha de 1px em `currentColor` com 18% de opacidade. Herda a cor do contexto.
- **`.media`**: wrapper com `overflow: hidden` e `isolation`, base das fotos com parallax e clip.
- **`.line` / `.line-inner`**: máscara de linha usada pelo reveal de títulos.
- **`.pulse`**: pulsação do ponto "ao vivo" (desligada com movimento reduzido).
- **`ease-cine`**: `cubic-bezier(0.22, 1, 0.36, 1)`, o easing das transições CSS (hover, menu, crossfade).

Grid: as seções usam `grid-cols-12` com composições assimétricas (por exemplo, 5 + 6 colunas com offset). Raios de borda entre 18px e 30px nas fotografias.

## Componentes de UI

| Componente | Props principais | Descrição |
| ---------- | ---------------- | --------- |
| [`Photo`](components/ui/Photo.tsx) | `src`, `alt`, `sizes`, `priority?`, `className?`, `imgClassName?`, `motion?` | `next/image` com `fill` e `quality={80}` dentro de um wrapper `.media`. O objeto `motion` é espalhado no wrapper (`{ "data-clip": "up" }`, `{ "data-parallax": 7 }`). O aspect ratio vem de `className`. |
| [`Lines`](components/ui/Lines.tsx) | `lines: ReactNode[]`, `as?` (padrão `h2`), `className?`, `delay?`, `id?` | Título com reveal por linha. As quebras são definidas à mão no array, não automaticamente. |
| [`Eyebrow`](components/ui/Eyebrow.tsx) | `n`, `children` | Marcador de capítulo: número, hairline e nome, já com `data-fade`/`data-draw`. |
| [`CtaLink`](components/ui/CtaLink.tsx) | `href`, `children`, `tone?: "light" \| "dark"` | CTA com texto em caixa alta, círculo com seta que fica `sun` no hover e sublinhado que se completa. |
| [`Arrow`](components/ui/Arrow.tsx) | `diagonal?`, `className?` | Seta SVG em `currentColor`, opcionalmente girada a 45°. |
| [`Logo`](components/ui/Logo.tsx) | `className?` | Marca: sol nascendo sobre a linha do horizonte e a palavra "ALVORA". |

## Imagens

As 18 fotografias ficam em [`public/images/`](public/images) em WebP com 2400px de largura (cerca de 6,3 MB no total). Elas são servidas pelo `next/image`, que gera AVIF/WebP responsivos nas larguras definidas em [`next.config.ts`](next.config.ts): 640, 828, 1080, 1440, 1920 e 2400.

| Arquivo                    | Onde aparece                              |
| -------------------------- | ----------------------------------------- |
| `hero-complexo.webp`       | Hero (único com `priority`)               |
| `painel-macro.webp`        | Hero, card "Matriz renovável"             |
| `solar-cerrado.webp`       | Energy                                    |
| `complexo-subestacao.webp` | Energy (foto flutuante)                   |
| `solar-vale.webp`          | Operations, item 01                       |
| `solar-eolica-lago.webp`   | Operations, item 02, e Sustainability     |
| `transmissao.webp`         | Operations, item 03                       |
| `solar-aerea.webp`         | Solar (cena sticky)                       |
| `eolica-serra.webp`        | Wind                                      |
| `subestacao.webp`          | Infrastructure                            |
| `cidade.webp`              | Infrastructure                            |
| `centro-controle.webp`     | Technology                                |
| `conectores.webp`          | Technology                                |
| `tecnico-tablet.webp`      | Technology                                |
| `equipe.webp`              | People                                    |
| `tecnico-retrato.webp`     | People (só desktop)                       |
| `painel-natureza.webp`     | Sustainability                            |
| `final-panorama.webp`      | FinalCta                                  |

Toda imagem informativa tem `alt` descritivo em português. Nas miniaturas mobile de `Operations`, que repetem a foto principal, o `alt` é vazio de propósito.

## Acessibilidade

- `lang="pt-BR"` no documento.
- Link "Pular para o conteúdo" no topo, visível ao receber foco.
- Cada `<section>` tem `aria-labelledby` apontando para o próprio título. Hierarquia de títulos com um único `h1`.
- Listas de dados usam `<dl>`/`<dt>`/`<dd>`. Índices numerados usam `<ol>`.
- Foco visível em todo elemento interativo (`outline` de 2px na cor `sun`).
- Menu mobile: `role="dialog"`, `aria-modal`, `aria-expanded`/`aria-controls` no botão, fecha com Esc, devolve o foco ao botão "Menu" e usa `inert` quando fechado. O scroll da página é travado enquanto o menu está aberto.
- Em `Operations`, foco por teclado troca a fotografia do mesmo jeito que o hover.
- **`prefers-reduced-motion: reduce`**: sem Lenis, sem GSAP, sem pulsação. Todo o conteúdo aparece no estado final, e os contadores já mostram o número certo.
- Elementos puramente decorativos (`SunArc`, setas, wordmark do rodapé) são `aria-hidden`.

## Performance

- Seções como Server Components: o JS do cliente se resume a React, GSAP, Lenis e quatro componentes pequenos.
- Só a imagem do hero usa `priority`. As outras são carregadas sob demanda com `sizes` ajustado ao layout de cada uma.
- Fontes locais com `display: swap`, sem round-trip para o Google Fonts.
- `SunArc` agrupa as atualizações com `requestAnimationFrame` e listeners `passive`.
- As revelações usam `once: true`: o ScrollTrigger se desfaz depois de disparar.
- `ScrollTrigger.refresh()` roda no `window.load` para recalcular posições depois que as imagens carregam.
- Animações em `transform`, `opacity` e `clip-path`, com `will-change` nas camadas que se movem.

## Build e deploy

### Servidor Node (padrão)

```bash
npm run build
npm start
```

Mantém a otimização do `next/image` (AVIF/WebP sob demanda). Funciona direto na Vercel ou em qualquer host com Node.

### Export estático (preview)

Gera HTML/CSS/JS puros em `out/`, com as imagens servidas sem otimização (os WebP originais de 2400px).

```bash
# bash / macOS / Linux
STATIC_EXPORT=1 npm run build

# PowerShell (Windows)
$env:STATIC_EXPORT=1; npm run build; Remove-Item Env:STATIC_EXPORT
```

A pasta `out/` pode ir para qualquer hospedagem estática (Netlify, GitHub Pages, S3…). Para testar localmente, use um servidor estático, por exemplo `npx serve out`. Abrir o `index.html` direto do disco não funciona porque os caminhos são absolutos.

## Guias rápidos

### Adicionar uma nova seção

1. Crie `components/sections/MinhaSecao.tsx` como Server Component.
2. Na `<section>`, defina `id`, `data-scene="Nome"`, `aria-labelledby` e, se o fundo for escuro, `data-tone="dark"`.
3. Use `Eyebrow`, `Lines` e `Photo` e marque o restante com `data-fade`, `data-draw` etc.
4. Importe e posicione a seção em [`app/page.tsx`](app/page.tsx). A ordem define a sequência do arco do sol.
5. Se ela entrar no menu, adicione `{ label, href }` ao array `NAV` em [`Header.tsx`](components/Header.tsx).

```tsx
import Photo from "../ui/Photo";
import Lines from "../ui/Lines";
import Eyebrow from "../ui/Eyebrow";

export default function MinhaSecao() {
  return (
    <section id="minha-secao" data-scene="Minha seção" className="relative py-28 md:py-40" aria-labelledby="minha-title">
      <div className="container-x">
        <Eyebrow n="07">Minha seção</Eyebrow>
        <Lines id="minha-title" lines={["Primeira linha", "segunda linha."]} className="display mt-10 text-[clamp(2.6rem,5.6vw,6rem)]" />
        <p data-fade="" className="mt-10 max-w-[42ch] text-graphite">Texto de apoio.</p>
        <Photo
          src="/images/minha-foto.webp"
          alt="Descrição da foto."
          sizes="100vw"
          className="mt-16 aspect-[16/9] rounded-[26px]"
          motion={{ "data-clip": "up" }}
        />
      </div>
    </section>
  );
}
```

### Adicionar uma nova animação

1. Crie o handler em [`MotionDirector.tsx`](components/MotionDirector.tsx) dentro do `gsap.context()`, usando o helper `all("[data-meu-efeito]")` para já excluir o hero.
2. Se o efeito tiver estado inicial (elemento escondido antes de animar), declare-o em [`globals.css`](app/globals.css) dentro de `@media (prefers-reduced-motion: no-preference)` com o prefixo `.js`. Assim não há flash e o conteúdo continua visível sem JS ou com movimento reduzido.

### Trocar uma imagem

Exporte em WebP com cerca de 2400px de largura e coloque em `public/images/`. Não é preciso gerar versões menores: o `next/image` faz isso. Atualize `src`, `alt` e, se o enquadramento mudar, o `sizes` e o aspect ratio no `className`.

### Trocar um link externo

Área do cliente, fornecedores, carreiras, imprensa e redes sociais ficam em [`lib/links.ts`](lib/links.ts). Enquanto o valor é `null`, o link leva à seção de contato (`#contato`). Quando a URL real existir, troque o `null` por ela e o Header, o rodapé e a seção Pessoas passam a usá-la.

### Alterar cores ou fontes

Edite o bloco `@theme` em [`globals.css`](app/globals.css). Para outra fonte, instale o pacote Fontsource correspondente e aponte o `localFont` em [`layout.tsx`](app/layout.tsx) para o `.woff2`.

## Pontos de atenção

- **Conteúdo fictício.** Empresa, números, contatos e ticker são ilustrativos (o rodapé diz "Projeto conceitual").
- **Destinos externos pendentes.** Os links de [`lib/links.ts`](lib/links.ts) ainda levam ao contato. Os itens da lista de Investidores apontam para a própria seção, e "Privacidade · Termos · Ética" no rodapé é texto sem link.
- **Sem testes automatizados.** A validação hoje é visual (`npm run dev`), pelo `npm run lint` e pelo `npm run build`, que também roda a checagem de tipos do TypeScript.
