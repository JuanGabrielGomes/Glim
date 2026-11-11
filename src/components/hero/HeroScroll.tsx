'use client';

import { useEffect } from 'react';

const FADE_THRESHOLD = 0.55;

/**
 * Mede o quanto o hero já foi percorrido (0 a 1) e publica em `--hero-p` na própria seção.
 * O CSS usa essa variável para o diamante avançar e os textos saírem de cena. Também liga
 * `data-faded` quando os textos já sumiram, para eles não ficarem clicáveis invisíveis.
 *
 * No desktop o hero fica fixo (sticky) durante o trecho extra de rolagem; no celular ele
 * rola normalmente e o progresso acompanha a saída dele da tela. Sem movimento, nada muda.
 */
export function HeroScroll() {
  useEffect(() => {
    const section = document.getElementById('topo');
    if (!section) return;

    const desktop = window.matchMedia('(min-width: 768px)');
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let frame = 0;
    let last = -1;
    let faded = false;

    const update = () => {
      frame = 0;
      if (!motionOk.matches) {
        section.style.removeProperty('--hero-p');
        delete section.dataset.faded;
        last = -1;
        return;
      }

      const rect = section.getBoundingClientRect();
      const inner = section.firstElementChild as HTMLElement | null;
      const distance = desktop.matches
        ? Math.max(rect.height - (inner?.offsetHeight ?? window.innerHeight), 1)
        : Math.max(rect.height, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));

      if (Math.abs(progress - last) >= 0.001) {
        last = progress;
        section.style.setProperty('--hero-p', progress.toFixed(3));
      }

      const shouldFade = progress > FADE_THRESHOLD;
      if (shouldFade !== faded) {
        faded = shouldFade;
        section.dataset.faded = String(shouldFade);
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();

    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      if (frame) cancelAnimationFrame(frame);
      section.style.removeProperty('--hero-p');
      delete section.dataset.faded;
    };
  }, []);

  return null;
}
