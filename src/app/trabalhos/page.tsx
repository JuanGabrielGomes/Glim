import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { CaseList } from '@/components/sections/CaseStudies';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { SITE_URL } from '@/lib/seo';

const TITLE = 'Trabalhos: sites no ar para empresas reais';
const DESCRIPTION =
  'Cases da glim.: um site institucional bilíngue, um portfólio editorial e uma loja virtual, todos feitos sob medida, com código próprio e sem template.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/trabalhos` },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${SITE_URL}/trabalhos`,
    siteName: 'glim.',
    title: `${TITLE} | glim.`,
    description: DESCRIPTION,
  },
};

export default function TrabalhosPage() {
  return (
    <MotionProvider>
      <div className="relative">
        <Header tone="grafite" />
        <main
          id="conteudo"
          className="px-[var(--m)] pt-[160px] pb-[clamp(80px,9vw,140px)] md:pt-[200px]"
        >
          <Reveal>
            <SectionHead
              as="h1"
              lines={['Trabalhos']}
              caption="Sites no ar para empresas reais"
              className="mb-[clamp(40px,5vw,72px)]"
            />
          </Reveal>
          <CaseList />
        </main>
      </div>
      <Footer />
    </MotionProvider>
  );
}
