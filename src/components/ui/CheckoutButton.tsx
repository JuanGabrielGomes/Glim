"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { trackInitiateCheckout } from "@/lib/analytics";
import { withAttribution } from "@/lib/attribution";

interface CheckoutButtonProps {
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

/** Botão de compra: abre o checkout na mesma aba, com a origem da visita, e dispara InitiateCheckout. */
export function CheckoutButton({ children, glow, className }: CheckoutButtonProps) {
  const [href, setHref] = useState(site.checkoutUrl);

  useEffect(() => {
    setHref(withAttribution(site.checkoutUrl));
  }, []);

  return (
    <Button href={href} glow={glow} className={className} onClick={trackInitiateCheckout}>
      {children}
    </Button>
  );
}
