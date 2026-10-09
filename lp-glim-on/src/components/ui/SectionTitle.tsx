import { cn } from "@/lib/utils";
import { Diamond } from "@/components/ui/Diamond";

interface SectionTitleProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({ title, eyebrow, subtitle, align = "left", className }: SectionTitleProps) {
  return (
    <div className={cn("space-y-3", align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-2 font-mono text-xs tracking-wide",
            align === "center" && "justify-center",
          )}
        >
          <Diamond />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-2xl font-normal tracking-[-0.04em] leading-tight md:text-4xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-base opacity-80 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
