import { AGENCY_NAME, PRODUCT_NAME } from "@/content/site";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioItem {
  name: string;
  description: string;
  image: ImageAsset;
}

export interface TestimonialItem {
  image: ImageAsset;
}

export interface HowItWorksStep {
  lead: string;
  rest: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const landing = {
  cta: {
    label: "Quero meu site no ar",
    support: "Pagamento seguro · Parcelado em até 12x no cartão · 7 dias de garantia por lei",
  },

  // Nota do asterisco nos "7 dias" de entrega (não vale para os 7 dias de garantia).
  deliveryNote: "*Prazo de 7 dias contado a partir da reunião de alinhamento inicial.",

  hero: {
    kicker: `${PRODUCT_NAME} — site profissional em até 7 dias*`,
    title: "Se alguém pesquisar o seu negócio no Google agora, o que aparece?",
    subtitle:
      "Um site profissional no ar em até 7 dias* — construído e entregue por mim, do início ao fim. Você não precisa entender nada de tecnologia.",
  },

  video: {
    note: "Assista com o som ligado. O vídeo tem cerca de 13 minutos.",
    placeholder: "VSL",
    playLabel: "Assistir ao vídeo",
    iframeTitle: `Vídeo de apresentação do ${PRODUCT_NAME}`,
    posterSrc: "/vsl-poster.jpg",
  },

  problem: {
    title: "A primeira impressão do seu negócio acontece numa tela",
    text: "Antes de ligar, a pessoa pesquisa. Se o que ela encontra é um perfil parado no Instagram — ou nada —, ela fecha a aba e procura outro. E você nunca fica sabendo quantos foram.",
    statLead: "4 em cada 10",
    statRest: " consumidores desconfiam de negócios que só existem nas redes sociais, sem site oficial.",
    source: "Pesquisa Locaweb/Conversion, 2025.",
  },

  howItWorks: {
    title: "Como funciona",
    steps: [
      { lead: "Você garante sua vaga", rest: " e agenda uma conversa rápida comigo — uns 15 minutos." },
      { lead: "Eu construo o seu site", rest: " com as suas informações, fotos e contatos." },
      { lead: "Na entrega", rest: ", mostro o site pronto, fazemos 1 ajuste ao vivo e você aprova." },
      { lead: "O site vai ao ar", rest: ", no seu endereço, funcionando." },
    ] satisfies HowItWorksStep[],
    closing: "Você me dá cerca de meia hora, somando as duas conversas. O resto é comigo.",
  },

  portfolio: {
    title: "Sites de verdade, entregues pela glim.",
    // TODO: 2 a 4 projetos construídos pela glim., com autorização do cliente.
    items: [] as PortfolioItem[],
  },

  about: {
    title: "Quem está por trás",
    text: `Eu sou o Juan Gabriel, fundador da glim. Estudo tecnologia desde 2022 e hoje trabalho com projetos e sites para empresas — de lojas virtuais a sites institucionais completos. O ${PRODUCT_NAME} leva esse mesmo padrão de qualidade pra quem precisa de uma solução rápida e objetiva.`,
    // TODO: foto real do Juan.
    photo: null as ImageAsset | null,
  },

  testimonials: {
    title: "O que clientes da glim. disseram",
    caption: "cliente da glim.",
    // TODO: 3 a 5 prints reais de WhatsApp, autorizados, com número e foto borrados.
    items: [] as TestimonialItem[],
  },

  offer: {
    title: "O que você recebe",
    items: [
      "Site institucional profissional, pensado pro seu segmento",
      "Publicado no ar, com certificado de segurança (o cadeado que mostra que o site é confiável)",
      "Formulário de contato e botão de WhatsApp integrados",
      "Otimização básica para aparecer em buscas locais no Google",
      "Funcionando bem no celular, no tablet e no computador",
      "1 rodada de ajuste ao vivo na entrega",
    ],
    comparison: "Com uma agência, isso passaria facilmente de R$ 2.500 e levaria um ou dois meses.",
    price: "R$ 997",
    condition: "parcelado em até 12x no cartão, ou à vista no Pix",
    spotsLabel: (spots: number): string => `Vagas disponíveis: ${spots}`,
  },

  guarantee: {
    title: "O risco é meu, não seu",
    text: "Por lei (artigo 49 do Código de Defesa do Consumidor), você tem 7 dias depois da compra para desistir e receber o reembolso total — sem precisar justificar. E na entrega, você só aprova o site depois do ajuste ao vivo, quando ele estiver do seu jeito.",
  },

  notIncluded: {
    title: "Pra deixar claro desde já",
    text: `O ${PRODUCT_NAME} é um site institucional com escopo fechado — é isso que garante o prazo e o preço. Não fazem parte do pacote: loja virtual, blog, sistema de agendamento, criação de logotipo/identidade visual e gestão de anúncios. Se você precisar de algo assim, me chama que a gente conversa sobre um projeto sob medida.`,
  },

  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        question: "É caro?",
        answer:
          "Agências cobram de R$ 2.500 a R$ 15.000 e levam semanas; freelancers, de R$ 500 a R$ 3.000, sem garantia de prazo. R$ 997 com entrega em até 7 dias* está dentro ou abaixo do que o mercado cobra — e ainda dá pra parcelar.",
      },
      {
        question: "Já tenho Instagram. Preciso de site?",
        answer:
          "O Instagram é a vitrine pra quem já te segue. O site é o seu endereço oficial: aparece no Google, organiza seus serviços e passa a confiança que muita gente procura antes de contratar.",
      },
      {
        question: "Não tenho tempo pra isso.",
        answer:
          "São duas conversas curtas, somando cerca de meia hora. Você não escreve, não configura e não acompanha nada técnico.",
      },
      {
        question: "Não entendo nada de domínio e hospedagem.",
        answer: "Não precisa. Eu cuido de toda a parte técnica.",
      },
      {
        question: "E se eu não gostar?",
        answer:
          "Você tem 7 dias de garantia por lei para pedir o reembolso total, e o site só é considerado entregue depois que você aprova.",
      },
      {
        question: "Como funciona depois do pagamento?",
        answer:
          "Logo depois da compra você escolhe o horário da nossa primeira conversa. A partir dela, o site fica pronto em até 7 dias.",
      },
    ] satisfies FaqItem[],
  },

  finalCta: {
    title: "Daqui a uma semana, o seu negócio pode estar aparecendo do jeito que merece.",
  },

  footer: {
    brand: AGENCY_NAME,
    documentLabel: "CNPJ/CPF",
    contactLabel: "contato",
    // CNPJ/CPF e e-mail de contato vêm de site.company (usados também na política de privacidade).
    privacyLabel: "Política de privacidade",
    privacyHref: "/privacidade",
  },

  // Avisos exibidos só em desenvolvimento quando falta dado.
  todos: {
    vsl: "configurar NEXT_PUBLIC_VSL_PROVIDER (youtube, vimeo, panda ou mp4) e NEXT_PUBLIC_VSL_URL no .env.local. Capa do vídeo: public/vsl-poster.jpg.",
    portfolio: "2 a 4 projetos (captura + nome + uma linha). Só projetos construídos pela glim., com autorização do cliente. Em src/content/landing.ts → portfolio.items.",
    aboutPhoto: "foto real do Juan. Em src/content/landing.ts → about.photo.",
    testimonials: "3 a 5 prints reais de WhatsApp, autorizados, com número e foto borrados. Em src/content/landing.ts → testimonials.items.",
    spots: "número real de vagas desta semana/mês. Em src/content/site.ts → spotsAvailable. Se não houver número, a linha não aparece.",
    footerDocument: "CNPJ ou CPF da glim. Em src/content/site.ts → company.document (rodapé e política de privacidade).",
    footerContact: "e-mail de contato. Em src/content/site.ts → company.email (rodapé e política de privacidade).",
  },
};
