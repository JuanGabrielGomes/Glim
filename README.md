# glim. · site institucional

Site da **glim.**, estúdio de engenharia e design digital da Serra Gaúcha. Identidade "Precisão que se vê.": linho, grafite e âmbar, com Inter Tight, Instrument Serif e JetBrains Mono. Home de uma página, páginas de trabalhos e de serviços, e o formulário do raio-x.

Produção: [www.glimweb.com](https://www.glimweb.com)

> A landing page de vendas do glim. On mora em [`lp-glim-on/`](lp-glim-on) e é outro projeto na Vercel (`on.glimweb.com`), com stack e deploy próprios.

## Stack

- **Next.js 16** (App Router, Turbopack) e **TypeScript**
- **Tailwind CSS v4** (tokens da marca em `@theme`, utilitários em `globals.css`)
- **Framer Motion** com `LazyMotion` + `domAnimation`, só para entradas discretas
- **Lenis**: rolagem com inércia para roda do mouse e touchpad (desligada com `prefers-reduced-motion`)
- **WebGL puro** (sem biblioteca 3D) para o diamante 3D do hero
- **Nodemailer**: envio do formulário do raio-x por SMTP
- **Vercel**: deploy

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de produção
npm run start   # roda o build localmente
npm run lint    # eslint
npm run format  # prettier --write
```

Se o servidor de desenvolvimento servir CSS antigo ou falhar ao resolver as fontes, apague a pasta `.next` e suba de novo. O build baixa as fontes do Google em tempo de compilação, então precisa de internet.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável                                  | Descrição                                          |
| ----------------------------------------- | -------------------------------------------------- |
| `CONTACT_TO_EMAIL`                        | E-mail que recebe os pedidos de raio-x             |
| `CONTACT_FROM_EMAIL`                      | Remetente (mesma conta SMTP)                       |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Servidor SMTP (Gmail por padrão)                   |
| `SMTP_USER` / `SMTP_PASS`                 | Credenciais (`SMTP_PASS` é senha de app do Gmail)  |
| `NEXT_PUBLIC_INSTAGRAM_URL`               | Instagram usado no rodapé e nos dados estruturados |

`.env.local` nunca é commitado.

## Estrutura

```
src/
  app/
    page.tsx                       # home: Hero, Trabalhos, Serviços, Processo, Princípio, Estúdio, Raio-x
    trabalhos/page.tsx             # índice de cases
    trabalhos/[slug]/              # página de case (+ opengraph-image)
    servicos/[slug]/page.tsx       # páginas de serviço (SEO, FAQ, preço do glim. On)
    actions.ts                     # server action do raio-x (Nodemailer)
    layout.tsx                     # fontes, metadata base, JSON-LD (LocalBusiness + WebSite)
    opengraph-image.tsx            # imagem de compartilhamento da home
    sitemap.ts, robots.ts
    globals.css                    # tokens, utilitários (faceta, vidro, mega, caps, meta), regra de não quebrar palavra
  components/
    layout/                        # Header (tom claro/escuro, menu em folha), Footer
    sections/                      # uma seção por arquivo
    ui/                            # Button, FitText, SectionHead, Shot, Glass, Reveal, NoBreak, FormFields
    providers/                     # MotionProvider (LazyMotion) e SmoothScroll (Lenis)
    hero/HeroGem.tsx               # diamante 3D do hero em WebGL, com a foto como poster e fallback
  lib/
    content.ts                     # copy da home, cases (resumo), nav, contato
    cases.ts                       # detalhe de cada case (desafio, o que fizemos, entregas)
    services.ts                    # conteúdo das páginas de serviço (inclui o glim. On)
    seo.ts, og.tsx                 # constantes de SEO e gerador das imagens OG
    gem-geometry.ts                # malha da lapidação brilhante (112 facetas) e matrizes do diamante
public/
  brand/    # logos SVG (linho e grafite), símbolo e a gema
  cases/    # prints reais dos cases
  fotos/    # fotos conceito (luz dourada, vidro com chuva)
  team/     # foto do fundador
```

## Onde editar

- **Textos da home e dos cases:** `src/lib/content.ts` e `src/lib/cases.ts`.
- **Páginas de serviço:** `src/lib/services.ts`. Adicionar um objeto cria a página, entra no sitemap e no rodapé.
- **Novo case:** acrescente em `CASE_STUDIES` (`content.ts`) e em `DETAILS` (`cases.ts`) com o mesmo `slug`, e coloque o print em `public/cases/`.
- **Case com site fora do ar:** `isLive: false` em `CASE_STUDIES` esconde o link para o site do cliente.
- **Prints dos cases:** capturas reais em 2880×1800 de cada site (viewport 1440×900 a 2x). Ao trocar um print, **troque o nome do arquivo** (`ottea-hd.jpg` → `ottea-hd2.jpg`): a URL otimizada do `next/image` fica em cache por horas.

## Regras de marca no código

- **Nenhuma palavra quebrada entre linhas.** `globals.css` desliga hifenização e quebra de palavra. Mega-títulos usam `FitText`, que reduz a fonte até caber (mínimo 28 px). Textos corridos com palavras hifenizadas ("e-commerce") passam por `NoBreak`.
- **Âmbar em texto sobre linho** é sempre `ambar-700`; `ambar-400` só sobre grafite.
- **Movimento:** entradas de 900 ms (`Reveal`) e zoom de 1,02 nos prints. Tudo respeita `prefers-reduced-motion`.
- **Desempenho de rolagem:** `Reveal` só em texto; nunca envolva imagem grande nem elemento com `backdrop-filter`. O canto facetado das imagens usa `faceta-falsa` (triângulo da cor do fundo), não `clip-path`. Medido com Edge e rolagem real: quadros acima de 33 ms caíram de 20 para 0.
- **Sem travessões** (— e –) nos textos.

## SEO

- Metadata e canonical em cada `page.tsx`; sitemap e robots gerados.
- JSON-LD: `LocalBusiness` + `ProfessionalService` e `WebSite` no layout; `Service`, `FAQPage` e `BreadcrumbList` nos serviços; `CreativeWork` nos cases.
- Imagens OG geradas em build (`src/lib/og.tsx`), uma para a home e uma por case.
- `next.config.ts` redireciona `glim-six.vercel.app` para `www.glimweb.com` (308), para o Google não indexar o domínio padrão da Vercel.

## Deploy

Push em `master` publica na Vercel. Repositório: [github.com/JuanGabrielGomes/Glim](https://github.com/JuanGabrielGomes/Glim).
