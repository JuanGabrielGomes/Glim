import { CASE_STUDIES, type CaseSummary } from '@/lib/content';

export interface CaseDetail {
  /** Tipo de trabalho, usado no rótulo mono ("Case 01 · Site institucional"). */
  type: string;
  /** Título do case em duas partes: texto normal e trecho em itálico serifado. */
  headline: readonly [string, string];
  /** Linha da ficha: cliente e ramo (diferente do nome curto do cliente). */
  clientLine: string;
  delivery: string;
  /** Prazo real do projeto; omitido quando ainda não foi confirmado. */
  timeline?: string;
  challenge: readonly string[];
  solution: readonly string[];
  deliverables: readonly string[];
  /** Resumo para a meta description e o JSON-LD. */
  description: string;
}

export interface CaseEntry extends CaseSummary, CaseDetail {
  number: string;
  next: CaseSummary;
}

const DETAILS: Record<string, CaseDetail> = {
  'ottea-studio': {
    type: 'Site institucional',
    headline: ['Um site editorial que explica o que o estúdio faz', 'em uma rolagem.'],
    clientLine: 'Ottea Studio, branding',
    delivery: 'Site institucional PT e EN',
    timeline: '4 semanas',
    challenge: [
      'A Ottea tinha uma marca forte nas redes, mas nenhum lugar que explicasse com calma o que o estúdio faz, como trabalha e por onde um cliente novo deve começar.',
      'O site precisava ter a mesma atmosfera do Instagram sem virar só um portfólio bonito: quem chega tem que entender a oferta e saber o próximo passo.',
    ],
    solution: [
      'Arquitetura da informação, direção visual editorial e desenvolvimento em Next.js, com versões em português e inglês, tema claro e escuro e SEO estrutural em todas as páginas.',
      'O processo da Ottea virou o eixo da navegação: cada etapa leva ao serviço certo e ao contato.',
    ],
    deliverables: [
      'Arquitetura da informação',
      'Direção visual editorial',
      'Site PT e EN',
      'Tema claro e escuro',
      'SEO estrutural',
      'Next.js · Vercel',
    ],
    description:
      'Site institucional bilíngue para a Ottea Studio, estúdio de branding e estratégia de marca: navegação editorial, tema claro e escuro e SEO estrutural.',
  },
  'sabores-em-foco': {
    type: 'Site-portfólio',
    headline: ['Um portfólio onde a foto faz a primeira impressão', 'e o texto fecha o cliente.'],
    clientLine: 'Sabores em Foco, fotografia gastronômica',
    delivery: 'Site-portfólio em uma página',
    timeline: '3 semanas',
    challenge: [
      'A Sabores em Foco vive de comunicar apetite em imagem. O site precisava deixar a fotografia carregar a primeira impressão e, logo em seguida, explicar o que o estúdio oferece e como contratar.',
      'Produção fotográfica, gestão de perfil e cobertura de eventos tinham que caber numa vitrine só, sem competir entre si.',
    ],
    solution: [
      'Um portfólio editorial com vitrine full-bleed, tipografia de revista e os serviços em destaque. Cada seção existe para fechar cliente: a fotografia abre a conversa e o texto resolve o resto.',
      'O contato direto por WhatsApp aparece em cada seção, sem exigir que a pessoa procure o botão.',
    ],
    deliverables: [
      'Curadoria e direção de portfólio',
      'Direção visual editorial',
      'Vitrine de serviços',
      'Contato por WhatsApp',
      'Next.js · Vercel',
    ],
    description:
      'Site-portfólio para a Sabores em Foco, estúdio de fotografia gastronômica: vitrine full-bleed, tipografia editorial e contato direto em cada seção.',
  },
  'mocellin-joias': {
    type: 'E-commerce',
    headline: ['Uma loja com atmosfera de joalheria física', 'e a velocidade de um e-commerce.'],
    clientLine: 'Mocellin Joias, joalheria',
    delivery: 'Loja virtual com painel próprio',
    timeline: '4 semanas',
    challenge: [
      'Joia é compra de alto valor percebido: a loja online precisava passar a mesma confiança e o mesmo cuidado de um balcão de joalheria, sem ficar lenta nem confusa.',
      'O catálogo tinha que comunicar sofisticação e, ao mesmo tempo, deixar o caminho até a compra óbvio.',
    ],
    solution: [
      'Uma loja com navegação por categoria, páginas de produto objetivas e uma atmosfera escura e sofisticada, condizente com o valor das peças.',
      'O fluxo de compra foi enxugado do primeiro clique ao carrinho, com painel próprio para a equipe cuidar do catálogo e WhatsApp integrado para tirar dúvidas.',
    ],
    deliverables: [
      'Arquitetura de e-commerce',
      'Direção visual premium',
      'Catálogo e páginas de produto',
      'Checkout otimizado',
      'WhatsApp integrado',
      'Next.js · Vercel',
    ],
    description:
      'Loja virtual para a Mocellin Joias: catálogo por categoria, páginas de produto objetivas, atmosfera escura premium e checkout sem fricção.',
  },
};

export function getCaseEntry(slug: string): CaseEntry | undefined {
  const index = CASE_STUDIES.findIndex((item) => item.slug === slug);
  const summary = CASE_STUDIES[index];
  const detail = DETAILS[slug];
  if (!summary || !detail) return undefined;

  return {
    ...summary,
    ...detail,
    number: `0${index + 1}`,
    next: CASE_STUDIES[(index + 1) % CASE_STUDIES.length],
  };
}
