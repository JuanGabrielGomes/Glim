import Image from 'next/image';
import type { CSSProperties } from 'react';

interface ShotProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Atributo `sizes` do next/image (obrigatório: define o que o navegador baixa). */
  sizes: string;
  priority?: boolean;
  /** Tamanho do corte facetado no canto superior direito, em px. */
  faceta?: number;
  /** object-position da imagem (o print costuma ancorar no topo). */
  position?: string;
  /** Classe de proporção; padrão 16/9,6. */
  ratioClassName?: string;
  className?: string;
}

/**
 * Imagem com moldura facetada (canto superior direito a 45°). Coloque dentro de um
 * elemento `group` para ganhar o zoom de 1,02 no hover.
 */
export function Shot({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  faceta = 28,
  position = 'top',
  ratioClassName = 'aspect-[16/9.6]',
  className = '',
}: ShotProps) {
  const style: CSSProperties & { '--f': string } = { '--f': `${faceta}px` };

  return (
    <div
      className={`faceta bg-linho-100 relative overflow-hidden ${ratioClassName} ${className}`.trim()}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: position }}
        className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}
