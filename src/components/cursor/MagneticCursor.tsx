'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

function subscribeFinePointer(callback: () => void) {
  const mediaQuery = window.matchMedia('(pointer: fine)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia('(pointer: fine)').matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

function useHasFinePointer() {
  return useSyncExternalStore(subscribeFinePointer, getFinePointerSnapshot, getFinePointerServerSnapshot);
}

export function MagneticCursor() {
  const reduceMotion = useReducedMotion() ?? false;
  const hasFinePointer = useHasFinePointer();
  const isEnabled = hasFinePointer && !reduceMotion;
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.4 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;
    document.documentElement.classList.add('custom-cursor-active');

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setIsHovering(Boolean(target?.closest('a, button, [data-cursor-hover]')));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [isEnabled, x, y]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(242,183,123,0.9) 0%, rgba(242,183,123,0.35) 45%, transparent 72%)',
        }}
        animate={{ width: isHovering ? 64 : 26, height: isHovering ? 64 : 26 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      />
      <motion.span
        className="bg-glim-diamond absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_12px_2px_rgba(242,183,123,0.85)]"
        animate={{ width: isHovering ? 5 : 7, height: isHovering ? 5 : 7 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      />
    </motion.div>
  );
}
