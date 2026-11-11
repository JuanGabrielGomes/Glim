import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { About } from '@/components/sections/About';
import { Capabilities } from '@/components/sections/Capabilities';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Principle } from '@/components/sections/Principle';
import { Process } from '@/components/sections/Process';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <MotionProvider>
      <a
        href="#conteudo"
        className="bg-linho-050 text-grafite-950 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Ir para o conteúdo principal
      </a>

      <div className="relative">
        <Header />
        <main id="conteudo">
          <Hero />
          <CaseStudies />
          <Capabilities />
          <Process />
          <Principle />
          <About />
          <Contact />
        </main>
      </div>

      <Footer />
    </MotionProvider>
  );
}
