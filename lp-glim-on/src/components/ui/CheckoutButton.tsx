"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { trackCheckoutClick } from "@/lib/analytics";
import { withAttribution } from "@/lib/attribution";

interface CheckoutButtonProps {
  children: React.ReactNode;
  className?: string;
}

/** Botão de compra: abre o checkout na mesma aba, com a origem da visita, e dispara o evento personalizado CliqueCheckout (o InitiateCheckout vem da Kiwify). */
export function CheckoutButton({ children, className }: CheckoutButtonProps) {
  const [href, setHref] = useState(site.checkoutUrl);

  useEffect(() => {
    setHref(withAttribution(site.checkoutUrl));
  }, []);

  return (
    <Button href={href} className={className} onClick={trackCheckoutClick}>
      {children}
    </Button>
  );
}
