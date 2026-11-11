'use client';

import { useReducedMotion } from 'framer-motion';
import { ReactLenis, type LenisRef } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { useEffect, useRef, type ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Rolagem com inércia (Lenis) só para a roda do mouse e o touchpad. No celular a rolagem
 * continua nativa. Desligada em prefers-reduced-motion. Links de âncora da mesma página
 * (/#raio-x) deslizam em vez de pular.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank') return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname)
        return;
      if (!url.hash) return;

      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      lenisRef.current?.lenis?.scrollTo(target, { offset: 0 });
      window.history.pushState(null, '', url.hash);
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [reduceMotion]);

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: false }}
    >
      {children}
    </ReactLenis>
  );
}
