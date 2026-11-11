export type NavItem = { href: string; label: string };

export interface ServiceSummary {
  slug: string;
  title: string;
  description: string;
}

export interface CaseSummary {
  slug: string;
  client: string;
  /** Linha mono acima do título: "Cliente · tipo de trabalho". */
  kind: string;
  title: string;
  blurb: string;
  tags: readonly string[];
  /** Site ao vivo do cliente. */
  href: string;
  /** false: o site está fora do ar, então o link "ver ao vivo" não deve aparecer. */
  isLive: boolean;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
}

export interface AboutInfo {
  name: string;
  role: string;
  title: readonly [string, string, string];
  bio: string;
  credentials: readonly string[];
  photoSrc: string;
  photoAlt: string;
}

export const CONTACT_WHATSAPP_NUMBER = '5554992181886';
export const CONTACT_WHATSAPP_LABEL = '+55 54 99218-1886';
export const CONTACT_WHATSAPP_MESSAGE = 'Olá, vim pelo site da glim. Quero um raio-x do meu site.';
export const CONTACT_WHATSAPP_HREF = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(CONTACT_WHATSAPP_MESSAGE)}`;
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/glim.web';

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/#trabalhos', label: 'Trabalhos' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#processo', label: 'Processo' },
  { href: '/#estudio', label: 'Estúdio' },
];

export const HERO = {
  lead: 'Desenhamos e construímos sob medida para empresas que já são boas no que fazem e precisam parecer à altura na internet.',
  cta: 'Pedir um raio-x do meu site',
  secondary: 'Ver trabalhos',
  side: ['Sites', 'Lojas', 'Sistemas'],
  facts: [
    { label: 'Prazo padrão', value: '4 semanas' },
    { label: 'Código', value: 'Próprio, sem template' },
    { label: 'Depois da entrega', value: '30 dias de ajustes' },
    { label: 'Atendimento', value: 'Serra Gaúcha · Brasil' },
  ],
} as const;

export const SERVICES_LIST: readonly ServiceSummary[] = [
  {
    slug: 'sites-institucionais',
    title: 'Sites institucionais',
    description:
      'Empresa, serviços e diferenciais apresentados com autoridade desde a primeira visita.',
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    description:
      'Lojas rápidas, com catálogo claro, checkout sem atrito e painel para a sua equipe.',
  },
  {
    slug: 'landing-pages',
    title: 'Landing pages',
    description: 'Uma página, uma tarefa: levar quem chegou do anúncio até o contato.',
  },
  {
    slug: 'sistemas-sob-medida',
    title: 'Sistemas sob medida',
    description:
      'Quando a planilha não dá mais conta: sistemas internos e produtos digitais do zero.',
  },
];

export const GLIM_ON_CARD = {
  eyebrow: 'glim. On · escopo fechado',
  title: 'Site em 7 dias',
  text: 'Site institucional de uma página. R$ 939 no Pix ou 12× de R$ 97.',
  cta: 'Conhecer o glim. On',
  href: '/servicos/glim-on',
} as const;

export const PROCESS = {
  weeks: '4',
  caption: ['Semanas, do briefing', 'ao site no ar'],
  promise: ['Prazo escrito na proposta.', 'Se mudar,', 'você sabe antes.'],
} as const;

export const PRINCIPLE = {
  label: 'Princípio Nº 01',
  quote: 'Um site bem feito não chama atenção para si. Chama clientes.',
} as const;

export const CASE_STUDIES: readonly CaseSummary[] = [
  {
    slug: 'ottea-studio',
    client: 'Ottea Studio',
    kind: 'Ottea Studio · branding e estratégia',
    title: 'Um site editorial que explica o que o estúdio faz em uma rolagem.',
    blurb:
      'Serviços, história e proposta organizados numa navegação autoral, sem perder a clareza comercial.',
    tags: ['PT e EN', 'Claro e escuro', 'SEO'],
    href: 'https://otteastudio.com',
    isLive: true,
    imageSrc: '/cases/ottea.jpg',
    imageWidth: 3346,
    imageHeight: 1751,
    imageAlt: 'Site da Ottea Studio',
  },
  {
    slug: 'sabores-em-foco',
    client: 'Sabores em Foco',
    kind: 'Sabores em Foco · fotografia gastronômica',
    title: 'Um portfólio onde a foto faz a primeira impressão e o texto fecha o cliente.',
    blurb: 'Vitrine full-bleed, serviços em destaque e contato direto em cada seção.',
    tags: ['Portfólio', 'Tipografia editorial', 'WhatsApp'],
    href: 'https://saboresemfoco.com',
    isLive: true,
    imageSrc: '/cases/sabores.jpg',
    imageWidth: 3349,
    imageHeight: 1735,
    imageAlt: 'Site da Sabores em Foco',
  },
  {
    slug: 'mocellin-joias',
    client: 'Mocellin Joias',
    kind: 'Mocellin Joias · e-commerce',
    title: 'Uma loja com atmosfera de joalheria física e a velocidade de um e-commerce.',
    blurb: 'Catálogo por categoria, páginas de produto objetivas e checkout sem fricção.',
    tags: ['Catálogo', 'Checkout', 'Painel próprio'],
    href: 'https://mocellinjoias.com.br',
    isLive: false,
    imageSrc: '/cases/mocellin.jpg',
    imageWidth: 3337,
    imageHeight: 1751,
    imageAlt: 'Loja da Mocellin Joias',
  },
];

export const ABOUT: AboutInfo = {
  name: 'Juan Gabriel Gomes',
  role: 'Fundador da glim.',
  title: ['Um estúdio pequeno de propósito.', 'Quem vende', 'é quem desenha e programa.'],
  bio: 'Sou Juan Gabriel Gomes, técnico em Informática pela UFRN e estudante de Engenharia de Software. Atendo cada projeto da conversa ao deploy: entendo o problema do negócio e sei exatamente o que precisa acontecer no código para virar um site que funciona.',
  credentials: ['Técnico em Informática · UFRN', 'Engenharia de Software', 'Full stack'],
  photoSrc: '/team/juan-1.jpg',
  photoAlt: 'Juan Gabriel Gomes, fundador da glim.',
};

export const RAIO_X = {
  title: ['Raio-x'],
  heading: ['Quer saber o que', 'cortar', 'no seu site?'],
  text: 'Em 15 minutos, por vídeo ou WhatsApp, mostramos o que está custando clientes no seu site atual e o que faríamos primeiro. Sem compromisso.',
  whatsappLabel: 'Prefiro chamar no WhatsApp',
  submit: 'Quero o raio-x',
  needs: [
    'Site institucional',
    'E-commerce',
    'Landing page',
    'Sistema sob medida',
    'Ainda não sei',
  ],
} as const;
