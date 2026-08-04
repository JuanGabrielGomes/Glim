import type { Variants } from 'framer-motion';

export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const SPRING = { type: 'spring', stiffness: 150, damping: 24, mass: 0.8 } as const;

export const SNAPPY_SPRING = {
  type: 'spring',
  stiffness: 320,
  damping: 26,
  mass: 0.6,
} as const;

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: SPRING },
};

export const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

export const WORD_PARENT: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.14 } },
};

export const WORD_CHILD: Variants = {
  hidden: { opacity: 0, y: '0.85em', filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 180, damping: 22, mass: 0.7 },
  },
};
