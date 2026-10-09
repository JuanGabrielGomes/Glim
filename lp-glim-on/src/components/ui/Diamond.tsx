import { cn } from "@/lib/utils";

interface DiamondProps {
  className?: string;
  glow?: boolean;
}

export function Diamond({ className, glow = false }: DiamondProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "inline-block h-2.5 w-2.5 shrink-0 fill-glim-gold",
        glow && "drop-shadow-[0_0_6px_rgba(242,183,123,0.7)]",
        className,
      )}
    >
      <path d="M6 0 12 6 6 12 0 6Z" />
    </svg>
  );
}
