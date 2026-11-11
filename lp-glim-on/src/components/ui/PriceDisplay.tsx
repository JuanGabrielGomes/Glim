import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  className?: string;
}

/** "12x de R$ 97" em destaque e o preço à vista logo abaixo. */
export function PriceDisplay({ className }: PriceDisplayProps) {
  const { installments, installmentValue, installmentNote, cash } = landing.offer;

  return (
    <div className={cn("text-center", className)}>
      <p className="flex items-baseline justify-center gap-2 leading-none text-ambar-400">
        <span className="font-mono text-[1.4rem] font-medium md:text-[1.7rem]">{installments}</span>
        <span className="font-mono text-[1rem] text-pedra-300 md:text-[1.15rem]">de</span>
        <span className="font-display text-[3.8rem] font-semibold tracking-[-0.06em] md:text-[4.8rem]">
          {installmentValue}
        </span>
      </p>
      <p className="meta mt-3 text-pedra-300">{installmentNote}</p>
      <p className="mt-4 font-mono text-base text-linho-050 md:text-lg">{cash}</p>
    </div>
  );
}
