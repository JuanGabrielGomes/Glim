import { cn } from "@/lib/utils";
import { Diamond } from "@/components/ui/Diamond";
import { Emphasis } from "@/components/ui/Emphasis";
import type { Tone } from "@/components/ui/Section";

interface SectionTitleProps {
  title: string;
  titleEmphasis?: string;
  eyebrow?: string;
  subtitle?: string;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  title,
  titleEmphasis,
  eyebrow,
  subtitle,
  tone = "dark",
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em]",
            tone === "dark" ? "text-glim-gold" : "text-glim-gold-deep",
            align === "center" && "justify-center",
          )}
        >
          <Diamond className="h-2 w-2" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance font-display text-[clamp(2rem,7vw,3.6rem)] font-normal leading-[1.02] tracking-[-0.045em]">
        <Emphasis text={title} emphasis={titleEmphasis} tone={tone} />
      </h2>
      {subtitle ? <p className="max-w-2xl text-base opacity-80 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
