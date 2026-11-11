import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { NoBreak } from '@/components/ui/NoBreak';
import { COMPANY, PRIVACY, type PrivacyBlock } from '@/lib/privacy';
import { SITE_URL } from '@/lib/seo';

const URL = `${SITE_URL}/privacidade`;

export const metadata: Metadata = {
  title: PRIVACY.metaTitle,
  description: PRIVACY.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: URL,
    siteName: 'glim.',
    title: `${PRIVACY.metaTitle} | glim.`,
    description: PRIVACY.metaDescription,
    images: [
      { url: '/opengraph-image', width: 1200, height: 630, alt: 'glim. · Precisão que se vê.' },
    ],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
};

function Block({ block }: { block: PrivacyBlock }) {
  if (block.type === 'list') {
    return (
      <ul className="text-pedra-700 mt-4 grid gap-2.5 text-lg leading-[1.6]">
        {block.items.map((item) => (
          <li key={item} className="grid grid-cols-[18px_1fr] gap-x-2">
            <span aria-hidden="true" className="text-ambar-700">
              ·
            </span>
            <span>
              <NoBreak>{item}</NoBreak>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-pedra-700 mt-4 text-lg leading-[1.7]">
      <NoBreak>{block.text}</NoBreak>
    </p>
  );
}

export default function PrivacidadePage() {
  return (
    <>
      <div className="relative">
        <Header tone="grafite" />

        <main
          id="conteudo"
          className="px-[var(--m)] pt-[150px] pb-[clamp(72px,8vw,120px)] md:pt-[190px]"
        >
          <article className="max-w-[46rem]">
            <p className="meta text-pedra-500">Atualizada em {PRIVACY.lastUpdated}</p>
            <h1 className="mt-5 text-[clamp(40px,6vw,84px)] leading-[0.98] font-medium tracking-[-0.05em] text-balance">
              {PRIVACY.title}
            </h1>
            <p className="text-pedra-700 mt-8 text-[clamp(18px,1.5vw,21px)] leading-[1.6]">
              <NoBreak>{PRIVACY.intro}</NoBreak>
            </p>

            <div className="border-pedra-200 mt-14 grid border-t">
              {PRIVACY.sections.map((section) => (
                <section key={section.title} className="border-pedra-200 border-b py-9">
                  <h2 className="text-[clamp(24px,2.4vw,32px)] leading-[1.1] font-medium tracking-[-0.03em]">
                    {section.title}
                  </h2>
                  {section.blocks.map((block, index) => (
                    <Block key={index} block={block} />
                  ))}
                  {'showController' in section && section.showController ? (
                    <dl className="meta mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-pedra-500">CNPJ</dt>
                        <dd className="text-grafite-950 mt-1">{COMPANY.document}</dd>
                      </div>
                      <div>
                        <dt className="text-pedra-500">E-mail</dt>
                        <dd className="mt-1">
                          <a
                            href={`mailto:${COMPANY.email}`}
                            className="text-grafite-950 normal-case underline underline-offset-4"
                          >
                            {COMPANY.email}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </main>
      </div>

      <Footer />
    </>
  );
}
