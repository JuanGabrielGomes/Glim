# glim. On — Landing page de vendas

## O que é este projeto
Página de vendas (VSL + checkout) do glim. On: site institucional profissional
entregue em até 7 dias pela glim. (Juan Gabriel), por R$ 997, parcelável em até 12x
no cartão. O tráfego vem de anúncios na Meta (vídeos curtos por nicho) e cai aqui.
O objetivo único da página é levar o visitante a assistir à VSL e clicar no checkout.

Fluxo: anúncio → esta página (VSL) → checkout Kiwify (externo) → /obrigado
(agendamento da Reunião 1 no Google Agenda) → Reunião 1 → site entregue em até 7 dias.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 3
- Deploy na Vercel
- Sem banco de dados, sem autenticação, sem backend próprio
- Animações: Framer Motion só para microinterações e reveals discretos. Nada de
  WebGL/Three.js nesta página — performance no celular é prioridade.

## Convenções (padrão glim.)
- Componentes em PascalCase (`HeroSection.tsx`), rotas em kebab-case
- Estrutura: src/app, src/components/ui, src/components/sections, src/lib, src/content
- TypeScript sem `any`; props tipadas com interface `XxxProps`
- Imagens com next/image; links internos com next/link
- Metadata definida em cada page.tsx
- Mobile-first: escrever o estilo base para celular, depois md: e lg:
- Nenhum console.log em produção
- Variáveis de ambiente documentadas em .env.example

## Identidade visual
- Cores (as mesmas do site institucional, na raiz deste repositório): glim.dark #4A4643
  (fundo escuro, texto principal), glim.light #F9F8F6 (fundo claro, off-white),
  glim.gold #F2B77B (acento — o diamante), hover #E2A96B
- Tipografia: títulos em Google Sans Flex (a mesma do site, licença OFL), peso 400 e
  tracking negativo, sem negrito — o arquivo src/app/fonts/GoogleSansFlex-latin.woff2
  só tem o peso 400; corpo em Inter, dados técnicos (preço, prazo, números, garantia)
  em Space Mono
- Ponto final em diamante: marcadores de lista e selos usam um losango geométrico
  (não círculo, não check verde, não emoji)
- Glow sutil no tom gold para destacar UM elemento por vez (o preço, o CTA)
- Estética: boutique, minimalista, precisa — glassmorphism leve, linhas finas,
  muito respiro. Não é página de infoproduto: nada de vermelho piscando, setas
  chamativas, selos de "oferta imperdível".

## Tom de voz
Técnico-sábio, claro, pragmático, levemente acolhedor. Fala direto com o dono do
negócio ("você"). Evitar: jargão técnico, adjetivos vazios (incrível, revolucionário),
promessas de mágica, urgência falsa.

## Regras que NÃO podem ser quebradas
1. Nunca inventar depoimento, número, estatística, contador de vendas ou avaliação.
   Todo dado da página está em src/content e veio do Juan. Campo sem dado = TODO
   visível em desenvolvimento, nunca texto inventado.
2. Sem cronômetro regressivo, sem "restam X vagas" fictício, sem pop-up de
   "fulano acabou de comprar". A única escassez permitida é o número real de vagas
   que o Juan preencher em content.ts.
3. Não dizer em lugar nenhum que o site parte de um modelo/template pronto.
4. Garantia: falar da garantia legal de 7 dias (direito de arrependimento, Art. 49
   do Código de Defesa do Consumidor) + 1 rodada de ajuste ao vivo na entrega.
   Não prometer "ajustes ilimitados".
5. Parcelamento: dizer "parcelado em até 12x no cartão". NUNCA escrever "sem juros"
   — os juros do parcelamento são pagos pelo cliente. Não citar valor de parcela.
6. Depoimentos são de clientes da glim. (projetos sob medida), não do glim. On —
   identificar como "cliente da glim.".
7. O nome do produto vem sempre da constante PRODUCT_NAME em src/content/site.ts.

## Onde está o conteúdo
Todo texto da página fica em src/content/*.ts. Componentes não têm texto fixo.
