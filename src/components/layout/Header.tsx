'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/lib/content';

interface HeaderProps {
  /** linho: texto claro sobre fundo grafite (home). grafite: texto escuro sobre fundo linho (páginas internas). */
  tone?: 'linho' | 'grafite';
}

/** Cabeçalho sobre o topo da página. No celular, "Menu" abre uma folha cheia em grafite. */
export function Header({ tone = 'linho' }: HeaderProps) {
  const onDark = tone === 'linho';
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header
      className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[var(--m)] py-6 md:py-7 ${
        onDark ? 'text-linho-050' : 'text-grafite-950'
      }`}
    >
      <Link href="/" aria-label="glim., página inicial" className="inline-flex items-center">
        <Image
          src={onDark ? '/brand/glim-logo-linho.svg' : '/brand/glim-logo-grafite.svg'}
          alt="glim."
          width={1874}
          height={995}
          priority
          className="h-[26px] w-auto md:h-[30px]"
        />
      </Link>

      <nav
        aria-label="Navegação principal"
        className="hidden gap-[34px] text-[15px] leading-none md:flex"
      >
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="transition-opacity hover:opacity-70">
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:block">
        <ButtonLink href="/#raio-x" tone={onDark ? 'linho' : 'grafite'} compact>
          Pedir um raio-x
        </ButtonLink>
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="menu-mobile"
        onClick={() => setIsOpen(true)}
        className="meta md:hidden"
      >
        Menu
      </button>

      {isOpen ? (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-grafite-950 fixed inset-0 z-50 flex flex-col px-[var(--m)] py-6 md:hidden"
        >
          <div className="flex items-center justify-between">
            <Image
              src="/brand/glim-logo-linho.svg"
              alt="glim."
              width={1874}
              height={995}
              className="h-[26px] w-auto"
            />
            <button type="button" onClick={close} className="meta">
              Fechar
            </button>
          </div>

          <nav aria-label="Navegação principal" className="mt-16 flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-grafite-800 flex items-baseline gap-5 border-b py-5 text-[32px] leading-none font-medium tracking-[-0.03em]"
              >
                <span className="meta text-pedra-300">0{index + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <ButtonLink href="/#raio-x" tone="linho" className="w-full justify-center">
              Pedir um raio-x do meu site
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
