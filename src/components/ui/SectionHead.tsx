import type { ElementType } from 'react';
import { FitText } from '@/components/ui/FitText';

type SectionTone = 'linho' | 'grafite';

interface SectionHeadProps {
  /** Título gigante, uma linha por item (ex.: ['Trabalhos']). */
  lines: readonly string[];
  /** Coluna em caixa alta à direita do título. */
  caption?: string;
  tone?: SectionTone;
  id?: string;
  as?: ElementType;
  className?: string;
}

/** Cabeçalho padrão de seção: mega à esquerda e coluna em caixa alta à direita. */
export function SectionHead({
  lines,
  caption,
  tone = 'linho',
  id,
  as = 'h2',
  className = '',
}: SectionHeadProps) {
  const color = tone === 'grafite' ? 'text-linho-050' : 'text-grafite-950';
  const captionColor = tone === 'grafite' ? 'text-pedra-300' : 'text-pedra-500';

  return (
    <header className={`grid items-end gap-4 sm:gap-10 md:grid-cols-[1fr_auto] ${className}`.trim()}>
      <FitText
        as={as}
        id={id}
        lines={lines}
        className={`mega text-[clamp(44px,7.6vw,112px)] ${color}`}
      />
      {caption ? (
        <p className={`caps max-w-[16ch] md:text-right ${captionColor}`}>{caption}</p>
      ) : null}
    </header>
  );
}
