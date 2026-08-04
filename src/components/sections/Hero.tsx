'use client';

import type { MotionValue } from 'framer-motion';
import { m, useScroll, useTransform } from 'framer-motion';
import type { RefObject } from 'react';
import { LiquidLogo } from '@/components/logo/LiquidLogo';
import { useMagnetic } from '@/components/cursor/useMagnetic';
import { CONTACT_WHATSAPP_HREF, HERO_ACCENT_WORDS, HERO_TITLE } from '@/lib/content';
import { FADE_UP, STAGGER, WORD_CHILD, WORD_PARENT } from '@/lib/motion';

type HeroProps = {
  heroRef: RefObject<HTMLElement | null>;
  copyY: MotionValue<number>;
  reduceMotion: boolean;
};

const SIGNAL_METRICS = [
  { label: 'Mensagem', value: 'Direta' },
  { label: 'Navegação', value: 'Simples' },
  { label: 'Código', value: 'Enxuto' },
  { label: 'Leitura', value: 'Rápida' },
];

export function Hero({ heroRef, copyY, reduceMotion }: HeroProps) {
  const words = HERO_TITLE.split(' ');
  const {
    ref: primaryCtaRef,
    style: primaryCtaStyle,
    onPointerMove: handlePrimaryCtaPointerMove,
    onPointerLeave: handlePrimaryCtaPointerLeave,
  } = useMagnetic<HTMLAnchorElement>(0.22);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const cueOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const videoAllowed = !reduceMotion;

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#0b0908]"
    >
      <div aria-hidden="true" className="absolute inset-0">
        {videoAllowed ? (
          <video
            className="h-full w-full object-cover opacity-90"
            autoPlay
            muted
            loop
            playsInline
            poster="/video/hero-lamp-poster.jpg"
          >
            <source src="/video/hero-lamp.webm" type="video/webm" />
            <source src="/video/hero-lamp.mp4" type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/video/hero-lamp-poster.jpg"
            alt=""
            className="h-full w-full object-cover opacity-90"
          />
        )}
        <div className="absolute inset-0 block bg-[radial-gradient(ellipse_at_center,rgba(11,9,8,0.5)_0%,rgba(11,9,8,0.82)_55%,rgba(11,9,8,0.95)_100%)] lg:hidden" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(11,9,8,0.55)_62%,rgba(11,9,8,0.92)_100%)] lg:block" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0b0908] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0908] to-transparent" />
      </div>

      <a
        href="#topo"
        aria-label="glim."
        className="relative z-10 mt-6 ml-6 self-start sm:mt-8 sm:ml-8"
        data-cursor-hover
      >
        <LiquidLogo className="h-6 w-20 sm:h-7 sm:w-24" />
      </a>

      <div className="relative z-10 flex flex-1 items-center px-4 py-10 sm:px-6 lg:px-10">
        <m.div
          className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16"
          initial="hidden"
          animate="visible"
          variants={STAGGER}
          style={reduceMotion ? undefined : { y: copyY }}
        >
          <div className="text-center lg:text-left">
            <m.p
              variants={FADE_UP}
              className="mx-auto max-w-[26ch] text-balance font-mono text-[10px] tracking-[0.2em] text-[#b7ada2] uppercase sm:max-w-none sm:text-xs sm:tracking-[0.32em] lg:mx-0"
            >
              Glim / Do conceito ao código, o insight é claro.
            </m.p>

            <m.h1
              id="hero-title"
              className="font-google mx-auto mt-6 max-w-[13ch] text-[clamp(2.3rem,6.4vw,4.6rem)] leading-[0.98] tracking-[-0.05em] text-[#f5f0ea] sm:mt-8 lg:mx-0"
              variants={WORD_PARENT}
            >
              {words.map((word, index) => {
                const normalizedWord = word.toLocaleLowerCase().replace(/[.,!?;:]/g, '');
                const isAccentWord = HERO_ACCENT_WORDS.has(normalizedWord);

                return (
                  <span key={`${word}-${index}`} className="inline-block pr-[0.16em] pb-[0.08em]">
                    <m.span
                      className={
                        isAccentWord
                          ? 'inline-block bg-[linear-gradient(135deg,#f7dcc0,#f2b77b)] bg-clip-text font-sans font-semibold tracking-[-0.048em] text-transparent'
                          : 'font-google inline-block'
                      }
                      variants={WORD_CHILD}
                    >
                      {word}
                    </m.span>
                  </span>
                );
              })}
            </m.h1>
          </div>

          <div className="text-center lg:text-right">
            <m.p
              variants={FADE_UP}
              className="mx-auto max-w-[30rem] text-base leading-7 text-[#d9d3cc] sm:text-lg sm:leading-8 lg:mr-0 lg:ml-auto"
            >
              Sites e produtos digitais com direção visual e engenharia sólida, pra transformar
              visitantes em clientes antes mesmo da primeira conversa.
            </m.p>

            <m.div
              variants={FADE_UP}
              className="mx-auto mt-7 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:mr-0 lg:ml-auto lg:justify-end"
            >
              {SIGNAL_METRICS.map((metric) => (
                <span
                  key={metric.label}
                  className="font-mono text-[10px] tracking-[0.2em] text-[#a89e93] uppercase"
                >
                  {metric.label} <span className="text-[#e7e1d9]">{metric.value}</span>
                </span>
              ))}
            </m.div>

            <m.div
              variants={FADE_UP}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-end"
            >
              <m.a
                ref={primaryCtaRef}
                href="#contato"
                data-cursor-hover
                className="group bg-glim-diamond text-glim-dark relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-base font-semibold shadow-[0_18px_44px_-22px_rgba(242,183,123,0.85)] sm:w-auto"
                style={primaryCtaStyle}
                onPointerMove={handlePrimaryCtaPointerMove}
                onPointerLeave={handlePrimaryCtaPointerLeave}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.46),transparent_52%)] opacity-80 transition-opacity group-hover:opacity-100"
                />
                <span className="relative">Iniciar Projeto</span>
              </m.a>
              <m.a
                href={CONTACT_WHATSAPP_HREF}
                data-cursor-hover
                className="inline-flex items-center gap-2 text-sm font-medium text-[#d9d3cc] underline decoration-[#f2c48f]/40 underline-offset-4 transition hover:text-white"
                whileHover={{ y: -1 }}
              >
                ou agendar diagnóstico
              </m.a>
            </m.div>
          </div>
        </m.div>
      </div>

      <m.div
        aria-hidden="true"
        className="relative z-10 flex flex-none flex-col items-center gap-2 pb-6 sm:pb-8"
        style={reduceMotion ? undefined : { opacity: cueOpacity }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#b7ada2] uppercase">Role</span>
        <m.span
          className="h-8 w-px bg-[linear-gradient(180deg,rgba(245,240,234,0.4),transparent)]"
          animate={reduceMotion ? undefined : { scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </m.div>
    </section>
  );
}
