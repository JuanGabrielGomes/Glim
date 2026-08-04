'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { ABOUT, CONTACT_WHATSAPP_HREF } from '@/lib/content';
import { FADE_UP, STAGGER, VIEWPORT } from '@/lib/motion';

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="dark relative flex min-h-[100dvh] items-center overflow-hidden bg-[#0f0c0a]"
    >
      <Image
        src={ABOUT.photoSrc}
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="object-cover"
        style={{ objectPosition: 'left center' }}
        priority={false}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_22%,rgba(15,12,10,0.68)_42%,rgba(15,12,10,0.96)_70%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0f0c0a] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f0c0a] to-transparent" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10">
        <m.div
          className="ml-auto max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={STAGGER}
        >
          <m.p
            variants={FADE_UP}
            className="font-mono text-[10px] tracking-[0.32em] text-[#b7ada2] uppercase sm:text-xs"
          >
            Quem constrói: {ABOUT.name}
          </m.p>

          <m.h2
            id="sobre-title"
            variants={FADE_UP}
            className="font-google mt-6 max-w-2xl text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.1] tracking-[-0.045em] text-[#f7f3ee]"
          >
            {ABOUT.lead}
          </m.h2>

          <m.p variants={FADE_UP} className="mt-6 max-w-2xl text-base leading-7 text-[#d9d3cc] sm:text-lg sm:leading-8">
            {ABOUT.bio}
          </m.p>

          <m.ul variants={FADE_UP} className="mt-7 flex max-w-2xl flex-wrap gap-2" aria-label="Formação e atuação">
            {ABOUT.credentials.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-white/65 uppercase"
              >
                {item}
              </li>
            ))}
          </m.ul>

          <m.a
            variants={FADE_UP}
            href={CONTACT_WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#d9d3cc] underline decoration-[#f2c48f]/40 underline-offset-4 transition hover:text-white"
            whileHover={{ y: -1 }}
          >
            Falar comigo direto
          </m.a>
        </m.div>
      </div>
    </section>
  );
}
