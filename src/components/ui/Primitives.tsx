'use client';

import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { FADE_UP, STAGGER, VIEWPORT } from '@/lib/motion';

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.05]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-[#8a837d] uppercase dark:text-[#bab4af]">
        {label}
      </p>
      <p className="font-google mt-2 text-xl tracking-[-0.04em] text-[#2f2b28] dark:text-[#fbfaf8]">
        {value}
      </p>
    </div>
  );
}

export function CaseDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.05] p-4">
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#d8ccb9]/72">{label}</p>
      <p className="font-google mt-2 text-lg tracking-[-0.04em] text-[#f7efe4]">{value}</p>
    </div>
  );
}

export function FitPill({ children }: { children: string }) {
  return (
    <li className="rounded-full bg-black/[0.045] px-3 py-2 font-mono text-[11px] tracking-[0.18em] text-[#6a635e] uppercase dark:bg-white/[0.06] dark:text-[#d8d2ce]">
      {children}
    </li>
  );
}

export function HeadingAccent({ children }: { children: ReactNode }) {
  return (
    <span className="font-sans font-semibold tracking-[-0.038em] text-[#8f6238] dark:text-[#f2c48f]">
      {children}
    </span>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  mobileDescription,
  titleId,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  mobileDescription?: string;
  titleId: string;
}) {
  return (
    <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={STAGGER}>
      <div className="flex items-center gap-4">
        <m.p
          variants={FADE_UP}
          className="font-mono text-xs tracking-[0.28em] text-[#7f7872] uppercase dark:text-[#bdb6b0]"
        >
          {eyebrow}
        </m.p>
        <m.span variants={FADE_UP} className="h-px w-16 bg-black/[0.12] dark:bg-white/12" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-start">
        <m.h2
          id={titleId}
          variants={FADE_UP}
          className="font-google max-w-4xl text-[clamp(2rem,4vw,4rem)] leading-[1.02] tracking-[-0.06em] text-[#2f2b28] dark:text-[#fbfaf8]"
        >
          {title}
        </m.h2>
        <m.div
          variants={FADE_UP}
          className="hidden border-l border-black/[0.08] pl-4 font-mono text-[10px] tracking-[0.22em] text-[#8b847e] uppercase lg:block dark:border-white/10 dark:text-[#bdb6b0]"
        >
          GLIM / {eyebrow}
        </m.div>
      </div>
      <m.p
        variants={FADE_UP}
        className="mt-6 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8 text-[#5d5753] dark:text-[#d9d3ce]"
      >
        <span className="sm:hidden">{mobileDescription ?? description}</span>
        <span className="hidden sm:inline">{description}</span>
      </m.p>
    </m.div>
  );
}
