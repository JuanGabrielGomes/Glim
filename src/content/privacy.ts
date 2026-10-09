/*
 * ATENÇÃO: rascunho de política de privacidade gerado para esta página.
 * O texto deve ser revisado pelo Juan (de preferência com apoio jurídico) antes de publicar —
 * em especial a base legal escolhida para o Pixel da Meta e os prazos.
 */
import { AGENCY_NAME, PRODUCT_NAME } from "@/content/site";

export type PrivacyBlock = { type: "p"; text: string } | { type: "list"; items: string[] };

export interface PrivacySection {
  title: string;
  blocks: PrivacyBlock[];
  /** Mostra os dados do responsável (CNPJ/CPF e e-mail) logo abaixo do texto. */
  showController?: boolean;
}

export const privacy = {
  metaTitle: "Política de privacidade",
  metaDescription: `Como a página do ${PRODUCT_NAME} trata dados pessoais, de acordo com a LGPD.`,
  title: "Política de privacidade",
  lastUpdatedLabel: "Última atualização:",
  // TODO: data em que o texto revisado for publicado (ex.: "2 de outubro de 2026").
  lastUpdated: null as string | null,
  backLabel: "Voltar para a página inicial",
  controllerLabels: { document: "CNPJ/CPF", email: "E-mail" },
  intro: `Esta política explica quais dados são coletados quando você visita a página do ${PRODUCT_NAME}, para que servem, por quanto tempo ficam guardados e como você pode exercer seus direitos, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).`,
  sections: [
    {
      title: "Quem é o responsável",
      blocks: [
        {
          type: "p",
          text: `O responsável pelo tratamento dos dados desta página é a ${AGENCY_NAME}, representada por Juan Gabriel Gomes.`,
        },
      ],
      showController: true,
    },
    {
      title: "O que esta página não coleta",
      blocks: [
        {
          type: "p",
          text: "Esta página não tem formulário próprio, cadastro ou login. Aqui não pedimos nome, e-mail, telefone nem dados de pagamento.",
        },
      ],
    },
    {
      title: "O que é coletado pelo Pixel da Meta",
      blocks: [
        {
          type: "p",
          text: "Usamos o Pixel da Meta (empresa responsável pelo Facebook e pelo Instagram) para medir o resultado dos nossos anúncios. Quando você acessa a página, o pixel pode coletar:",
        },
        {
          type: "list",
          items: [
            "endereço IP e informações do navegador e do dispositivo (como tipo de aparelho, sistema operacional e idioma);",
            "páginas visitadas, data e hora do acesso e a página de onde você veio;",
            "ações feitas na página: a visita, o clique para assistir ao vídeo e o clique para ir ao checkout;",
            "identificadores guardados em cookies (como _fbp e _fbc) e o identificador de clique do anúncio (fbclid), quando você chega por um anúncio.",
          ],
        },
        {
          type: "p",
          text: "Se você estiver conectado a uma conta da Meta no mesmo navegador, a Meta pode associar esses dados ao seu perfil, conforme a política de privacidade dela.",
        },
      ],
    },
    {
      title: "Parâmetros de campanha",
      blocks: [
        {
          type: "p",
          text: "Quando você chega por um link de anúncio, os parâmetros de campanha do endereço (como utm_source e fbclid) ficam guardados temporariamente no armazenamento da sessão do seu navegador e são repassados ao link do checkout, para sabermos de qual anúncio veio cada compra. Eles são apagados quando você fecha a aba.",
        },
      ],
    },
    {
      title: "Para que usamos esses dados",
      blocks: [
        {
          type: "list",
          items: [
            "medir quantas pessoas visitam a página, assistem ao vídeo e vão ao checkout;",
            "saber quais anúncios funcionam melhor e ajustar onde investimos;",
            "mostrar anúncios para pessoas com interesses parecidos e para quem já visitou a página.",
          ],
        },
        {
          type: "p",
          text: "A base legal para esse uso é o legítimo interesse (art. 7º, IX, da LGPD) em medir e melhorar a divulgação do serviço. Não vendemos seus dados.",
        },
      ],
    },
    {
      title: "Por quanto tempo",
      blocks: [
        {
          type: "p",
          text: "O cookie _fbp fica no seu navegador por até 90 dias, e esse prazo é renovado a cada visita. Os dados recebidos pela Meta são guardados por ela pelo prazo definido na política de privacidade dela. Os parâmetros de campanha são apagados quando você fecha a aba.",
        },
      ],
    },
    {
      title: "Com quem os dados são compartilhados",
      blocks: [
        {
          type: "list",
          items: [
            "Meta Platforms — pixel e anúncios. Os dados podem ser tratados fora do Brasil, nos termos do art. 33 da LGPD.",
            "Kiwify — o checkout acontece na plataforma da Kiwify, que trata seus dados de compra e pagamento segundo a política de privacidade dela.",
            "Google — depois da compra, o agendamento da conversa é feito no Google Agenda e a reunião acontece no Google Meet, segundo a política de privacidade do Google.",
            "Provedor do vídeo — o player só é carregado quando você clica para assistir. A partir daí, o provedor do vídeo pode coletar dados de acordo com a política dele.",
            "Vercel — empresa que hospeda esta página e pode registrar dados técnicos de acesso (como o endereço IP) para manter o site seguro e funcionando.",
          ],
        },
      ],
    },
    {
      title: "Seus direitos",
      blocks: [
        {
          type: "p",
          text: "Pela LGPD (art. 18), você pode pedir a qualquer momento: confirmação de que tratamos seus dados, acesso a eles, correção, anonimização, bloqueio ou eliminação, informação sobre com quem os compartilhamos e oposição ao tratamento.",
        },
      ],
    },
    {
      title: "Como pedir a exclusão dos seus dados",
      blocks: [
        {
          type: "p",
          text: "Envie um e-mail para o endereço indicado no início desta política com o assunto “Exclusão de dados”. Respondemos no prazo de até 15 dias previsto na LGPD.",
        },
        {
          type: "p",
          text: "Você também pode apagar os cookies do seu navegador a qualquer momento e ajustar suas preferências de anúncios nas configurações da sua conta da Meta. Se não ficar satisfeito com a resposta, você pode procurar a Autoridade Nacional de Proteção de Dados (ANPD).",
        },
      ],
    },
    {
      title: "Mudanças nesta política",
      blocks: [
        {
          type: "p",
          text: "Esta política pode ser atualizada. A data da última atualização fica no topo da página.",
        },
      ],
    },
  ] satisfies PrivacySection[],
  todos: {
    lastUpdated: "data da última atualização. Em src/content/privacy.ts → lastUpdated.",
    document: "CNPJ ou CPF do responsável. Em src/content/site.ts → company.document.",
    email: "e-mail para pedidos de privacidade. Em src/content/site.ts → company.email.",
  },
};
