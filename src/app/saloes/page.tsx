import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { FitText } from '@/components/ui/FitText';
import { Glass } from '@/components/ui/Glass';
import { NoBreak } from '@/components/ui/NoBreak';
import { Reveal } from '@/components/ui/Reveal';
import { CONTACT_WHATSAPP_NUMBER } from '@/lib/content';
import {
  CONDICOES,
  ENTRA,
  EXEMPLO_APP,
  FAQ,
  PASSOS,
  PLANOS,
  PRODUTO,
  SALOES_PRO_WHATSAPP_TEXT,
  SALOES_WHATSAPP_TEXT,
  SEM_AGENDA,
  brl,
} from '@/lib/saloes';
import { SITE_URL } from '@/lib/seo';

const PAGE_URL = `${SITE_URL}/saloes`;
const TITLE = 'Agenda online e site para salões e barbearias';
const DESCRIPTION =
  'O cliente escolhe o serviço, o profissional e o horário e reserva na hora. Agenda online e site próprio, a partir de R$ 59 por mês, sem taxa por agendamento.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: PAGE_URL,
    siteName: 'glim.',
    title: `${TITLE} | glim.`,
    description: DESCRIPTION,
    images: [
      { url: '/opengraph-image', width: 1200, height: 630, alt: 'glim. · Precisão que se vê.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image'],
    title: `${TITLE} | glim.`,
    description: DESCRIPTION,
  },
};

const EYEBROW = 'meta text-pedra-500';
const H2 =
  'mt-4 max-w-[18em] text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em]';
const SECTION = 'px-[var(--m)] py-[clamp(64px,8vw,120px)]';
const SERIF = 'font-serif font-normal tracking-[-0.01em]';

// Prévia ao vivo de um salão de exemplo (projeto glim-previa, sempre com noindex).
const PREVIA_SITE = 'https://previa.glimweb.com/barbearia-modelo';
const PREVIA_AGENDA = `${PREVIA_SITE}/agendar`;

const whatsappHref = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(SALOES_WHATSAPP_TEXT)}`;
const whatsappProHref = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(SALOES_PRO_WHATSAPP_TEXT)}`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      serviceType: 'Agenda online e site para salões e barbearias',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'Brasil' },
      offers: {
        '@type': 'Offer',
        price: String(PLANOS[0].mensal),
        priceCurrency: 'BRL',
        url: PAGE_URL,
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'glim.', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Salões e barbearias', item: PAGE_URL },
      ],
    },
  ],
};

export default function SaloesPage() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="relative">
        <Header tone="grafite" />

        <main id="conteudo">
          {/* abertura */}
          <section className="px-[var(--m)] pt-[130px] pb-[clamp(64px,8vw,120px)] md:pt-[180px]">
            <nav aria-label="Trilha de navegação" className={EYEBROW}>
              <Link
                href="/"
                className="relative transition-opacity after:absolute after:-inset-x-1 after:-inset-y-3 hover:opacity-70"
              >
                glim.
              </Link>
              <span className="mx-2">/</span>
              <span className="text-grafite-950">Salões e barbearias</span>
            </nav>

            <p className="meta text-ambar-700 mt-8">Para salões e barbearias</p>
            <h1 className="my-5 md:mb-9">
              <FitText
                lines={['Agenda online']}
                className="mega text-[15vw] md:text-[clamp(44px,8.4vw,128px)]"
              />
            </h1>

            <div className="grid items-end gap-[clamp(32px,5vw,80px)] md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="max-w-[22em] text-[clamp(24px,2.6vw,38px)] leading-[1.08] font-medium tracking-[-0.035em]">
                  <NoBreak>O cliente marca sozinho, com a cara do seu salão.</NoBreak>
                </p>
                <p className="text-pedra-500 mt-6 max-w-[34em] text-[clamp(18px,1.5vw,21px)] leading-[1.5]">
                  <NoBreak>
                    Ele escolhe o serviço, vê o valor, escolhe como vai pagar e reserva na hora, sem
                    esperar resposta. Junto, um site próprio, com as suas fotos e as suas cores.
                  </NoBreak>
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-5">
                  <ButtonLink href={whatsappHref} external>
                    Marcar uma conversa
                  </ButtonLink>
                  <TextLink href="#previa">Ver como fica</TextLink>
                </div>
              </div>

              <div className="faceta relative isolate flex min-h-[320px] items-end overflow-hidden p-6">
                <Image
                  src="/fotos/luz-dourada.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 820px) 92vw, 40vw"
                  className="-z-10 object-cover"
                />
                <Glass tone="escuro" className="w-full p-7">
                  <p className="meta text-pedra-200">Investimento</p>
                  <p className="mt-3 text-[clamp(40px,4vw,56px)] leading-[0.9] font-semibold tracking-[-0.05em]">
                    {brl(PLANOS[0].mensal)}/mês
                  </p>
                  <p className="mt-2 opacity-85">
                    + implantação de {brl(PLANOS[0].implantacao)}, paga uma vez
                  </p>
                  <p className="text-pedra-200 mt-4 text-sm">
                    Sem fidelidade e sem taxa por agendamento.
                  </p>
                </Glass>
              </div>
            </div>
          </section>

          {/* prévia */}
          <section id="previa" aria-labelledby="previa-titulo" className="bg-linho-100">
            <div
              className={`${SECTION} grid items-center gap-[clamp(40px,6vw,96px)] md:grid-cols-[1.25fr_1fr]`}
            >
              <div className="relative pr-6 pb-10 md:pr-20">
                <div className="faceta overflow-hidden shadow-[0_40px_90px_-40px_rgba(28,26,24,0.55)] [--f:28px]">
                  <Image
                    src="/saloes/barbearia-desktop.png"
                    alt="Site de uma barbearia de exemplo, com a agenda online"
                    width={1440}
                    height={900}
                    sizes="(max-width: 820px) 92vw, 56vw"
                    className="block h-auto w-full"
                  />
                </div>
                <div className="bg-grafite-950 absolute right-0 -bottom-2 w-[130px] rounded-[28px] p-[6px] shadow-[0_30px_60px_-20px_rgba(28,26,24,0.7)] md:w-[190px] md:rounded-[34px] md:p-[7px]">
                  <Image
                    src="/saloes/barbearia-mobile.png"
                    alt="Tela de agendamento no celular"
                    width={780}
                    height={1560}
                    sizes="190px"
                    className="block h-auto w-full rounded-[22px] md:rounded-[28px]"
                  />
                </div>
              </div>

              <Reveal>
                <p className={EYEBROW}>Como fica</p>
                <h2 id="previa-titulo" className={H2}>
                  Veja o site e a agenda de um salão de exemplo.
                </h2>
                <p className="text-pedra-500 mt-6 max-w-[34em] text-[clamp(17px,1.4vw,20px)] leading-[1.55]">
                  <NoBreak>
                    A imagem mostra uma barbearia fictícia, só para demonstração. No primeiro
                    contato, a gente monta uma prévia assim com o nome, as cores e as fotos do seu
                    salão, para você abrir no próprio celular e testar a agenda antes de decidir
                    qualquer coisa.
                  </NoBreak>
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-5">
                  <ButtonLink href={PREVIA_SITE} external>
                    Abrir a prévia ao vivo
                  </ButtonLink>
                  <TextLink href={PREVIA_AGENDA} external>
                    Testar só a agenda
                  </TextLink>
                </div>
              </Reveal>
            </div>
          </section>

          {/* duas situações */}
          <section
            aria-labelledby="situacoes"
            className="bg-grafite-950 text-linho-050 px-[var(--m)] py-[clamp(80px,9vw,140px)]"
          >
            <Reveal>
              <h2
                id="situacoes"
                className="max-w-[16em] text-[clamp(30px,4.4vw,64px)] leading-[1.02] font-medium tracking-[-0.045em]"
              >
                Cada salão chega aqui de um lugar{' '}
                <em className={`${SERIF} text-[1.1em] leading-[0.9]`}>diferente.</em>
              </h2>
            </Reveal>

            <div className="border-grafite-800 mt-[clamp(40px,5vw,80px)] grid border-t md:grid-cols-2">
              <Reveal className="border-grafite-800 py-10 md:border-r md:py-12 md:pr-[clamp(24px,4vw,64px)]">
                <h3 className="text-[clamp(22px,2vw,30px)] leading-[1.1] font-medium tracking-[-0.03em]">
                  Já usa um app de agenda?
                </h3>
                <p className="text-pedra-300 mt-4 max-w-[34em] text-[clamp(17px,1.4vw,19px)] leading-[1.55]">
                  <NoBreak>
                    No app, o cliente vê a marca dele, os concorrentes ao lado e um perfil igual ao
                    de todos. Na glim., a agenda abre com o seu nome e as suas cores, sem vitrine de
                    concorrente.
                  </NoBreak>
                </p>
                <p className="meta text-pedra-300 mt-10">
                  Exemplo: {EXEMPLO_APP.profissionais} profissionais no {EXEMPLO_APP.app}
                </p>
                <p className="mt-3 text-[clamp(64px,8vw,112px)] leading-[0.9] font-semibold tracking-[-0.05em]">
                  −{EXEMPLO_APP.economia}%
                </p>
                <table className="mt-8 w-full max-w-[34em] text-left text-[15px] md:text-base">
                  <thead>
                    <tr className="meta text-pedra-300">
                      <th className="pb-3 font-medium" scope="col">
                        <span className="sr-only">Valor</span>
                      </th>
                      <th className="pb-3 font-medium" scope="col">
                        1º ano
                      </th>
                      <th className="pb-3 font-medium" scope="col">
                        Do 2º ano
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-grafite-800 border-t">
                      <th scope="row" className="text-pedra-300 py-4 font-normal">
                        {EXEMPLO_APP.app}
                      </th>
                      <td>{brl(EXEMPLO_APP.appAno)}</td>
                      <td>{brl(EXEMPLO_APP.appAno)}</td>
                    </tr>
                    <tr className="border-grafite-800 border-t">
                      <th scope="row" className="text-pedra-300 py-4 font-normal">
                        glim.
                      </th>
                      <td>{brl(EXEMPLO_APP.glimAno1)}</td>
                      <td className="text-ambar-400">{brl(EXEMPLO_APP.glimAno2)}</td>
                    </tr>
                    <tr className="border-grafite-800 border-t">
                      <th scope="row" className="text-pedra-300 py-4 font-normal">
                        Site próprio
                      </th>
                      <td colSpan={2}>Incluído, sem custo à parte</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-pedra-300 mt-4 max-w-[34em] text-sm">
                  Valores por ano. Exemplo com o Plano Essencial da glim. e a tabela de preços do{' '}
                  {EXEMPLO_APP.app} para 3 agendas. Na reunião, fazemos a conta com o valor que você
                  paga hoje.
                </p>
              </Reveal>

              <Reveal
                delay={0.1}
                className="border-grafite-800 border-t py-10 md:border-t-0 md:py-12 md:pl-[clamp(24px,4vw,64px)]"
              >
                <h3 className="text-[clamp(22px,2vw,30px)] leading-[1.1] font-medium tracking-[-0.03em]">
                  Ainda marca pelo WhatsApp ou pelo direct?
                </h3>
                <p className="text-pedra-300 mt-4 max-w-[34em] text-[clamp(17px,1.4vw,19px)] leading-[1.55]">
                  <NoBreak>
                    Todo cliente que não consegue marcar na hora marca em outro lugar. A agenda
                    online resolve isso sem trocar o seu jeito de atender.
                  </NoBreak>
                </p>
                <ul className="mt-10">
                  {SEM_AGENDA.map((item) => (
                    <li key={item.title} className="border-grafite-800 border-t py-6">
                      <p className="text-xl font-medium tracking-[-0.02em]">{item.title}</p>
                      <p className="text-pedra-300 mt-2 max-w-[32em]">
                        <NoBreak>{item.text}</NoBreak>
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          {/* como funciona */}
          <section aria-labelledby="como-funciona" className={SECTION}>
            <Reveal>
              <p className={EYEBROW}>Como funciona</p>
              <h2 id="como-funciona" className={H2}>
                O cliente marca sozinho.{' '}
                <em className={`${SERIF} text-[1.1em] leading-[0.9]`}>Você só confirma.</em>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-[clamp(32px,5vw,80px)] md:grid-cols-[1fr_1.1fr]">
              <ol className="border-pedra-200 border-t">
                {PASSOS.map((passo, index) => (
                  <li
                    key={passo.title}
                    className="border-pedra-200 grid grid-cols-[40px_1fr] gap-x-5 border-b py-[26px]"
                  >
                    <span className="meta text-pedra-500 pt-1.5">0{index + 1}</span>
                    <div>
                      <h3 className="text-[clamp(22px,2vw,30px)] leading-[1.1] font-medium tracking-[-0.03em]">
                        {passo.title}
                      </h3>
                      <p className="text-pedra-500 mt-2 max-w-[34em]">
                        <NoBreak>{passo.text}</NoBreak>
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* painel do salão (ilustração do produto) */}
              <div className="faceta bg-grafite-950 text-linho-050 self-start p-6 [--f:28px] md:p-8">
                <div className="border-grafite-800 flex items-center justify-between border-b pb-4">
                  <span className="text-[15px] font-medium">Painel · Barbearia Modelo</span>
                  <span className="meta text-pedra-300">Agenda de hoje</span>
                </div>
                <ul>
                  {[
                    ['09:00', 'Corte', 'Barbeiro 1'],
                    ['10:30', 'Barba', 'Barbeiro 2'],
                    ['13:30', 'Corte + barba', 'Barbeiro 1'],
                    ['15:00', 'Corte', 'Barbeiro 3'],
                    ['17:30', 'Pigmentação', 'Barbeiro 2'],
                  ].map(([hora, servico, pro]) => (
                    <li
                      key={hora}
                      className="border-grafite-800 grid grid-cols-[64px_1fr_auto] items-center border-b py-3.5 text-[14px]"
                    >
                      <span className="text-pedra-300">{hora}</span>
                      <span>{servico}</span>
                      <span className="text-pedra-300">{pro}</span>
                    </li>
                  ))}
                </ul>
                <p className="meta text-pedra-300 mt-5">Ilustração · dados de exemplo</p>
              </div>
            </div>
          </section>

          {/* o que entra */}
          <section aria-labelledby="o-que-entra" className="bg-linho-100">
            <div className={`${SECTION} grid gap-[clamp(32px,5vw,80px)] md:grid-cols-[1fr_1fr]`}>
              <Reveal>
                <p className={EYEBROW}>O que entra</p>
                <h2 id="o-que-entra" className={H2}>
                  E o site vem <em className={`${SERIF} text-[1.1em] leading-[0.9]`}>de bônus.</em>
                </h2>
                <p className="text-pedra-500 mt-6 max-w-[34em] text-[clamp(17px,1.4vw,20px)] leading-[1.55]">
                  <NoBreak>
                    A agenda roda dentro de um site próprio do salão: serviços, equipe, fotos e
                    endereço, no domínio dele. É o link que vai na bio do Instagram e aparece no
                    Google.
                  </NoBreak>
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="border-pedra-200 border-t">
                  {ENTRA.map((item) => (
                    <li
                      key={item}
                      className="border-pedra-200 flex items-center gap-4 border-b py-5 text-lg"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-grafite-950 h-[7px] w-[7px] rotate-45"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          {/* planos */}
          <section id="planos" aria-labelledby="planos-titulo" className={SECTION}>
            <Reveal>
              <p className={EYEBROW}>Investimento</p>
              <h2 id="planos-titulo" className={H2}>
                Um valor fixo, sem taxa por agendamento.
              </h2>
            </Reveal>

            <p className="text-pedra-500 mt-6 max-w-[34em] text-[clamp(17px,1.4vw,20px)] leading-[1.55]">
              <NoBreak>
                {`Três planos do ${PRODUTO}. Cada um traz tudo do anterior: dá para começar num e subir depois, sem refazer nada.`}
              </NoBreak>
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
              {PLANOS.map((plano, i) => {
                const plus = plano.id === 'plus';
                const pro = plano.id === 'pro';
                const sub = pro ? 'text-pedra-300' : 'text-pedra-500';
                return (
                  <div
                    key={plano.id}
                    className={`flex flex-col p-8 md:p-9 ${
                      pro
                        ? 'bg-grafite-950 text-linho-050'
                        : plus
                          ? 'bg-linho-100 ring-grafite-950 shadow-[0_30px_70px_-40px_rgba(28,26,24,0.45)] ring-2 ring-inset lg:-my-5 lg:py-14'
                          : 'border-pedra-200 border'
                    }`}
                  >
                    <div className="flex min-h-[24px] flex-wrap items-center gap-2">
                      {plus && (
                        <span className="meta bg-grafite-950 text-ambar-400 px-2 py-1">
                          Recomendado
                        </span>
                      )}
                      {pro && (
                        <span className="meta border-linho-050/25 text-pedra-200 border px-2 py-1">
                          Lista de espera
                        </span>
                      )}
                    </div>
                    <p className="mt-5 text-2xl font-medium tracking-[-0.03em]">{plano.nome}</p>
                    <p className={`${sub} mt-1`}>
                      {plano.para}
                      {plano.extra ? ` · +${brl(plano.extra)}/mês por profissional a mais` : ''}
                    </p>
                    <p className="mt-8 flex items-baseline gap-2">
                      <span className="text-[clamp(56px,5vw,76px)] leading-none font-semibold tracking-[-0.05em]">
                        {brl(plano.mensal)}
                      </span>
                      <span className={sub}>/mês</span>
                    </p>
                    <p className={`${sub} mt-3 text-[15px]`}>
                      +{' '}
                      <span
                        className={`font-medium ${pro ? 'text-linho-050' : 'text-grafite-950'}`}
                      >
                        {brl(plano.implantacao)}
                      </span>{' '}
                      de implantação, paga uma vez
                    </p>
                    <div
                      className={`mt-8 border-t pt-5 ${pro ? 'border-linho-050/15' : 'border-pedra-200'}`}
                    >
                      <p className={`meta ${pro ? 'text-pedra-300' : 'text-pedra-500'}`}>
                        {i === 0 ? 'Inclui' : 'Tudo do plano anterior, mais:'}
                      </p>
                      <ul className="mt-4 grid gap-3 text-[15px]">
                        {plano.itens.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              aria-hidden="true"
                              className={`mt-[7px] h-[6px] w-[6px] shrink-0 rotate-45 ${pro ? 'bg-ambar-400' : 'bg-grafite-950'}`}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="min-h-10 flex-1" />
                    {pro ? (
                      <>
                        <ButtonLink
                          href={whatsappProHref}
                          external
                          tone="linho"
                          className="justify-between"
                        >
                          Entrar na lista <span aria-hidden="true">→</span>
                        </ButtonLink>
                        <p className="text-pedra-300 mt-3 text-[13px]">
                          Ainda sem data de entrega. Avisamos quando abrir vaga.
                        </p>
                      </>
                    ) : plus ? (
                      <ButtonLink href={whatsappHref} external className="justify-between">
                        Quero o Plus <span aria-hidden="true">→</span>
                      </ButtonLink>
                    ) : (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="border-pedra-200 hover:bg-grafite-950 hover:text-linho-050 inline-flex items-center justify-between gap-3 border px-5 py-[15px] text-[15px] leading-none font-medium transition-colors md:px-[26px] md:py-[18px] md:text-base"
                      >
                        Quero o {plano.nome} <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-pedra-500 mt-10 text-[15px]">
              Implantação em 3x no cartão, ou Pix com 50% no início e 50% na entrega.
            </p>

            <ul className="border-pedra-200 mt-8 grid border-t md:grid-cols-3">
              {CONDICOES.map((item) => (
                <li
                  key={item.title}
                  className="border-pedra-200 border-b py-6 md:border-r md:pr-6 md:pl-6 md:first:pl-0 md:last:border-r-0"
                >
                  <p className="text-base font-medium">{item.title}</p>
                  <p className="text-pedra-500 mt-2 text-[15px] leading-relaxed">
                    <NoBreak>{item.text}</NoBreak>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <div className="px-[var(--m)]">
            <Reveal>
              <section
                aria-labelledby="faq"
                className="mx-auto max-w-[56rem] pb-[clamp(64px,8vw,120px)]"
              >
                <p className={EYEBROW}>Perguntas frequentes</p>
                <h2 id="faq" className={H2}>
                  O que costumam perguntar.
                </h2>
                <div className="border-pedra-200 mt-10 border-t">
                  {FAQ.map((item) => (
                    <details key={item.question} className="group border-pedra-200 border-b">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-[-0.02em] marker:hidden sm:text-xl [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <span
                          aria-hidden="true"
                          className="text-ambar-700 text-2xl leading-none transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="text-pedra-500 mt-4 max-w-[40em] text-base leading-[1.7]">
                        <NoBreak>{item.answer}</NoBreak>
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>

          {/* próximo passo */}
          <section
            aria-labelledby="proximo-passo"
            className="bg-grafite-950 text-linho-050 px-[var(--m)] py-[clamp(80px,9vw,140px)]"
          >
            <Reveal>
              <h2
                id="proximo-passo"
                className="max-w-[14em] text-[clamp(30px,4.4vw,64px)] leading-[1.02] font-medium tracking-[-0.045em]"
              >
                Vinte minutos e a sua agenda{' '}
                <em className={`${SERIF} text-[1.1em] leading-[0.9]`}>sai do papel.</em>
              </h2>
              <p className="text-pedra-300 mt-6 max-w-[32em] text-[clamp(18px,1.5vw,21px)] leading-[1.5]">
                Chame no WhatsApp. Eu mostro a prévia com a identidade do seu salão e a gente ajusta
                serviços, equipe e horários.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-5">
                <ButtonLink href={whatsappHref} external tone="linho">
                  Marcar uma conversa
                </ButtonLink>
                <TextLink href="/trabalhos">Ver outros trabalhos</TextLink>
              </div>
            </Reveal>
          </section>
        </main>
      </div>

      <Footer />
    </MotionProvider>
  );
}
