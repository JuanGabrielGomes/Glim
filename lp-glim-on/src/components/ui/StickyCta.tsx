"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckoutButton } from "@/components/ui/CheckoutButton";

interface StickyCtaProps {
  label: string;
  /** Id da seção do vídeo: o botão aparece depois que ela sai da tela por cima. */
  afterId: string;
  /** Ids de seções em que o botão some (Offer e FinalCta já têm CTA próprio). */
  hideIds: readonly string[];
}

export function StickyCta({ label, afterId, hideIds }: StickyCtaProps) {
  const [passed, setPassed] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const after = document.getElementById(afterId);
    const targets = hideIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const onScreen = new Set<Element>();

    const afterObserver = new IntersectionObserver(([entry]) => {
      setPassed(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    const hideObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      });
      setBlocked(onScreen.size > 0);
    });

    if (after) afterObserver.observe(after);
    targets.forEach((el) => hideObserver.observe(el));

    return () => {
      afterObserver.disconnect();
      hideObserver.disconnect();
    };
  }, [afterId, hideIds]);

  return (
    <AnimatePresence>
      {passed && !blocked ? (
        <motion.div
          key="sticky-cta"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-glim-light/10 bg-glim-dark/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
        >
          <CheckoutButton className="w-full">{label}</CheckoutButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
