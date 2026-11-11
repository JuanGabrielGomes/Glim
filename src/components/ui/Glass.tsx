import type { CSSProperties, ElementType, ReactNode } from 'react';

interface GlassProps {
  /** escuro: card de vidro escuro sobre foto. claro: vidro translúcido. */
  tone?: 'escuro' | 'claro';
  /** Corte facetado no canto superior direito, em px. 0 desliga. */
  faceta?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Card de vidro (backdrop-filter) com fallback sólido quando o navegador não suporta. */
export function Glass({
  tone = 'escuro',
  faceta = 0,
  as: Tag = 'div',
  className = '',
  children,
}: GlassProps) {
  const surface = tone === 'escuro' ? 'vidro-escuro text-linho-050' : 'vidro text-grafite-950';
  const style: (CSSProperties & { '--f': string }) | undefined =
    faceta > 0 ? { '--f': `${faceta}px` } : undefined;

  return (
    <Tag className={`${surface} ${faceta > 0 ? 'faceta' : ''} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
