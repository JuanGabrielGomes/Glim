import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface GuaranteeProps {
  tone: Tone;
}

export function Guarantee({ tone }: GuaranteeProps) {
  const { eyebrow, title, titleEmphasis, text, seal } = landing.guarantee;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone} glow="left">
      <Reveal className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        {/* Selo: losango com o prazo legal. */}
        <div aria-hidden="true" className="relative mx-auto flex h-52 w-52 items-center justify-center md:h-64 md:w-64">
          <div
            className={cn(
              "absolute h-36 w-36 rotate-45 rounded-[1.6rem] md:h-44 md:w-44",
              styles.card,
              tone === "dark" ? "border-glim-gold/50" : "border-glim-gold-deep/40",
            )}
          />
          <div className="relative text-center">
            <p className={cn("font-mono text-[4.5rem] font-bold leading-none tracking-[-0.06em] md:text-[5.5rem]", styles.accent)}>
              {seal.value}
            </p>
            <p className="font-mono text-sm uppercase tracking-[0.3em]">{seal.unit}</p>
            <p className={cn("mt-2 font-mono text-[10px] tracking-[0.12em]", styles.muted)}>{seal.caption}</p>
          </div>
        </div>
        <div className="max-w-2xl space-y-6">
          <SectionTitle eyebrow={eyebrow} title={title} titleEmphasis={titleEmphasis} tone={tone} />
          <p className={cn("text-base leading-relaxed md:text-lg", styles.muted)}>{text}</p>
        </div>
      </Reveal>
    </Section>
  );
}
