import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  className?: string;
}

/** "12x de R$ 97" em destaque (com glow) e o preço à vista logo abaixo. */
export function PriceDisplay({ className }: PriceDisplayProps) {
  const { installments, installmentValue, installmentNote, cash } = landing.offer;

  return (
    <div className={cn("text-center", className)}>
      <p className="flex items-baseline justify-center gap-2 font-mono font-bold leading-none tracking-[-0.04em] text-glim-gold">
        <span className="text-[1.6rem] md:text-[2rem]">{installments}</span>
        <span className="text-[1.1rem] font-normal text-glim-cream/70 md:text-[1.3rem]">de</span>
        <span className="text-[3.6rem] [text-shadow:0_0_36px_rgba(242,183,123,0.5)] md:text-[4.6rem]">
          {installmentValue}
        </span>
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-glim-cream/70">{installmentNote}</p>
      <p className="mt-4 font-mono text-base text-glim-cream md:text-lg">{cash}</p>
    </div>
  );
}
