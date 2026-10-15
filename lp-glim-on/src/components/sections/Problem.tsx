import { Diamond } from "@/components/ui/Diamond";
import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface ProblemProps {
  tone: Tone;
}

// Infográfico do dado "4 em cada 10": 10 losangos, 4 preenchidos.
const STAT_FILLED = 4;
const STAT_TOTAL = 10;

export function Problem({ tone }: ProblemProps) {
  const { eyebrow, title, titleEmphasis, text, statLead, statRest, source } = landing.problem;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone} glow="right">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
        <Reveal className="space-y-6">
          <SectionTitle eyebrow={eyebrow} title={title} titleEmphasis={titleEmphasis} tone={tone} />
          <p className={cn("max-w-xl text-base leading-relaxed md:text-lg", styles.muted)}>{text}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className={cn("rounded-[1.75rem] p-7 md:p-9", styles.card)}>
            <div aria-hidden="true" className="flex flex-wrap gap-2.5 md:gap-3">
              {Array.from({ length: STAT_TOTAL }, (_, i) => (
                <Diamond
                  key={i}
                  className={cn(
                    "h-5 w-5 md:h-6 md:w-6",
                    i < STAT_FILLED
                      ? tone === "dark"
                        ? "fill-glim-gold"
                        : "fill-glim-gold-deep"
                      : "fill-current opacity-15",
                  )}
                />
              ))}
            </div>
            <p className="mt-7 text-xl leading-snug tracking-[-0.01em] md:text-2xl">
              <span className={cn("font-mono font-bold", styles.accent)}>{statLead}</span>
              {statRest}
            </p>
            <figcaption className={cn("mt-4 font-mono text-[11px]", styles.muted)}>{source}</figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
