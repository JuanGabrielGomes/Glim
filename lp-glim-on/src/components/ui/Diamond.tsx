import { cn } from "@/lib/utils";

interface DiamondProps {
  className?: string;
}

/** O losango da marca (o "ponto" do glim.). */
export function Diamond({ className }: DiamondProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      className={cn("inline-block h-2.5 w-2.5 shrink-0 fill-ambar-400", className)}
    >
      <path d="M6 0 12 6 6 12 0 6Z" />
    </svg>
  );
}
