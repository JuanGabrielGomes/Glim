# glim. — site institucional

Site institucional da **glim.**, boutique de engenharia de software e design digital. Landing page única (single-page), dark-only, cinematográfica: vídeo de abertura no hero, logo animado em WebGL, scroll suave, cursor customizado, vitrine de cases reais e formulário de contato funcional.

Produção: [glimweb.com](https://www.glimweb.com)

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animações, scroll-linked motion, `LazyMotion`/`domAnimation` para o bundle
- **Lenis** (`lenis/react`) — smooth scroll
- **Nodemailer** — envio do formulário de contato via SMTP
- **Vercel** — deploy

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de produção
npm run start   # roda o build de produção localmente
npm run lint     # eslint
npm run format   # prettier --write
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Descrição |
| --- | --- |
| `CONTACT_TO_EMAIL` | E-mail que recebe as submissões do formulário de contato |
| `CONTACT_FROM_EMAIL` | E-mail remetente (mesma conta SMTP) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Configuração do servidor SMTP (Gmail por padrão) |
| `SMTP_USER` / `SMTP_PASS` | Credenciais SMTP (`SMTP_PASS` é uma senha de app do Gmail, não a senha normal da conta) |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL do Instagram usada nos botões de contato |

`.env.local` nunca é commitado (está no `.gitignore`).

## Estrutura do projeto

```
src/
  app/
    page.tsx          # composição das seções da home
    layout.tsx         # fontes, metadata, tema (dark fixo), providers globais
    actions.ts          # server action do formulário de contato (Nodemailer)
    globals.css          # paleta, keyframes (marquee, shimmer), grain overlay
  components/
    providers/SmoothScroll.tsx   # wrapper do Lenis
    cursor/                       # cursor customizado + hook de magnetismo pra CTAs
    logo/LiquidLogo.tsx           # wordmark "glim." em WebGL (metal líquido)
    layout/Header.tsx, Footer.tsx, BrandBackdrop.tsx
    sections/                     # uma seção por arquivo (Hero, Approach, Capabilities, TechStack, CaseStudies, About, Contact)
    ui/                            # primitivos reutilizáveis (BrowserMockup, FormFields, ícones, etc.)
  lib/
    content.ts     # todo o copy e dados estruturados (pilares, serviços, cases, stack, sobre)
    motion.ts       # variants e springs do Framer Motion reutilizados entre seções
public/
  brand/    # wordmark real recortado (fundo transparente), versão clara e escura
  cases/    # screenshots reais dos 3 cases
  team/     # foto usada na seção "Quem constrói"
  video/    # vídeo do hero (mp4 + webm) e poster
```

## Seções da página (nessa ordem)

1. **Hero** — vídeo de um candelabro acendendo em loop como fundo, título com palavras de destaque em gradiente, CTA duplo.
2. **Como pensamos** (`#abordagem`) — os 3 pilares em scroll travado (`position: sticky`), um por vez.
3. **Serviços** (`#servicos`) — índice interativo (hover/tap troca o painel de detalhe), 4 serviços incluindo "Plataformas Sob Medida".
4. **Stack técnica** — faixa (marquee) infinita com a stack real usada nos projetos.
5. **Trabalhos** (`#work`) — vitrine dos 3 cases reais (Ottea Studio, Sabores em Foco, Mocellin Joias), cada mockup é um link direto pro site ao vivo.
6. **Quem constrói** (`#sobre`) — seção pessoal do fundador, foto em fundo completo.
7. **O Diamante / Contato** (`#contato`) — logo em WebGL grande, formulário de contato.

Todo o copy dessas seções vive em [`src/lib/content.ts`](src/lib/content.ts) — é o primeiro lugar pra editar textos, cases, serviços ou dados da stack.

## Tema

O site é **dark-only** por decisão de marca — não existe alternância de tema. `<html>` já nasce com a classe `dark` fixa em [`layout.tsx`](src/app/layout.tsx).

## Padrões técnicos relevantes

- **Marquee infinito sem "fim visível":** a faixa de stack técnica duplica o conteúdo várias vezes dentro de um container de largura máxima (não full-bleed) — ver seção "Loop infinito com CSS" abaixo para o porquê.
- **Vídeo de fundo com fallback:** o vídeo do hero tenta dar play via JavaScript e cai automaticamente pro poster estático se o navegador bloquear o autoplay ou não suportar bem — ver [`Hero.tsx`](src/components/sections/Hero.tsx) (`HeroVideoBackground`).
- **Logo em WebGL:** [`LiquidLogo.tsx`](src/components/logo/LiquidLogo.tsx) desenha o texto "glim" + um diamante (não o caractere ".") numa máscara de canvas 2D, usada como textura num shader que simula metal líquido. Tem fallback em CSS puro (gradiente animado) para `prefers-reduced-motion` e navegadores sem WebGL.
- **Acessibilidade do WebGL:** ao usar `LiquidLogo` para texto corrido (não a marca), a máscara de texto precisa ficar com `opacity-0` (não `visibility:hidden`/`invisible`) — senão a palavra desaparece da árvore de acessibilidade e da extração de texto da página.

## Deploy

Push em `master` faz deploy automático via Vercel (se o repositório estiver conectado). Repositório: [github.com/JuanGabrielGomes/Glim](https://github.com/JuanGabrielGomes/Glim).
