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
            "meta flex items-center gap-2.5",
            tone === "dark" ? "text-ambar-400" : "text-ambar-700",
            align === "center" && "justify-center",
          )}
        >
          <Diamond className={cn("h-2 w-2", tone === "dark" ? "fill-ambar-400" : "fill-ambar-700")} />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance font-display text-[clamp(2rem,7vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.045em]">
        <Emphasis text={title} emphasis={titleEmphasis} tone={tone} />
      </h2>
      {subtitle ? <p className="max-w-2xl text-base opacity-80 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
