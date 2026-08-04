'use client';

import { useEffect, useRef } from 'react';
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { BrandBackdrop } from '@/components/layout/BrandBackdrop';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Approach } from '@/components/sections/Approach';
import { Capabilities } from '@/components/sections/Capabilities';
import { TechStack } from '@/components/sections/TechStack';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { SPRING } from '@/lib/motion';

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const pointerX = useMotionValue(0.3);
  const pointerY = useMotionValue(0.2);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    if (reduceMotion) return;
    const handlePointerMove = (event: MouseEvent) => {
      pointerX.set(event.clientX / window.innerWidth);
      pointerY.set(event.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [pointerX, pointerY, reduceMotion]);

  const glowX = useTransform(pointerX, [0, 1], [10, 70]);
  const glowY = useTransform(pointerY, [0, 1], [8, 60]);
  const gridOpacity = useTransform(scrollY, [0, 420], [0.42, 0.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const glowBackground = useMotionTemplate`
    radial-gradient(circle at ${glowX}% ${glowY}%, rgba(242, 183, 123, 0.34), transparent 34%),
    linear-gradient(135deg, rgba(242, 183, 123, 0.1), transparent 60%)
  `;

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={SPRING}>
        <div id="topo" className="relative min-h-screen overflow-x-clip">
          <a
            href="#conteudo"
            className="focus:bg-glim-diamond focus:text-glim-dark sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
          >
            Ir para o conteúdo principal
          </a>

          <BrandBackdrop glowBackground={glowBackground} gridOpacity={gridOpacity} />

          <Header />

          <main id="conteudo" className="relative">
            <Hero heroRef={heroRef} copyY={copyY} reduceMotion={reduceMotion} />
            <Approach />
            <Capabilities />
            <TechStack />
            <CaseStudies />
            <About />
            <Contact />
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
