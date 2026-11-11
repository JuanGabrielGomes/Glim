import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { Process } from '@/components/sections/Process';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { FitText } from '@/components/ui/FitText';
import { Glass } from '@/components/ui/Glass';
import { Reveal } from '@/components/ui/Reveal';
import { CONTACT_WHATSAPP_NUMBER } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';
import { getServicePage, SERVICE_PAGES } from '@/lib/services';
import { NoBreak } from '@/components/ui/NoBreak';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};

  const url = `${SITE_URL}/servicos/${service.slug}`;
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
      images: [
        { url: '/opengraph-image', width: 1200, height: 630, alt: 'glim. · Precisão que se vê.' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/opengraph-image'],
      title: `${service.metaTitle} | glim.`,
      description: service.metaDescription,
    },
  };
}

const EYEBROW = 'meta text-pedra-500';
const H2 =
  'mt-4 max-w-[18em] text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em]';
const SECTION = 'px-[var(--m)] pb-[clamp(64px,8vw,120px)]';

export default async function ServicePageRoute({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/servicos/${service.slug}`;
  const whatsappHref = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(service.whatsappText)}`;
  const otherServices = SERVICE_PAGES.filter((item) => item.slug !== service.slug);
  const primaryHref = service.externalUrl ?? '/#raio-x';
  const primaryLabel = service.externalUrl ? 'Quero meu site no ar' : 'Pedir um raio-x do meu site';

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
        ...(service.priceValue
          ? {
              offers: {
                '@type': 'Offer',
                price: String(service.priceValue),
                priceCurrency: 'BRL',
                url: service.externalUrl ?? pageUrl,
                availability: 'https://schema.org/InStock',
              },
            }
          : {}),
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
          { '@type': 'ListItem', position: 1, name: 'glim.', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${SITE_URL}/#servicos` },
          { '@type': 'ListItem', position: 3, name: service.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="relative">
        <Header tone="grafite" />

        <main id="conteudo">
          <section className="px-[var(--m)] pt-[130px] pb-[clamp(64px,8vw,120px)] md:pt-[180px]">
            <nav aria-label="Trilha de navegação" className={EYEBROW}>
              <Link
                href="/"
                className="relative transition-opacity after:absolute after:-inset-x-1 after:-inset-y-3 hover:opacity-70"
              >
                glim.
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/#servicos"
                className="relative transition-opacity after:absolute after:-inset-x-1 after:-inset-y-3 hover:opacity-70"
              >
                Serviços
              </Link>
              <span className="mx-2">/</span>
              <span className="text-grafite-950">{service.name}</span>
            </nav>

            <p className="meta text-ambar-700 mt-8">{service.eyebrow}</p>
            <h1 className="my-5 md:mb-9">
              <FitText
                lines={[service.name]}
                className="mega text-[15vw] md:text-[clamp(44px,8.4vw,128px)]"
              />
            </h1>

            <div className="grid items-end gap-[clamp(32px,5vw,80px)] md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="max-w-[22em] text-[clamp(24px,2.6vw,38px)] leading-[1.08] font-medium tracking-[-0.035em]">
                  <NoBreak>{service.h1}</NoBreak>
                </p>
                <p className="text-pedra-500 mt-6 max-w-[34em] text-[clamp(18px,1.5vw,21px)] leading-[1.5]">
                  <NoBreak>{service.intro}</NoBreak>
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-5">
                  <ButtonLink href={primaryHref} external={Boolean(service.externalUrl)}>
                    {primaryLabel}
                  </ButtonLink>
                  <TextLink href={whatsappHref} external>
                    Falar no WhatsApp
                  </TextLink>
                </div>
              </div>

              {service.price ? (
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
                      {service.price.value}
                    </p>
                    <p className="mt-2 opacity-85">{service.price.condition}</p>
                    <p className="text-pedra-200 mt-4 text-sm">{service.price.note}</p>
                  </Glass>
                </div>
              ) : null}
            </div>
          </section>

          <Reveal>
            <section aria-labelledby="para-quem" className={SECTION}>
              <p className={EYEBROW}>Para quem é</p>
              <h2 id="para-quem" className={H2}>
                Esse serviço é para quem se encaixa aqui.
              </h2>
              <ul className="caps border-pedra-200 mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-4">
                {service.audience.map((item) => (
                  <li
                    key={item}
                    className="border-pedra-200 border-b py-6 pr-6 lg:border-r lg:last:border-r-0 sm:[&:nth-child(odd)]:border-r"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="entregas" className={SECTION}>
              <p className={EYEBROW}>O que você recebe</p>
              <h2 id="entregas" className={H2}>
                O que entra no projeto.
              </h2>
              <ol className="border-pedra-200 mt-10 border-t">
                {service.deliverables.map((item, index) => (
                  <li
                    key={item.title}
                    className="border-pedra-200 grid grid-cols-[40px_1fr] gap-x-5 border-b py-[26px] md:grid-cols-[56px_1fr_1.2fr]"
                  >
                    <span className="meta text-pedra-500 pt-1.5">0{index + 1}</span>
                    <h3 className="text-[clamp(22px,2vw,30px)] leading-[1.1] font-medium tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="text-pedra-500 col-start-2 mt-2 max-w-[34em] md:col-start-3 md:mt-0">
                      <NoBreak>{item.text}</NoBreak>
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {service.price ? (
            <Reveal>
              <section className={SECTION}>
                <p className="text-pedra-500 max-w-[40em] text-base leading-[1.6]">
                  <NoBreak>{service.notIncluded ?? ''}</NoBreak>
                </p>
              </section>
            </Reveal>
          ) : null}

          <Process steps={service.process} showPromise={!service.process} />

          <div className="px-[var(--m)] pt-[clamp(64px,8vw,120px)]">
            {service.notIncluded && !service.price ? (
              <p className="text-pedra-500 mb-16 max-w-[40em]">{service.notIncluded}</p>
            ) : null}

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
                  {service.faq.map((item) => (
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

          <section
            aria-labelledby="proximo-passo"
            className="bg-grafite-950 text-linho-050 px-[var(--m)] py-[clamp(80px,9vw,140px)]"
          >
            <Reveal>
              <h2
                id="proximo-passo"
                className="max-w-[14em] text-[clamp(30px,4.4vw,64px)] leading-[1.02] font-medium tracking-[-0.045em]"
              >
                Vamos entender o que o seu negócio{' '}
                <em className="font-serif text-[1.1em] leading-[0.9] font-normal tracking-[-0.01em]">
                  precisa.
                </em>
              </h2>
              <p className="text-pedra-300 mt-6 max-w-[32em] text-[clamp(18px,1.5vw,21px)] leading-[1.5]">
                Conte o contexto e o objetivo. Respondemos com o caminho que faz mais sentido, sem
                enrolação.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-5">
                <ButtonLink href={primaryHref} external={Boolean(service.externalUrl)} tone="linho">
                  {primaryLabel}
                </ButtonLink>
                <TextLink href={whatsappHref} external>
                  Falar no WhatsApp
                </TextLink>
              </div>
            </Reveal>

            <nav
              aria-label="Outros serviços"
              className="border-grafite-800 mt-[clamp(64px,8vw,120px)] border-t pt-8"
            >
              <p className="meta text-pedra-300">Outros serviços</p>
              <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                {otherServices.map((item) => (
                  <li key={item.slug} className="border-grafite-800 border-b">
                    <Link
                      href={`/servicos/${item.slug}`}
                      className="group flex items-center justify-between py-5 text-xl font-medium tracking-[-0.03em]"
                    >
                      {item.name}
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </main>
      </div>

      <Footer />
    </MotionProvider>
  );
}
