'use client';

import { m, type MotionValue } from 'framer-motion';

type BrandBackdropProps = {
  glowBackground: MotionValue<string>;
  gridOpacity: MotionValue<number>;
};

export function BrandBackdrop({ glowBackground, gridOpacity }: BrandBackdropProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#F9F8F6] dark:bg-[#14100E]" />
      <m.div className="absolute inset-0" style={{ opacity: gridOpacity }}>
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(74,70,67,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(74,70,67,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_50%_18%,black_0%,black_24%,transparent_78%)] dark:[background-image:linear-gradient(rgba(245,240,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,240,234,0.05)_1px,transparent_1px)]" />
      </m.div>
      <m.div
        className="absolute top-[6rem] left-[10%] h-[26rem] w-[26rem] rounded-full opacity-70 blur-3xl"
        style={{ backgroundImage: glowBackground }}
      />
      <div className="grain-overlay absolute inset-0 opacity-[0.5] dark:opacity-[0.35]" />
    </div>
  );
}
