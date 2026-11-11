'use client';

import { m } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos, para escalonar blocos da mesma seção. */
  delay?: number;
}

/**
 * Entrada suave: opacity 0→1 e y 22→0 em 900 ms, uma vez, com curva de desaceleração longa.
 * Use só em TEXTO. Envolver imagens grandes ou cartões com backdrop-filter faz o navegador
 * reprocessar essas camadas a cada quadro e a rolagem trava. Exige <MotionProvider>.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </m.div>
  );
}
