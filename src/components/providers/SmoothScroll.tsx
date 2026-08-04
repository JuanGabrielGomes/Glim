'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion() ?? false;

  if (reduceMotion) {
    return children;
  }

  return (
    <ReactLenis root options={{ lerp: 0.11, duration: 1.1, smoothWheel: true, syncTouch: false }}>
      {children}
    </ReactLenis>
  );
}
