'use client';

import { m } from 'framer-motion';
import type { ReactElement } from 'react';

export function SocialLinkButton({
  href,
  label,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: ReactElement;
  external?: boolean;
}) {
  return (
    <m.a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-4 py-2.5 text-sm font-medium text-[#3f3a37] transition dark:border-white/10 dark:bg-white/[0.05] dark:text-[#f1edeb]"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {icon}
      <span>{label}</span>
    </m.a>
  );
}
