export type ServicePage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  audience: readonly string[];
  deliverables: readonly { title: string; text: string }[];
  faq: readonly { question: string; answer: string }[];
  whatsappText: string;
  externalUrl?: string;
  price?: { value: string; condition: string; note: string };
  priceValue?: number;
  process?: readonly { title: string; text: string }[];
  notIncluded?: string;
};

export const SERVICE_PROCESS = [
  {
    title: 'Diagnóstico',
    text: 'Entendemos o negócio, o público e o objetivo antes de abrir qualquer ferramenta. Aqui nasce o escopo.',
  },
  {
    title: 'Direção',
    text: 'Definimos estrutura, mensagem e visual. Você aprova o caminho antes de a construção começar.',
  },
  {
    title: 'Construção',
    text: 'Design e código andam juntos, com Next.js, TypeScript e uma base pensada pra performance e SEO.',
  },
  {
    title: 'Entrega e evolução',
    text: 'Publicamos, acompanhamos os primeiros resultados e deixamos o projeto pronto pra crescer.',
  },
] as const;

export const SERVICE_PAGES: readonly ServicePage[] = [
  {
    slug: 'landing-pages',
    name: 'Landing Pages',
    metaTitle: 'Criação de Landing Pages que Convertem',
    metaDescription:
      'Criamos landing pages rápidas, objetivas e bem desenhadas para lançamento, campanha ou captação de leads. Design e código sob medida, da Serra Gaúcha para todo o Brasil.',
    eyebrow: 'Lançamento e conversão',
    h1: 'Landing pages que transformam visita em contato.',
    intro:
      'Uma landing page tem uma tarefa só: levar quem chegou até a ação certa. Desenhamos a mensagem, a hierarquia e o botão de forma que o visitante entenda a oferta em segundos e saiba exatamente o próximo passo.',
    audience: [
      'Quem vai lançar um produto ou serviço',
      'Campanhas pagas e de divulgação',
      'Validação de uma ideia antes de investir mais',
      'Captação de leads e agendamentos',
    ],
    deliverables: [
      {
        title: 'Mensagem e estrutura',
        text: 'A ordem das informações pensada pra conduzir a leitura até a ação, sem excesso e sem ruído.',
      },
      {
        title: 'Design sob medida',
        text: 'Visual alinhado à sua marca, sem template genérico. A página parece sua, não de todo mundo.',
      },
      {
        title: 'Carregamento rápido',
        text: 'Código enxuto e imagens otimizadas. Página leve converte mais e ainda ajuda no Google.',
      },
      {
        title: 'Pronta pra medir',
        text: 'Botões, formulário e WhatsApp configurados pra você acompanhar de onde vêm os contatos.',
      },
    ],
    faq: [
      {
        question: 'Qual a diferença entre landing page e site institucional?',
        answer:
          'A landing page tem um único objetivo, como captar contatos ou vender uma oferta. O site institucional apresenta a empresa inteira, com várias páginas. Se você precisa de resultado rápido para uma campanha, a landing page costuma ser o melhor começo.',
      },
      {
        question: 'Em quanto tempo uma landing page fica pronta?',
        answer:
          'Depende do conteúdo e da complexidade, mas é o projeto mais ágil que fazemos. Alinhamos o prazo na primeira conversa, depois de entender o objetivo e o material que já existe.',
      },
      {
        question: 'A página vem com formulário e integração com WhatsApp?',
        answer:
          'Sim. Configuramos o formulário de contato e o botão de WhatsApp para que cada visita tenha um caminho claro até você.',
      },
      {
        question: 'Vocês escrevem os textos?',
        answer:
          'Ajudamos a estruturar a mensagem e a refinar os textos para a venda. Se você já tem o conteúdo, trabalhamos em cima dele.',
      },
    ],
    whatsappText: 'Olá, vim pelo site da glim. Quero criar uma landing page.',
  },
  {
    slug: 'sites-institucionais',
    name: 'Sites Institucionais',
    metaTitle: 'Criação de Sites Institucionais Profissionais',
    metaDescription:
      'Criamos sites institucionais que apresentam sua empresa com autoridade: design sob medida, SEO desde a base e código rápido. Atendemos empresas de todo o Brasil.',
    eyebrow: 'Posicionamento e apresentação',
    h1: 'Um site que mostra o tamanho real da sua empresa.',
    intro:
      'Antes da primeira conversa, o cliente já olhou o seu site. Construímos sites institucionais que explicam o que você faz, passam confiança e levam o visitante até o contato, com um acabamento que acompanha o nível do seu trabalho.',
    audience: [
      'Empresas em crescimento com site desatualizado',
      'Negócios que precisam se reposicionar',
      'Quem ainda não tem site e quer começar certo',
      'Profissionais e estúdios que vendem por confiança',
    ],
    deliverables: [
      {
        title: 'Arquitetura da informação',
        text: 'Páginas e menus organizados pra que o visitante encontre o que procura sem esforço.',
      },
      {
        title: 'Direção visual própria',
        text: 'Identidade aplicada com consistência, do primeiro destaque ao rodapé.',
      },
      {
        title: 'SEO estrutural',
        text: 'Títulos, descrições, sitemap, dados estruturados e velocidade ajustados desde a base, pra sua empresa ser encontrada.',
      },
      {
        title: 'Base técnica sólida',
        text: 'Next.js, TypeScript e hospedagem de alta performance, prontos pra receber novas páginas depois.',
      },
    ],
    faq: [
      {
        question: 'O site já sai otimizado pra aparecer no Google?',
        answer:
          'Sim. Entregamos com a base de SEO resolvida: metadados, sitemap, estrutura de títulos, dados estruturados e carregamento rápido. Aparecer bem nas buscas depende também de conteúdo e tempo, e orientamos você nisso.',
      },
      {
        question: 'Consigo editar os textos depois?',
        answer:
          'Combinamos isso no início. Atualizações pontuais podem ser feitas por nós, e quando o projeto pede edição frequente, definimos a melhor forma de você gerenciar o conteúdo.',
      },
      {
        question: 'Vocês fazem site em mais de um idioma?',
        answer:
          'Sim. Já entregamos sites com português e inglês, e o idioma extra entra no escopo desde o início.',
      },
      {
        question: 'Existe uma opção mais enxuta e de entrada?',
        answer:
          'Sim. O glim. On é um site institucional de uma página, com escopo fechado, no ar em até 7 dias, por R$ 939 à vista no Pix ou 12x de R$ 97 no cartão, com juros. Se você precisa de mais páginas ou de recursos próprios, o site institucional completo é o caminho.',
      },
      {
        question: 'E se eu já tenho um site?',
        answer:
          'Avaliamos o que existe. Dependendo do caso, vale reconstruir do zero ou reaproveitar o conteúdo. Dizemos com franqueza qual é o melhor caminho.',
      },
    ],
    whatsappText: 'Olá, vim pelo site da glim. Quero criar um site institucional.',
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    metaTitle: 'Criação de E-commerce e Lojas Virtuais',
    metaDescription:
      'Criamos lojas virtuais claras, rápidas e com compra sem atrito: navegação simples, páginas de produto objetivas e fluxo de checkout bem resolvido. Projeto sob medida.',
    eyebrow: 'Operação e venda',
    h1: 'Lojas virtuais em que comprar é o caminho mais fácil.',
    intro:
      'Loja que confunde, perde venda. Desenhamos e construímos e-commerces com navegação direta, páginas de produto que explicam e um fluxo de compra sem etapas desnecessárias, pra o cliente chegar ao pagamento sem tropeçar.',
    audience: [
      'Marcas que querem vender mais pela internet',
      'Operações que precisam ganhar eficiência',
      'Produtos de alto valor percebido',
      'Lojas físicas que vão começar a vender online',
    ],
    deliverables: [
      {
        title: 'Navegação e busca',
        text: 'Categorias e filtros pensados pro jeito que o seu cliente realmente procura.',
      },
      {
        title: 'Páginas de produto',
        text: 'Fotos, descrição e informações na ordem certa pra tirar dúvida e levar à compra.',
      },
      {
        title: 'Checkout sem fricção',
        text: 'Menos campos, menos cliques e um caminho curto entre o carrinho e o pagamento.',
      },
      {
        title: 'Performance e confiança',
        text: 'Loja rápida no celular, com sinais claros de segurança e de política de entrega.',
      },
    ],
    faq: [
      {
        question: 'Qual plataforma vocês usam para a loja?',
        answer:
          'Escolhemos conforme a sua operação: volume de produtos, formas de pagamento, integrações e o que precisa ser personalizado. Explicamos a recomendação e o motivo antes de começar.',
      },
      {
        question: 'A loja integra com meios de pagamento e frete?',
        answer:
          'Sim. Conectamos os meios de pagamento e as opções de frete que fazem sentido para o seu negócio.',
      },
      {
        question: 'A loja funciona bem no celular?',
        answer:
          'É a prioridade. A maior parte das compras começa no celular, então o layout e o checkout são desenhados primeiro pra telas pequenas.',
      },
      {
        question: 'Vocês ajudam a cadastrar os produtos?',
        answer:
          'Estruturamos o catálogo e orientamos o cadastro. O volume de produtos entra no combinado do escopo.',
      },
    ],
    whatsappText: 'Olá, vim pelo site da glim. Quero criar uma loja virtual.',
  },
  {
    slug: 'sistemas-sob-medida',
    name: 'Plataformas Sob Medida',
    metaTitle: 'Desenvolvimento de Sistemas e Software Sob Medida',
    metaDescription:
      'Desenvolvemos sistemas, plataformas e automações sob medida para o seu processo. Quando a ferramenta pronta não resolve, construímos a solução certa. Atendemos todo o Brasil.',
    eyebrow: 'Software sob medida',
    h1: 'Quando a solução pronta não resolve, a gente constrói a certa.',
    intro:
      'Planilha que ninguém aguenta mais, processo que depende de uma pessoa, regra de negócio que nenhum sistema de prateleira atende. Desenvolvemos plataformas, sistemas internos e automações desenhados pra forma como o seu negócio funciona de verdade.',
    audience: [
      'Processos que hoje vivem em planilhas',
      'Empresas com regras de negócio específicas',
      'Produtos digitais próprios, do MVP em diante',
      'Operações que querem automatizar tarefas repetitivas',
    ],
    deliverables: [
      {
        title: 'Entendimento do processo',
        text: 'Mapeamos como o trabalho acontece hoje e onde estão os gargalos, antes de propor qualquer tela.',
      },
      {
        title: 'Sistema desenhado pro seu uso',
        text: 'Interface simples pra equipe usar no dia a dia, com as regras do seu negócio embutidas.',
      },
      {
        title: 'Dados e acessos seguros',
        text: 'Banco de dados, autenticação e permissões por perfil, com Supabase e boas práticas de segurança.',
      },
      {
        title: 'Evolução por etapas',
        text: 'Começamos pelo que dá mais retorno e crescemos a plataforma conforme a operação pede.',
      },
    ],
    faq: [
      {
        question: 'Quando vale a pena um sistema sob medida e não uma ferramenta pronta?',
        answer:
          'Quando o seu processo é específico demais pra caber numa ferramenta de prateleira, ou quando você paga por vários sistemas que não conversam entre si. Se uma solução pronta resolver, dizemos isso sem rodeios.',
      },
      {
        question: 'Posso começar com algo menor e crescer depois?',
        answer:
          'É o caminho que recomendamos. Entregamos uma primeira versão focada no que mais pesa e evoluímos em etapas, validando cada passo com o uso real.',
      },
      {
        question: 'O sistema é meu depois de pronto?',
        answer:
          'Os detalhes de propriedade e de continuidade ficam acordados em proposta antes do início, de forma clara pra os dois lados.',
      },
      {
        question: 'Vocês fazem automações e integrações?',
        answer:
          'Sim. Conectamos sistemas, automatizamos tarefas repetitivas e integramos com as ferramentas que você já usa.',
      },
    ],
    whatsappText: 'Olá, vim pelo site da glim. Quero conversar sobre um sistema sob medida.',
  },
  {
    slug: 'glim-on',
    name: 'glim. On',
    metaTitle: 'glim. On: Site Profissional em até 7 Dias',
    metaDescription:
      'Site institucional profissional de uma página, no ar em até 7 dias a partir da reunião inicial. R$ 939 à vista no Pix ou 12x de R$ 97 no cartão, com juros. Feito pela glim., sem você precisar entender de tecnologia.',
    eyebrow: 'Produto de entrada',
    h1: 'Seu negócio no Google em até 7 dias, sem complicação.',
    intro:
      'O glim. On é um site institucional de uma página, com escopo fechado, pra quem precisa estar na internet com cara de empresa séria sem esperar semanas e sem entender de tecnologia. Você dedica cerca de meia hora, e o resto fica com a glim.',
    audience: [
      'Quem hoje só tem Instagram ou WhatsApp',
      'Autônomos e prestadores de serviço',
      'Pequenos negócios locais',
      'Quem precisa de um site rápido e acessível',
    ],
    deliverables: [
      {
        title: 'Site institucional de uma página',
        text: 'Pensado pro seu segmento, com a apresentação do negócio e dos serviços na ordem certa.',
      },
      {
        title: 'No ar, com segurança',
        text: 'Publicado no seu endereço, com certificado de segurança, o cadeado que mostra que o site é confiável.',
      },
      {
        title: 'Contato direto',
        text: 'Formulário de contato e botão de WhatsApp integrados, pra cada visita ter um caminho até você.',
      },
      {
        title: 'Pronto pra buscas locais',
        text: 'Otimização básica pra o seu negócio aparecer quando alguém pesquisar no Google.',
      },
      {
        title: 'Funciona em qualquer tela',
        text: 'Visual ajustado pra celular, tablet e computador.',
      },
      {
        title: 'Ajuste ao vivo na entrega',
        text: 'Mostramos o site pronto, fazemos 1 rodada de ajuste na hora e você aprova.',
      },
    ],
    process: [
      {
        title: 'Garanta sua vaga',
        text: 'Você agenda uma conversa rápida com a gente, de uns 20 minutos.',
      },
      {
        title: 'Construímos o site',
        text: 'Com as suas informações, fotos e contatos. Você não precisa escrever nada técnico.',
      },
      {
        title: 'Entrega e ajuste',
        text: 'Mostramos o site pronto, fazemos 1 ajuste ao vivo e você aprova.',
      },
      {
        title: 'No ar',
        text: 'O site vai ao ar no seu endereço, funcionando.',
      },
    ],
    price: {
      value: 'R$ 939',
      condition: 'à vista no Pix, ou 12x de R$ 97 no cartão, com juros',
      note: 'Prazo de até 7 dias contado a partir da reunião de alinhamento inicial.',
    },
    priceValue: 939,
    notIncluded:
      'O glim. On é um site de uma página com escopo fechado, e é isso que garante o prazo e o preço. Não fazem parte do pacote: loja virtual, blog, sistema de agendamento, criação de logotipo ou identidade visual e gestão de anúncios. Se você precisar de algo assim, conversamos sobre um projeto sob medida.',
    faq: [
      {
        question: 'Quando começa a contar o prazo de 7 dias?',
        answer:
          'A partir da reunião de alinhamento inicial. Logo depois da compra você escolhe o horário dessa primeira conversa, e a partir dela o site fica pronto em até 7 dias.',
      },
      {
        question: 'Já tenho Instagram. Preciso de site?',
        answer:
          'O Instagram é a vitrine pra quem já te segue. O site é o seu endereço oficial: aparece no Google, organiza seus serviços e passa a confiança que muita gente procura antes de contratar.',
      },
      {
        question: 'Não entendo nada de domínio e hospedagem.',
        answer: 'Não precisa. A glim. cuida de toda a parte técnica, da publicação ao certificado de segurança.',
      },
      {
        question: 'Quanto tempo vou precisar dedicar?',
        answer:
          'São duas conversas curtas, somando cerca de meia hora. Você não escreve, não configura e não acompanha nada técnico.',
      },
      {
        question: 'E se eu quiser mais de uma página ou mais recursos?',
        answer:
          'Aí o caminho é o site institucional completo ou um projeto sob medida. O glim. On foi desenhado pra ser a porta de entrada, simples e com prazo fechado.',
      },
      {
        question: 'E se eu não gostar do resultado?',
        answer:
          'Você tem 7 dias de garantia por lei (artigo 49 do Código de Defesa do Consumidor) pra pedir o reembolso total. E o site só é considerado entregue depois que você aprova.',
      },
    ],
    externalUrl: 'https://on.glimweb.com',
    whatsappText: 'Olá, vim pelo site da glim. Quero saber mais sobre o glim. On.',
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((service) => service.slug === slug);
}
