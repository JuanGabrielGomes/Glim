'use client';

import Image from 'next/image';
import { type PointerEvent, useRef } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

type BrowserMockupProps = {
  label: string;
  url: string;
  accent: string;
  background: string;
  imageSrc?: string;
  imagePosition?: string;
  reduceMotion: boolean;
  className?: string;
  variant?: 'card' | 'cinema';
};

const REST_ROTATE_X = 6;
const REST_ROTATE_Y = -8;

export function BrowserMockup({
  label,
  url,
  accent,
  background,
  imageSrc,
  imagePosition = '50% 50%',
  reduceMotion,
  className = '',
  variant = 'card',
}: BrowserMockupProps) {
  const isCinema = variant === 'cinema';
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateXValue = useMotionValue(REST_ROTATE_X);
  const rotateYValue = useMotionValue(REST_ROTATE_Y);
  const rotateX = useSpring(rotateXValue, { stiffness: 130, damping: 18, mass: 0.6 });
  const rotateY = useSpring(rotateYValue, { stiffness: 130, damping: 18, mass: 0.6 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateYValue.set(px * 18 - 8);
    rotateXValue.set(-py * 14 + 6);
  };

  const handlePointerLeave = () => {
    rotateXValue.set(REST_ROTATE_X);
    rotateYValue.set(REST_ROTATE_Y);
  };

  return (
    <div className={`relative [perspective:1800px] ${className}`}>
      {isCinema ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-50 blur-[80px]"
          style={{ backgroundColor: accent }}
        />
      ) : null}
      <m.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={
          isCinema
            ? 'relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_90px_180px_-60px_rgba(0,0,0,0.85)]'
            : 'relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_70px_140px_-60px_rgba(0,0,0,0.65)]'
        }
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]"
        />
        {isCinema ? null : (
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/45 px-4 py-2.5 backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-white/55">
              {url}
            </span>
          </div>
        )}
        <div
          className={isCinema ? 'relative aspect-[4/3] w-full sm:aspect-[16/11]' : 'relative aspect-[16/10] w-full'}
          style={{ background }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={label}
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          ) : (
            <PlaceholderScreen accent={accent} label={label} />
          )}
        </div>
      </m.div>
    </div>
  );
}

function PlaceholderScreen({ accent, label }: { accent: string; label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between overflow-hidden p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 right-[-20%] h-[70%] w-[70%] rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: accent }}
      />
      <div className="relative flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: accent }}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className="h-2 w-2 rotate-45 rounded-[2px]"
          style={{ backgroundColor: accent }}
        />
      </div>
      <div className="relative space-y-3">
        <div className="h-2.5 w-3/4 rounded-full bg-white/16" />
        <div className="h-2.5 w-1/2 rounded-full bg-white/10" />
      </div>
      <div className="relative flex items-end justify-between gap-3">
        <div className="flex gap-2">
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[9px] tracking-[0.14em] uppercase"
            style={{ backgroundColor: `${accent}26`, color: accent }}
          >
            Ver projeto
          </span>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-6 rounded-full" style={{ backgroundColor: accent }} />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}
