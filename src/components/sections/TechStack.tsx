'use client';

import { useReducedMotion } from 'framer-motion';
import { TECH_STACK } from '@/lib/content';

export function TechStack() {
  const reduceMotion = useReducedMotion() ?? false;
  const track = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <section aria-label="Stack técnica" className="border-y border-black/[0.06] py-6 dark:border-white/[0.06]">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className={`flex w-max items-center gap-10 px-4 ${reduceMotion ? '' : 'animate-marquee'}`}>
          {track.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex shrink-0 items-center gap-2">
              <span aria-hidden="true" className="bg-glim-diamond h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px]" />
              <span className="font-mono text-xs tracking-[0.14em] text-[#8a837d] uppercase dark:text-[#8d867f]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
