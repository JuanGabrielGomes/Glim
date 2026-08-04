'use client';

import { m, useReducedMotion } from 'framer-motion';
import { BrowserMockup } from '@/components/ui/BrowserMockup';
import { CASE_STUDIES } from '@/lib/content';
import { FADE_UP, VIEWPORT } from '@/lib/motion';

export function CaseStudies() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div id="work">
      {CASE_STUDIES.map((caseStudy, index) => {
        const isReversed = index % 2 === 1;
        return (
          <section
            key={caseStudy.client}
            aria-labelledby={`case-${index}-title`}
            className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
            style={{ background: caseStudy.mockupBackground }}
          >
            <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
            <div
              className={`relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                isReversed ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <m.a
                href={caseStudy.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir o site da ${caseStudy.client} em uma nova aba`}
                data-cursor-hover
                className="group block"
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={FADE_UP}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <BrowserMockup
                  label={caseStudy.client}
                  url={caseStudy.href.replace('https://', '')}
                  accent={caseStudy.mockupAccent}
                  background={caseStudy.mockupBackground}
                  imageSrc={caseStudy.imageSrc}
                  imagePosition={caseStudy.imagePosition}
                  reduceMotion={reduceMotion}
                  variant="cinema"
                />
              </m.a>

              <m.div
                className="text-center lg:text-left"
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={FADE_UP}
              >
                <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <span
                    className="font-mono text-xs tracking-[0.22em] uppercase"
                    style={{ color: caseStudy.mockupAccent }}
                  >
                    Case 0{index + 1}
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-white/60 uppercase">
                    {caseStudy.category}
                  </span>
                </div>

                <h3
                  id={`case-${index}-title`}
                  className="font-google mx-auto mt-6 max-w-xl text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.02] tracking-[-0.05em] text-[#f7f3ee] lg:mx-0"
                >
                  {caseStudy.headline}
                </h3>
                <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg lg:mx-0">
                  {caseStudy.summary}
                </p>

                <ul
                  className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
                  aria-label={`Destaques do case ${caseStudy.client}`}
                >
                  {caseStudy.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-white/[0.06] px-3 py-2 font-mono text-[11px] tracking-[0.16em] text-white/70 uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  <m.a
                    href={caseStudy.href}
                    data-cursor-hover
                    className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition"
                    style={{
                      backgroundColor: caseStudy.mockupAccent,
                      color: caseStudy.mockupAccentText ?? '#14100e',
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver site ao vivo
                  </m.a>
                  <m.a
                    href="#contato"
                    data-cursor-hover
                    className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Quero um site assim
                  </m.a>
                </div>
              </m.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
