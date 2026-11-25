/** Dados da página /saloes (agenda online e site para salões e barbearias). */

export const brl = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

/** Nome do produto para salões e barbearias. */
export const PRODUTO = 'glim. salon';

/**
 * Planos do glim. salon, empilhados: cada um tem tudo do anterior.
 * Fonte: glim-saloes/lib/planos.ts. Até o piloto rodar, o Pro é "Entrar na lista",
 * sem data de entrega.
 */
export const PLANOS = [
  {
    id: 'essencial',
    nome: 'Essencial',
    para: 'Até 3 profissionais',
    mensal: 59,
    implantacao: 790,
    extra: null,
    itens: [
      'Agenda online com a marca do salão',
      'Painel de horários, serviços e valores',
      'Site próprio de bônus',
    ],
  },
  {
    id: 'plus',
    nome: 'Plus',
    para: 'Até 6 profissionais',
    mensal: 79,
    implantacao: 990,
    extra: 15,
    itens: [
      'Acesso por profissional',
      'Ficha do cliente',
      'Relatório mensal',
      'Google configurado',
    ],
  },
  {
    id: 'pro',
    nome: 'Pro',
    para: 'Até 6 profissionais',
    mensal: 229,
    implantacao: 1290,
    extra: 15,
    itens: ['Atendente de IA no WhatsApp do salão', 'Lembretes no WhatsApp'],
  },
] as const;

/**
 * Salões FICTÍCIOS de demonstração, publicados no projeto glim-previa (previa.glimweb.com/<slug>).
 * Feitos pelo método glim.: cada um parte de um conceito tirado do nome e tem um elemento-assinatura
 * próprio (nada de molde com outra cor). Fotos do Unsplash, tratadas na direção de cada um.
 * Os prints em public/saloes/ saem dessas páginas (site no desktop e agenda no celular).
 */
export const EXEMPLOS = [
  {
    slug: 'exemplo-prumo',
    nome: 'Barbearia Prumo',
    tipo: 'Barbearia',
    cores: ['#191A1B', '#B08D57', '#E9E5DD'],
    conceito: 'Corte no prumo.',
    assinatura:
      'Um fio de latão desce do topo da página e termina no peso, com a régua do degradê ao lado.',
  },
  {
    slug: 'exemplo-mare',
    nome: 'Ateliê Maré',
    tipo: 'Salão de cabelo',
    cores: ['#15232D', '#EAE2D4', '#C8643F'],
    conceito: 'Cada cabelo tem a sua maré.',
    assinatura:
      'Uma curva de maré atravessa a página e recorta a foto; a agenda vira tábua de horários.',
  },
  {
    slug: 'exemplo-lunula',
    nome: 'Studio Lúnula',
    tipo: 'Studio de unhas',
    cores: ['#F4EFE9', '#A3213A', '#2E1A24'],
    conceito: 'O detalhe que só quem faz repara.',
    assinatura:
      'A foto num recorte de unha com a lúnula vazada; os três passos são três fases da lua.',
  },
] as const;

export const LANCAMENTO = { implantacao: 590, vagas: 5 } as const;

/**
 * Exemplo de economia para quem já paga um app de agenda: 3 profissionais no Booksy
 * (R$ 99,99 + R$ 20 por agenda adicional) contra o plano Essencial da glim.
 */
const BOOKSY_MES = 99.99 + 20 * 2;
export const EXEMPLO_APP = {
  app: 'Booksy',
  profissionais: 3,
  appAno: Math.round(BOOKSY_MES * 12),
  glimAno1: PLANOS[0].implantacao + PLANOS[0].mensal * 12,
  glimAno2: PLANOS[0].mensal * 12,
  economia: Math.round((1 - (PLANOS[0].mensal * 12) / (BOOKSY_MES * 12)) * 100),
} as const;

export const PASSOS = [
  {
    title: 'Escolhe',
    text: 'Serviço com o valor, profissional, dia, horário e forma de pagamento, numa tela com a identidade do salão.',
  },
  {
    title: 'Reserva',
    text: 'Reservar horário já bloqueia a agenda na hora. Ninguém marca em cima, e o cliente não precisa chamar no WhatsApp.',
  },
  {
    title: 'Avisa',
    text: 'Se quiser, ele avisa o salão no WhatsApp com a mensagem pronta: serviço, nome e horário. É um extra.',
  },
  {
    title: 'Você gerencia',
    text: 'No painel, você abre e fecha horários, muda serviços e valores e vê a agenda do dia.',
  },
] as const;

export const SEM_AGENDA = [
  {
    title: 'À noite e no domingo',
    text: 'O cliente decide fora do expediente. Se ninguém responde, ele procura outro horário, em outro lugar.',
  },
  {
    title: 'Na busca do Google',
    text: 'Quem procura salão ou barbearia na sua cidade encontra quem tem site. O Instagram quase não aparece nessa busca.',
  },
  {
    title: 'No dia a dia',
    text: 'Cada horário vira uma conversa. O profissional para o atendimento para responder mensagem.',
  },
] as const;

export const ENTRA = [
  'Agenda online com a identidade do salão',
  'Valor de cada serviço e forma de pagamento escolhida pelo cliente',
  'Taxa de cancelamento que você define, como 20% do valor',
  'Painel de horários, serviços e clientes',
  'Site próprio, com as suas fotos e as suas cores',
  'Domínio, hospedagem e segurança',
  'Ajustes pequenos sempre que precisar',
] as const;

export const CONDICOES = [
  {
    title: 'Lançamento',
    text: `Os ${LANCAMENTO.vagas} primeiros salões pagam ${brl(LANCAMENTO.implantacao)} de implantação, em troca de virar case com fotos e depoimento.`,
  },
  {
    title: 'Sem fidelidade',
    text: 'Cancela quando quiser. A mensalidade começa quando a agenda entra no ar.',
  },
  {
    title: 'Sem taxa por cliente',
    text: 'O valor é o mesmo com 50 ou 500 agendamentos no mês.',
  },
] as const;

export const FAQ = [
  {
    question: 'Preciso trocar de app para usar?',
    answer:
      'Você troca a agenda, não o seu jeito de atender. Na reunião, mostramos a prévia com a identidade do seu salão, e você decide se faz sentido sair do app que usa hoje.',
  },
  {
    question: 'Quanto custa por mês e por agendamento?',
    answer:
      'O Essencial custa R$ 59 por mês, até 3 profissionais. O Plus custa R$ 79, até 6 profissionais, e o Pro R$ 229, com o atendente de IA no WhatsApp. No Plus e no Pro, cada profissional a mais custa R$ 15 por mês. Não existe taxa por agendamento: o valor é o mesmo com 50 ou 500 horários no mês.',
  },
  {
    question: 'Como funciona a implantação?',
    answer:
      'É um valor pago uma vez: R$ 790 no Essencial, R$ 990 no Plus e R$ 1.290 no Pro. Pode ser em 3x no cartão ou no Pix, com 50% no início e 50% na entrega.',
  },
  {
    question: 'O que muda do Plus para o Pro?',
    answer:
      'O Pro tem tudo do Plus e mais um atendente de IA que responde e manda lembretes no WhatsApp do salão. Ele ainda não tem data de entrega: dá para entrar na lista, começar no Plus e subir para o Pro quando abrir vaga.',
  },
  {
    question: 'Tem fidelidade?',
    answer:
      'Não. Você cancela quando quiser. A mensalidade só começa quando a agenda entra no ar e cobre domínio, hospedagem, segurança e ajustes pequenos.',
  },
  {
    question: 'Dá para cobrar taxa de cancelamento?',
    answer:
      'Dá. Você define a porcentagem do valor do agendamento, por exemplo 20%, e ela aparece para o cliente, já calculada em reais, antes de ele reservar.',
  },
  {
    question: 'O cliente precisa chamar no WhatsApp para garantir o horário?',
    answer:
      'Não. O botão Reservar horário já deixa o horário reservado na agenda. O aviso no WhatsApp do salão é um extra, para quem quiser.',
  },
  {
    question: 'O que o cliente precisa instalar?',
    answer: 'Nada. A agenda abre no navegador do celular, pelo link que vai na bio do Instagram.',
  },
] as const;

export const SALOES_PRO_WHATSAPP_TEXT =
  'Oi, Juan! Vi a página de salões e barbearias no site da glim. e quero entrar na lista do plano Pro do glim. salon.';

export const SALOES_WHATSAPP_TEXT =
  'Oi, Juan! Vi a página de salões e barbearias no site da glim. e quero conversar sobre a agenda online.';
