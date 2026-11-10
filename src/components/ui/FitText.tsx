'use client';

import { useEffect, useRef, type ElementType } from 'react';

interface FitTextProps {
  /** Cada item é uma linha inteira. Nunca quebre no meio de uma palavra. */
  lines: readonly string[];
  as?: ElementType;
  id?: string;
  className?: string;
  /** Menor tamanho (px) que a fonte pode ter antes de parar de encolher. */
  minSize?: number;
}

/**
 * Mega-título sem quebra de palavra: cada linha fica inteira e a fonte diminui até
 * caber na largura do elemento. Passe o tamanho base em `className` (ex.: `mega text-[...]`);
 * o ajuste só mexe no `font-size` inline.
 */
export function FitText({ lines, as: Tag = 'span', id, className = '', minSize = 28 }: FitTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let lastWidth = -1;

    const fit = () => {
      element.style.fontSize = '';
      let size = parseFloat(getComputedStyle(element).fontSize);
      for (let guard = 0; guard < 6; guard += 1) {
        if (element.scrollWidth <= element.clientWidth + 1 || size <= minSize) break;
        size = Math.max(minSize, Math.floor((size * element.clientWidth) / element.scrollWidth));
        element.style.fontSize = `${size}px`;
      }
      lastWidth = element.clientWidth;
    };

    fit();
    document.fonts?.ready.then(fit);

    const refitIfWidthChanged = () => {
      if (element.clientWidth !== lastWidth) fit();
    };

    const observer = new ResizeObserver(refitIfWidthChanged);
    observer.observe(element);
    window.addEventListener('resize', refitIfWidthChanged);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', refitIfWidthChanged);
    };
  }, [lines, minSize]);

  return (
    <Tag ref={ref} id={id} className={`block max-w-full whitespace-nowrap ${className}`.trim()}>
      {lines.map((line, index) => (
        <span key={line} className="block">
          {line}
          {index < lines.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
