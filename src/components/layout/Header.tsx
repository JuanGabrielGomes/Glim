'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import glimMarkCream from '../../../public/brand/glim-mark-cream.png';
import { useMagnetic } from '@/components/cursor/useMagnetic';
import { NAV_ITEMS } from '@/lib/content';
import { SPRING } from '@/lib/motion';

const REVEAL_AT = 120;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, REVEAL_AT * 0.6, REVEAL_AT], [0, 0, 1]);
  const headerY = useTransform(scrollY, [0, REVEAL_AT], [-16, 0]);
  const {
    ref: ctaRef,
    style: ctaStyle,
    onPointerMove: handleCtaPointerMove,
    onPointerLeave: handleCtaPointerLeave,
  } = useMagnetic<HTMLAnchorElement>(0.28);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setIsRevealed((current) => {
      const next = value > REVEAL_AT * 0.6;
      return current === next ? current : next;
    });
  });

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((current) => !current);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <m.header
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8"
      style={
        reduceMotion
          ? undefined
          : { opacity: headerOpacity, y: headerY, pointerEvents: isRevealed ? 'auto' : 'none' }
      }
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="glass-panel absolute inset-0 rounded-full border-white/10 bg-[#1c1714]/75 backdrop-blur-2xl" />
        <nav
          aria-label="Navegação principal"
          className="relative z-20 flex items-center justify-between gap-4 rounded-full px-5 py-3 sm:px-6"
        >
          <a href="#topo" aria-label="Voltar ao topo da página" data-cursor-hover className="inline-flex items-center">
            <Image src={glimMarkCream} alt="glim." className="h-6 w-auto sm:h-7" priority />
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-glim-diamond text-sm font-medium text-[#cfc8c1] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <m.a
              ref={ctaRef}
              href="#contato"
              data-cursor-hover
              className="border-glim-diamond/50 bg-glim-diamond text-glim-dark hidden items-center rounded-full border px-5 py-2.5 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] md:inline-flex"
              style={ctaStyle}
              onPointerMove={handleCtaPointerMove}
              onPointerLeave={handleCtaPointerLeave}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Iniciar Projeto
            </m.a>
            <m.button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[#f5f0ea] backdrop-blur-xl transition-colors hover:bg-white/[0.12] md:hidden"
              whileTap={{ scale: 0.96 }}
              onClick={toggleMenu}
            >
              <span className="relative h-4 w-5" aria-hidden="true">
                <m.span
                  className="absolute top-0 left-0 h-[1.5px] w-5 rounded-full bg-current"
                  animate={isMenuOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={SPRING}
                />
                <m.span
                  className="absolute top-[7px] left-0 h-[1.5px] w-5 rounded-full bg-current"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={SPRING}
                />
                <m.span
                  className="absolute top-[14px] left-0 h-[1.5px] w-5 rounded-full bg-current"
                  animate={isMenuOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={SPRING}
                />
              </span>
            </m.button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {isMenuOpen ? (
            [
              <m.button
                key="mobile-navigation-scrim"
                type="button"
                aria-label="Fechar menu principal"
                className="fixed inset-0 z-10 bg-black/40 backdrop-blur-[2px] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                onClick={closeMenu}
              />,
              <m.div
                key="mobile-navigation-panel"
                id="mobile-navigation"
                className="absolute inset-x-0 top-[calc(100%+0.8rem)] z-20 md:hidden"
                initial={{ opacity: 0, y: -10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.8 }}
              >
                <div className="glass-panel relative overflow-hidden rounded-[1.9rem] border border-white/12 bg-[#1c1714]/90 p-3 shadow-[0_28px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 inset-x-8 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)]"
                  />
                  <div className="relative flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="rounded-[1.2rem] px-4 py-3 text-sm font-medium text-[#ebe6e1] transition-colors hover:bg-white/[0.06] hover:text-white"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </a>
                    ))}
                    <m.a
                      href="#contato"
                      className="border-glim-diamond/45 bg-glim-diamond text-glim-dark mt-2 inline-flex items-center justify-center rounded-[1.2rem] border px-5 py-3.5 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.38)]"
                      whileTap={{ scale: 0.985 }}
                      onClick={closeMenu}
                    >
                      Iniciar Projeto
                    </m.a>
                    <p className="font-mono px-1 pt-2 text-[11px] tracking-[0.18em] text-[#bdb6b0] uppercase">
                      Design digital, engenharia full stack. Serra Gaúcha, Brasil.
                    </p>
                  </div>
                </div>
              </m.div>,
            ]
          ) : null}
        </AnimatePresence>
      </div>
    </m.header>
  );
}
