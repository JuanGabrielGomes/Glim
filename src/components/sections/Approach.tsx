'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { PILLARS } from '@/lib/content';

export function Approach() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(PILLARS.length - 1, Math.max(0, Math.floor(value * PILLARS.length)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  const activePillar = PILLARS[activeIndex];

  return (
    <section
      id="abordagem"
      aria-labelledby="abordagem-title"
      ref={sectionRef}
      className="relative"
      style={{ height: `${PILLARS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6">
        <p className="font-mono text-[10px] tracking-[0.32em] text-[#9c948a] uppercase sm:text-xs dark:text-[#8d867f]">
          Como pensamos
        </p>

        <div className="relative mt-8 flex min-h-[16rem] w-full max-w-4xl items-center justify-center sm:min-h-[20rem]">
          <span
            aria-hidden="true"
            className="font-google pointer-events-none absolute text-[16rem] leading-none text-black/[0.04] select-none sm:text-[22rem] dark:text-white/[0.035]"
          >
            0{activeIndex + 1}
          </span>
          <AnimatePresence mode="wait">
            <m.div
              key={activePillar.title}
              initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -28, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 160, damping: 24, mass: 0.8 }}
              className="relative"
            >
              <h2
                id="abordagem-title"
                className="font-google text-[clamp(2.4rem,7.5vw,5.5rem)] leading-[0.98] tracking-[-0.055em] text-[#2f2b28] dark:text-[#f5f0ea]"
              >
                {activePillar.title}
              </h2>
              <p className="mx-auto mt-6 max-w-md text-base leading-7 text-[#5f5955] sm:text-lg dark:text-[#c7c0b8]">
                <span className="sm:hidden">{activePillar.mobileDescription}</span>
                <span className="hidden sm:inline">{activePillar.description}</span>
              </p>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-3" role="presentation">
          {PILLARS.map((pillar, index) => (
            <span
              key={pillar.title}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? 'bg-glim-diamond w-8'
                  : 'w-1.5 bg-black/15 dark:bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
