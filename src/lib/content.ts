export type NavItem = { href: '#abordagem' | '#servicos' | '#work' | '#sobre' | '#contato'; label: string };
export type Pillar = { title: string; description: string; mobileDescription: string };
export type Capability = {
  title: string;
  description: string;
  mobileDescription: string;
  badge: string;
  idealFor: readonly string[];
  mobileIdealFor: string;
};
export type CaseStudy = {
  client: string;
  category: string;
  headline: string;
  summary: string;
  outcome: string;
  href: string;
  highlights: readonly string[];
  deliverables: readonly string[];
  imageSrc?: string;
  imagePosition?: string;
  mockupAccent: string;
  mockupAccentText?: string;
  mockupBackground: string;
};
export type TechStackItem = { label: string; detail: string };

export const CONTACT_WHATSAPP_NUMBER = '5554992181886';
export const CONTACT_WHATSAPP_LABEL = '+55 54 99218-1886';
export const CONTACT_WHATSAPP_HREF = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent('Ola, vim pelo site da glim. Quero iniciar um projeto.')}`;
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/glim.web';

export const HERO_TITLE = 'O nível do seu negócio precisa aparecer antes da conversa.';
export const HERO_ACCENT_WORDS = new Set(['nível', 'aparecer']);

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '#abordagem', label: 'Pilares' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#work', label: 'Trabalhos' },
  { href: '#sobre', label: 'Quem constrói' },
  { href: '#contato', label: 'Contato' },
];

export const PILLARS: readonly Pillar[] = [
  {
    title: 'Agilidade Lúcida',
    mobileDescription: 'Colocamos no ar o que importa, com direção clara.',
    description:
      'Começamos pelo que precisa entrar no ar e pelo que precisa ficar claro para quem visita. Velocidade com propósito, não pressa.',
  },
  {
    title: 'Precisão Geométrica',
    mobileDescription: 'Texto, layout e interação trabalham a favor da leitura.',
    description:
      'Texto, layout e interação têm função. Cada pixel é lapidado até sobrar só o que serve à leitura.',
  },
  {
    title: 'Experiência Fluida',
    mobileDescription: 'Interfaces simples, leves e fáceis de entender.',
    description:
      'O site precisa ser fácil de percorrer, entender e acionar, pra ninguém desistir antes de virar cliente.',
  },
];

export const CAPABILITIES: readonly Capability[] = [
  {
    title: 'Landing Pages',
    mobileDescription: 'Páginas objetivas para lançamento, campanha ou validação.',
    description:
      'Páginas para lançamento, campanha ou validação, com proposta bem apresentada, boa hierarquia de informação e CTA resolvido.',
    badge: 'Lançamento e conversão',
    idealFor: ['Validação de produto', 'Campanhas', 'Geração de leads'],
    mobileIdealFor: 'Validação, campanhas e leads',
  },
  {
    title: 'Sites Institucionais',
    mobileDescription: 'Sites que apresentam empresa e serviços com mais autoridade.',
    description:
      'Sites que apresentam empresa, serviços e diferenciais com mais consistência, ajudando a construir percepção de valor desde a primeira visita.',
    badge: 'Posicionamento e apresentação',
    idealFor: ['Empresas em crescimento', 'Reposicionamento', 'Fortalecimento de marca'],
    mobileIdealFor: 'Crescimento, reposicionamento e marca',
  },
  {
    title: 'E-commerce',
    mobileDescription: 'Lojas claras, rápidas e com compra sem fricção.',
    description:
      'Lojas com navegação simples, páginas de produto objetivas e fluxo de compra sem fricção desnecessária.',
    badge: 'Operação e venda',
    idealFor: [
      'Marcas que querem vender mais',
      'Operações que precisam de eficiência',
      'Produtos com alto valor percebido',
    ],
    mobileIdealFor: 'Venda, eficiência e percepção de valor',
  },
  {
    title: 'Plataformas Sob Medida',
    mobileDescription: 'Sistemas e produtos digitais construídos pra necessidade real do seu negócio.',
    description:
      'Quando uma solução pronta não resolve, construímos do zero: sistemas internos, produtos digitais e automações desenhados exatamente pra forma como o seu negócio funciona.',
    badge: 'Software sob medida',
    idealFor: [
      'Processos que hoje dependem de planilha',
      'Produtos digitais próprios',
      'Regras de negócio específicas',
    ],
    mobileIdealFor: 'Processos manuais, produtos próprios e regras específicas',
  },
];

export const TECH_STACK: readonly TechStackItem[] = [
  { label: 'Next.js', detail: 'Base de aplicação' },
  { label: 'TypeScript', detail: 'Tipagem de ponta a ponta' },
  { label: 'Tailwind CSS', detail: 'Sistema de design' },
  { label: 'Framer Motion', detail: 'Motion com intenção' },
  { label: 'Supabase', detail: 'Dados e autenticação' },
  { label: 'Vercel', detail: 'Deploy e performance' },
];

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    client: 'Ottea Studio',
    category: 'Branding, conteúdo e estratégia de marca',
    headline: 'Um site editorial, sensorial e claro para apresentar processo, serviços e posicionamento.',
    summary:
      'Para a Ottea Studio, desenhamos um site que organiza serviços, história e proposta em uma navegação autoral, sem perder objetividade comercial.',
    outcome:
      'O resultado equilibra identidade forte com leitura fácil do que a empresa faz, como trabalha e por onde começar.',
    href: 'https://otteastudio.com',
    highlights: ['PT e EN', 'Tema claro e escuro', 'SEO estrutural', 'Motion leve'],
    deliverables: [
      'Arquitetura da informação',
      'Landing institucional',
      'Direção visual editorial',
      'Base técnica em Next.js',
    ],
    mockupAccent: '#3f5c47',
    mockupAccentText: '#f7f3ee',
    mockupBackground: 'linear-gradient(160deg, #2a2320 0%, #1b1613 60%, #120e0c 100%)',
    imageSrc: '/cases/ottea.jpg',
    imagePosition: 'left 20%',
  },
  {
    client: 'Sabores em Foco',
    category: 'Produção fotográfica e presença digital',
    headline: 'Um portfólio afiado para um estúdio que vive de comunicar apetite em imagem.',
    summary:
      'Para a Sabores em Foco, construímos um site-portfólio que organiza produção fotográfica, gestão de perfil e cobertura de eventos em uma vitrine editorial de alto impacto visual.',
    outcome:
      'Cada seção existe para fechar cliente: a fotografia carrega a primeira impressão, o texto resolve o resto.',
    href: 'https://saboresemfoco.com',
    highlights: ['Portfólio full-bleed', 'Tipografia editorial', 'Showcase de serviços', 'Contato direto'],
    deliverables: [
      'Curadoria e direção de portfólio',
      'Landing institucional',
      'Direção visual editorial',
      'Base técnica em Next.js',
    ],
    mockupAccent: '#e2725b',
    mockupBackground: 'linear-gradient(160deg, #3a1f16 0%, #23110c 60%, #170a07 100%)',
    imageSrc: '/cases/sabores.jpg',
    imagePosition: 'center 35%',
  },
  {
    client: 'Mocellin Joias',
    category: 'E-commerce e experiência de produto',
    headline: 'Uma loja com atmosfera de joalheria física, sem perder velocidade de e-commerce.',
    summary:
      'Para a Mocellin Joias, desenvolvemos uma loja com navegação por categoria, páginas de produto objetivas e uma atmosfera visual escura e sofisticada, condizente com o valor percebido das peças.',
    outcome:
      'O catálogo comunica luxo sem perder clareza de compra, do primeiro clique ao carrinho.',
    href: 'https://mocellinjoias.com.br',
    highlights: ['Catálogo por categoria', 'Atmosfera escura premium', 'Checkout otimizado', 'WhatsApp integrado'],
    deliverables: [
      'Arquitetura de e-commerce',
      'Direção visual premium',
      'Catálogo e páginas de produto',
      'Base técnica em Next.js',
    ],
    mockupAccent: '#c9a15a',
    mockupBackground: 'linear-gradient(160deg, #17181c 0%, #0e0f12 60%, #08090b 100%)',
    imageSrc: '/cases/mocellin.jpg',
    imagePosition: 'center',
  },
] as const;

export type AboutInfo = {
  name: string;
  role: string;
  lead: string;
  bio: string;
  credentials: readonly string[];
  photoSrc: string;
};

export const ABOUT: AboutInfo = {
  name: 'Juan Gabriel Gomes',
  role: 'Fundador da glim.',
  lead: 'Comecei pela engenharia. O diferencial é entregar o que funciona de verdade pra empresas.',
  bio: 'Sou técnico em Informática pela UFRN e hoje curso Engenharia de Software. É essa base que sustenta como a glim. trabalha: entender o problema real de um negócio e saber exatamente o que precisa acontecer no código para virar produto funcional, não só bonito. Atuo como desenvolvedor fullstack, da arquitetura ao pixel final.',
  credentials: ['Técnico em Informática (UFRN)', 'Engenharia de Software', 'Full Stack'],
  photoSrc: '/team/juan-bg.jpg',
};
