'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { FitPill } from '@/components/ui/Primitives';
import { CAPABILITIES } from '@/lib/content';
import { FADE_UP, STAGGER, VIEWPORT } from '@/lib/motion';

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CAPABILITIES[activeIndex];

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={FADE_UP}
          className="flex items-center gap-4"
        >
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#9c948a] uppercase sm:text-xs dark:text-[#8d867f]">
            Serviços
          </p>
          <span className="h-px w-16 bg-black/[0.12] dark:bg-white/12" />
        </m.div>
        <m.h2
          id="servicos-title"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={FADE_UP}
          className="font-google mt-6 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.055em] text-[#2f2b28] dark:text-[#f5f0ea]"
        >
          Sites e sistemas que vendem o seu negócio antes da primeira reunião.
        </m.h2>

        <m.div
          className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={STAGGER}
        >
          <div role="tablist" aria-label="Serviços" className="border-t border-black/10 dark:border-white/10">
            {CAPABILITIES.map((capability, index) => {
              const isActive = index === activeIndex;
              return (
                <m.button
                  key={capability.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-cursor-hover
                  variants={FADE_UP}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className="group flex w-full items-baseline gap-4 border-b border-black/10 py-6 text-left transition-colors dark:border-white/10 sm:gap-6 sm:py-8"
                >
                  <span
                    className={`font-mono text-xs tracking-[0.2em] transition-colors ${
                      isActive ? 'text-glim-diamond' : 'text-[#a39c95] dark:text-[#7c766f]'
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className={`font-google text-[clamp(1.75rem,5vw,3.25rem)] leading-none tracking-[-0.05em] transition-colors ${
                      isActive
                        ? 'text-[#2f2b28] dark:text-[#f5f0ea]'
                        : 'text-[#b4ada5] dark:text-[#5c564f]'
                    }`}
                  >
                    {capability.title}
                  </span>
                </m.button>
              );
            })}
          </div>

          <div className="relative min-h-[16rem]">
            <AnimatePresence mode="wait">
              <m.div
                key={active.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <span className="rounded-full border border-black/10 px-3 py-1 font-mono text-[11px] tracking-[0.22em] text-[#7a736d] uppercase dark:border-white/10 dark:text-[#bab4af]">
                  {active.badge}
                </span>
                <p className="mt-6 max-w-md text-base leading-8 text-[#5c5652] sm:text-lg dark:text-[#dad5d0]">
                  {active.description}
                </p>
                <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-[#8a837d] uppercase dark:text-[#bdb6b0]">
                  Ideal para:
                </p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={`Ideal para ${active.title}`}>
                  {active.idealFor.map((detail) => (
                    <FitPill key={detail}>{detail}</FitPill>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>
          </div>
        </m.div>
      </div>
    </section>
  );
}
