import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import glimMarkCream from '../../../../public/brand/glim-mark-cream.png';
import { Footer } from '@/components/layout/Footer';
import { CONTACT_WHATSAPP_NUMBER } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';
import { getServicePage, SERVICE_PAGES, SERVICE_PROCESS } from '@/lib/services';

type ServicePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};

  const url = `/servicos/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url,
      siteName: 'glim.',
      title: `${service.metaTitle} | glim.`,
      description: service.metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.metaTitle} | glim.`,
      description: service.metaDescription,
    },
  };
}

const eyebrowClass = 'font-mono text-[10px] tracking-[0.28em] text-[#9c948a] uppercase sm:text-xs';
const h2Class =
  'font-google mt-4 max-w-2xl text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.08] tracking-[-0.05em] text-[#f5f0ea]';

export default async function ServicePageRoute({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/servicos/${service.slug}`;
  const whatsappHref = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(service.whatsappText)}`;
  const otherServices = SERVICE_PAGES.filter((item) => item.slug !== service.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: service.name,
        description: service.metaDescription,
        url: pageUrl,
        serviceType: service.name,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Brasil' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'glim.', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${SITE_URL}/#servicos` },
          { '@type': 'ListItem', position: 3, name: service.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <div id="topo" className="relative min-h-screen overflow-x-clip bg-[#14100E] text-[#f5f0ea]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,183,123,0.14),transparent_70%)] blur-3xl"
      />
      <div aria-hidden="true" className="grain-overlay pointer-events-none absolute inset-0 opacity-20" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" aria-label="glim., página inicial" data-cursor-hover className="inline-flex items-center">
          <Image src={glimMarkCream} alt="glim." className="h-6 w-auto sm:h-7" priority />
        </Link>
        <Link
          href="/#servicos"
          data-cursor-hover
          className="text-sm font-medium text-[#cfc8c1] transition-colors hover:text-white"
        >
          Todos os serviços
        </Link>
      </header>

      <main id="conteudo" className="relative z-10">
        <section className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28">
          <nav aria-label="Trilha de navegação" className={eyebrowClass}>
            <Link href="/" className="transition-colors hover:text-white">
              glim.
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#servicos" className="transition-colors hover:text-white">
              Serviços
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#cfc8c1]">{service.name}</span>
          </nav>

          <p className="border-glim-diamond/30 text-glim-diamond mt-8 inline-block rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.22em] uppercase">
            {service.eyebrow}
          </p>
          <h1 className="font-google mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.055em] text-balance">
            {service.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#d9d3cc] sm:text-lg">{service.intro}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="bg-glim-diamond text-glim-dark inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold shadow-[0_18px_44px_-22px_rgba(242,183,123,0.85)] transition-transform hover:-translate-y-0.5 sm:text-base"
            >
              Falar no WhatsApp
            </a>
            <Link
              href="/#contato"
              data-cursor-hover
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-[#ebe6e1] transition-colors hover:bg-white/[0.06] sm:text-base"
            >
              Enviar briefing
            </Link>
          </div>
        </section>

        <section aria-labelledby="para-quem" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <p className={eyebrowClass}>Para quem é</p>
          <h2 id="para-quem" className={h2Class}>
            Esse serviço é pra quem se encaixa aqui.
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {service.audience.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-[#ebe6e1]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="entregas" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <p className={eyebrowClass}>O que você recebe</p>
          <h2 id="entregas" className={h2Class}>
            O que entra no projeto.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8"
              >
                <span className="text-glim-diamond font-mono text-xs tracking-[0.2em]">0{index + 1}</span>
                <h3 className="font-google mt-4 text-2xl tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#bdb6b0]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="processo" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <p className={eyebrowClass}>Como trabalhamos</p>
          <h2 id="processo" className={h2Class}>
            Do primeiro contato à entrega, sem surpresa.
          </h2>
          <ol className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_PROCESS.map((step, index) => (
              <li key={step.title}>
                <span className="text-glim-diamond font-mono text-xs tracking-[0.2em]">0{index + 1}</span>
                <h3 className="font-google mt-3 text-xl tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#bdb6b0]">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq" className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <p className={eyebrowClass}>Perguntas frequentes</p>
          <h2 id="faq" className={h2Class}>
            O que costumam perguntar.
          </h2>
          <div className="mt-8 border-t border-white/10">
            {service.faq.map((item) => (
              <details key={item.question} className="group border-b border-white/10 py-5">
                <summary
                  data-cursor-hover
                  className="font-google flex cursor-pointer list-none items-center justify-between gap-6 text-lg tracking-[-0.03em] marker:hidden sm:text-xl"
                >
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-glim-diamond text-2xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[#bdb6b0]">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="proximo-passo" className="mx-auto max-w-4xl px-4 pb-20 text-center sm:px-6 lg:px-8 lg:pb-28">
          <h2
            id="proximo-passo"
            className="font-google mx-auto max-w-2xl text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05] tracking-[-0.05em] text-balance"
          >
            Vamos entender o que o seu negócio precisa.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#bdb6b0] sm:text-lg">
            Conte o contexto e o objetivo. Respondemos com o caminho que faz mais sentido, sem enrolação.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="bg-glim-diamond text-glim-dark inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold sm:text-base"
            >
              Iniciar Projeto com a glim.
            </a>
            <Link
              href="/#contato"
              data-cursor-hover
              className="text-sm font-medium text-[#d9d3cc] underline decoration-[#f2c48f]/40 underline-offset-4 transition-colors hover:text-white"
            >
              ou preencher o briefing
            </Link>
          </div>
        </section>

        <nav aria-label="Outros serviços" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <p className={eyebrowClass}>Outros serviços</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {otherServices.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/servicos/${item.slug}`}
                  data-cursor-hover
                  className="font-google block rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-5 text-xl tracking-[-0.04em] transition-colors hover:bg-white/[0.07]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
