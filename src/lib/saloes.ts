/** Dados da página /saloes (agenda online e site para salões e barbearias). */

export const brl = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const PLANOS = [
  {
    nome: 'Essencial',
    para: 'Até 3 profissionais',
    mensal: 59,
    implantacao: 790,
    extra: null,
  },
  {
    nome: 'Salão',
    para: 'Até 6 profissionais',
    mensal: 79,
    implantacao: 990,
    extra: 15,
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
      'O plano Essencial custa R$ 59 por mês, até 3 profissionais, e o plano Salão R$ 79, até 6 profissionais. Não existe taxa por agendamento: o valor é o mesmo com 50 ou 500 horários no mês.',
  },
  {
    question: 'Como funciona a implantação?',
    answer:
      'É um valor pago uma vez: R$ 790 no Essencial e R$ 990 no Salão. Pode ser em 3x no cartão ou no Pix, com 50% no início e 50% na entrega.',
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
    answer:
      'Nada. A agenda abre no navegador do celular, pelo link que vai na bio do Instagram.',
  },
] as const;

export const SALOES_WHATSAPP_TEXT =
  'Oi, Juan! Vi a página de salões e barbearias no site da glim. e quero conversar sobre a agenda online.';
