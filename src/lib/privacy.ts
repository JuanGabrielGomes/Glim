/*
 * ATENÇÃO: rascunho de política de privacidade. Os fatos técnicos (o que o formulário coleta, por onde
 * o dado trafega e que o site não usa analytics, pixels nem cookies de rastreamento) foram conferidos
 * no código em 2026-11-10. O texto jurídico (base legal, prazos) deve ser revisado por quem entende de
 * LGPD antes de ser tratado como definitivo. Se algum dia entrar analytics, pixel ou novo formulário,
 * ATUALIZE este arquivo junto.
 */
import { CONTACT_WHATSAPP_LABEL } from '@/lib/content';

export const COMPANY = {
  name: 'glim.',
  representative: 'Juan Gabriel Gomes',
  document: '65.587.567/0001-51',
  email: 'glim.contato@gmail.com',
} as const;

export type PrivacyBlock = { type: 'p'; text: string } | { type: 'list'; items: readonly string[] };

export interface PrivacySection {
  title: string;
  blocks: readonly PrivacyBlock[];
  /** Mostra os dados do responsável (CNPJ e e-mail) logo abaixo do texto. */
  showController?: boolean;
}

export const PRIVACY = {
  metaTitle: 'Política de privacidade',
  metaDescription:
    'Como o site da glim. trata dados pessoais: o que coletamos no formulário do raio-x, para que usamos e como você pode exercer seus direitos pela LGPD.',
  title: 'Política de privacidade',
  lastUpdated: '11 de novembro de 2026',
  intro:
    'Esta política explica quais dados pessoais o site glimweb.com coleta, para que servem, por quanto tempo ficam guardados e como você exerce seus direitos, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).',
  sections: [
    {
      title: 'Quem é o responsável',
      blocks: [
        {
          type: 'p',
          text: `O responsável pelo tratamento dos dados deste site é a ${COMPANY.name}, representada por ${COMPANY.representative}.`,
        },
      ],
      showController: true,
    },
    {
      title: 'O que coletamos',
      blocks: [
        {
          type: 'p',
          text: 'O único formulário do site é o do raio-x. Quando você o envia, recebemos os dados que você mesmo preenche:',
        },
        {
          type: 'list',
          items: [
            'nome;',
            'nome da empresa;',
            'site atual (ou o Instagram, se você não tiver site), quando você informa;',
            'número de WhatsApp;',
            'o que você precisa (por exemplo, site institucional ou e-commerce).',
          ],
        },
        {
          type: 'p',
          text: 'Não pedimos documentos, dados de pagamento nem senhas. Se você preferir não usar o formulário, pode falar com a gente direto pelo WhatsApp.',
        },
      ],
    },
    {
      title: 'Para que usamos',
      blocks: [
        {
          type: 'p',
          text: 'Usamos esses dados apenas para responder ao seu pedido: entrar em contato pelo WhatsApp, preparar o raio-x do seu site e, se você quiser, conversar sobre um projeto. Não vendemos seus dados e não os usamos para enviar publicidade de terceiros.',
        },
        {
          type: 'p',
          text: 'A base legal é a realização de procedimentos preliminares relacionados a um contrato, a pedido do próprio titular (art. 7º, V, da LGPD).',
        },
      ],
    },
    {
      title: 'Para onde os dados vão',
      blocks: [
        {
          type: 'p',
          text: `O formulário envia as informações por e-mail para a caixa de entrada da ${COMPANY.name} O site não guarda os dados em banco de dados: eles ficam apenas nesse e-mail. Para isso e para manter o site no ar, usamos:`,
        },
        {
          type: 'list',
          items: [
            'Google (Gmail): recebe e armazena o e-mail com o seu pedido. Os dados podem ser tratados fora do Brasil, nos termos do art. 33 da LGPD.',
            'Vercel: hospeda o site e pode registrar dados técnicos de acesso, como o endereço IP, para manter o serviço seguro e funcionando.',
          ],
        },
        {
          type: 'p',
          text: `Se você clicar no botão de WhatsApp (${CONTACT_WHATSAPP_LABEL}) ou no link do Instagram, a conversa passa a acontecer nessas plataformas, que tratam seus dados segundo as políticas de privacidade delas.`,
        },
      ],
    },
    {
      title: 'Cookies e rastreamento',
      blocks: [
        {
          type: 'p',
          text: 'Este site não usa ferramentas de análise de audiência, pixels de anúncios nem cookies de rastreamento ou de publicidade. Por isso não há banner de cookies. As fontes do site são servidas pelo próprio site, sem consultar servidores do Google durante a sua visita.',
        },
      ],
    },
    {
      title: 'Por quanto tempo guardamos',
      blocks: [
        {
          type: 'p',
          text: 'Guardamos o e-mail do seu pedido pelo tempo necessário para atender você e, se houver contratação, durante a relação e pelos prazos que a lei exigir. Passado esse período, ou se você pedir, eliminamos os dados.',
        },
      ],
    },
    {
      title: 'Segurança',
      blocks: [
        {
          type: 'p',
          text: 'O site usa conexão criptografada (HTTPS) e os pedidos chegam a uma conta Google da glim., protegida por senha. Nenhum sistema é totalmente imune a falhas, mas tratamos seus dados com cuidado e só pelo necessário.',
        },
      ],
    },
    {
      title: 'Seus direitos',
      blocks: [
        {
          type: 'p',
          text: 'Pela LGPD (art. 18), você pode pedir a qualquer momento: confirmação de que tratamos seus dados, acesso a eles, correção, anonimização, bloqueio ou eliminação, informação sobre com quem os compartilhamos e oposição ao tratamento.',
        },
      ],
    },
    {
      title: 'Como pedir a exclusão',
      blocks: [
        {
          type: 'p',
          text: `Envie um e-mail para ${COMPANY.email} com o assunto “Exclusão de dados”. Respondemos no prazo de até 15 dias previsto na LGPD. Se não ficar satisfeito com a resposta, você pode procurar a Autoridade Nacional de Proteção de Dados (ANPD).`,
        },
      ],
    },
    {
      title: 'Mudanças nesta política',
      blocks: [
        {
          type: 'p',
          text: 'Esta política pode ser atualizada, por exemplo se o site passar a usar uma nova ferramenta. A data da última atualização fica no topo da página.',
        },
      ],
    },
  ] satisfies readonly PrivacySection[],
};
