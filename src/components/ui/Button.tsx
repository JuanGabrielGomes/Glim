import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonTone = 'grafite' | 'linho';

interface ButtonLinkProps {
  href: string;
  /** Link externo: abre em nova aba com rel seguro. */
  external?: boolean;
  /** grafite: botão escuro sobre linho. linho: invertido, para fundos grafite. */
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
}

interface ButtonActionProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> {
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
}

const TONES: Record<ButtonTone, string> = {
  grafite: 'bg-grafite-950 text-linho-050',
  linho: 'bg-linho-050 text-grafite-950',
};

const BASE =
  'faceta [--f:10px] inline-flex items-center gap-3 px-6 py-4 text-base leading-none font-medium whitespace-nowrap transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60';

function buttonClasses(tone: ButtonTone, className: string): string {
  return `${BASE} ${TONES[tone]} ${className}`.trim();
}

/** Botão primário facetado, renderizado como link (navegação). */
export function ButtonLink({
  href,
  external = false,
  tone = 'grafite',
  className = '',
  children,
}: ButtonLinkProps) {
  const classes = buttonClasses(tone, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Botão primário facetado, renderizado como <button> (formulários e ações). */
export function Button({ tone = 'grafite', className = '', children, type = 'button', ...rest }: ButtonActionProps) {
  return (
    <button type={type} {...rest} className={buttonClasses(tone, className)}>
      {children}
    </button>
  );
}

interface TextLinkProps {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

const LINK_CLASSES =
  'inline-block border-b border-current pb-[5px] text-base leading-none font-medium whitespace-nowrap transition-opacity hover:opacity-70';

/** Link de texto com fio de 1 px embaixo (ação secundária). */
export function TextLink({ href, external = false, className = '', children }: TextLinkProps) {
  const classes = `${LINK_CLASSES} ${className}`.trim();
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
