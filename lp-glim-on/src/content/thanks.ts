export interface ThanksStep {
  title: string;
  text: string;
}

export const thanks = {
  metaTitle: "Pagamento confirmado",
  // Palavra em destaque no topo; o ponto final é o losango dourado.
  hero: "Obrigado",
  badge: "Pagamento confirmado",
  title: "Agora vamos marcar nossa conversa.",
  text: "Escolha o melhor horário para a nossa Reunião 1: são cerca de 20 minutos, por Google Meet. Se puder, já separe suas fotos, a logo (se tiver) e os contatos do seu negócio.",
  button: "Escolher horário",
  stepsTitle: "Próximos passos",
  // Mesmos fatos da página de vendas, em ordem.
  steps: [
    { title: "Escolha o horário", text: "Reunião 1, cerca de 20 minutos, por Google Meet." },
    { title: "Separe seus materiais", text: "Fotos, a logo (se tiver) e os contatos do seu negócio." },
    { title: "Site no ar", text: "Em até 7 dias depois da nossa conversa, no seu endereço." },
  ] satisfies ThanksStep[],
  supportEmail: "O link também foi enviado para o seu e-mail.",
  supportWhatsapp: "Alguma dúvida? Me chama no WhatsApp:",
  todos: {
    booking: "configurar NEXT_PUBLIC_BOOKING_URL (página de agendamento do Google Agenda) no .env.local.",
    whatsapp:
      "WhatsApp de contato: NEXT_PUBLIC_WHATSAPP_URL (link) e site.whatsappDisplay em src/content/site.ts (número escrito). Sem os dois, a frase do WhatsApp não aparece.",
  },
};
