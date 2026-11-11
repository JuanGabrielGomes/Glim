import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { FitText } from '@/components/ui/FitText';
import { Reveal } from '@/components/ui/Reveal';
import { Shot } from '@/components/ui/Shot';
import { getCaseEntry } from '@/lib/cases';
import { CASE_STUDIES } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';
import { NoBreak } from '@/components/ui/NoBreak';

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseEntry(slug);
  if (!entry) return {};

  const url = `${SITE_URL}/trabalhos/${entry.slug}`;
  const title = `${entry.client}: case de ${entry.type.toLowerCase()}`;
  return {
    title,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url,
      siteName: 'glim.',
      title: `${title} | glim.`,
      description: entry.description,
    },
  };
}

const LABEL = 'meta text-pedra-500';

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const entry = getCaseEntry(slug);
  if (!entry) notFound();

  const pageUrl = `${SITE_URL}/trabalhos/${entry.slug}`;
  const siteHost = entry.href.replace(/^https?:\/\//, '');
  const [headline, emphasis] = entry.headline;

  const ficha: { label: string; value: string; href?: string }[] = [
    { label: 'Cliente', value: entry.clientLine },
    { label: 'Entrega', value: entry.delivery },
    ...(entry.timeline ? [{ label: 'Prazo', value: entry.timeline }] : []),
    entry.isLive
      ? { label: 'Site', value: `${siteHost} ↗`, href: entry.href }
      : { label: 'Site', value: 'Indisponível no momento' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#case`,
        name: `${entry.client}: ${entry.type}`,
        description: entry.description,
        url: pageUrl,
        image: `${SITE_URL}${entry.imageSrc}`,
        creator: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'pt-BR',
        ...(entry.isLive ? { about: { '@type': 'WebSite', url: entry.href } } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'glim.', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Trabalhos', item: `${SITE_URL}/trabalhos` },
          { '@type': 'ListItem', position: 3, name: entry.client, item: pageUrl },
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
          <section className="px-[var(--m)] pt-[130px] pb-[72px] md:pt-[180px]">
            <p className={LABEL}>
              Case {entry.number} · {entry.type}
            </p>
            <h1 className="my-7 md:mb-10">
              <FitText
                lines={[entry.client]}
                className="mega text-[15vw] md:text-[clamp(56px,11.2vw,168px)]"
              />
            </h1>
            <p className="mb-14 max-w-[18em] text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em]">
              <NoBreak>{headline}</NoBreak>{' '}
              <em className="font-serif text-[1.1em] leading-[0.9] font-normal tracking-[-0.01em]">
                <NoBreak>{emphasis}</NoBreak>
              </em>
            </p>

            <dl className="border-pedra-200 grid grid-cols-2 gap-6 border-t pt-[22px] md:grid-cols-4">
              {ficha.map((item) => (
                <div key={item.label} className={LABEL}>
                  <dt>{item.label}</dt>
                  <dd className="text-grafite-950 mt-1.5 font-sans text-base font-medium tracking-normal normal-case">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="px-[var(--m)]">
            <Shot
              src={entry.imageSrc}
              alt={`Página inicial do site da ${entry.client}`}
              width={entry.imageWidth}
              height={entry.imageHeight}
              sizes="100vw"
              priority
              ratioClassName="aspect-video"
            />
          </div>

          <Reveal>
            <CaseText label="O desafio" paragraphs={entry.challenge} />
          </Reveal>
          <Reveal>
            <CaseText label="O que fizemos" paragraphs={entry.solution} />
          </Reveal>
          <Reveal>
            <section className="grid gap-[clamp(24px,5vw,80px)] px-[var(--m)] py-[clamp(72px,8vw,120px)] md:grid-cols-[280px_1fr]">
              <h2 className={`${LABEL} text-lg`}>Entregas</h2>
              <ul className="meta flex flex-wrap content-start gap-2.5">
                {entry.deliverables.map((item) => (
                  <li key={item} className="border-pedra-200 border px-3.5 py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <section className="bg-grafite-950 text-linho-050 grid items-end gap-10 px-[var(--m)] py-[clamp(80px,9vw,140px)] md:grid-cols-[1fr_auto]">
            <div>
              <p className="meta text-pedra-300">Próximo case</p>
              <p className="mt-5">
                <FitText
                  as="span"
                  lines={[entry.next.client]}
                  className="mega text-[15vw] md:text-[clamp(44px,7.6vw,112px)]"
                />
              </p>
              <p className="mt-6">
                <TextLink href={`/trabalhos/${entry.next.slug}`}>
                  Ver o case {entry.next.client}
                </TextLink>
              </p>
            </div>
            <ButtonLink href="/#raio-x" tone="linho">
              Quero um site assim
            </ButtonLink>
          </section>
        </main>
      </div>

      <Footer />
    </MotionProvider>
  );
}

interface CaseTextProps {
  label: string;
  paragraphs: readonly string[];
}

function CaseText({ label, paragraphs }: CaseTextProps) {
  return (
    <section className="border-pedra-200 grid gap-[clamp(24px,5vw,80px)] border-b px-[var(--m)] py-[clamp(72px,8vw,120px)] md:grid-cols-[280px_1fr]">
      <h2 className={`${LABEL} text-lg`}>{label}</h2>
      <div className="grid max-w-[38em] gap-[18px]">
        {paragraphs.map((text) => (
          <p key={text} className="text-xl leading-[1.6]">
            <NoBreak>{text}</NoBreak>
          </p>
        ))}
      </div>
    </section>
  );
}
