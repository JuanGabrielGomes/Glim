import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface ProblemProps {
  tone: Tone;
}

export function Problem({ tone }: ProblemProps) {
  const { title, text, statLead, statRest, source } = landing.problem;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone}>
      <Reveal className="mx-auto max-w-3xl space-y-8">
        <SectionTitle title={title} />
        <p className="text-base leading-relaxed md:text-lg">{text}</p>
        <figure className={cn("rounded-2xl border p-6 md:p-8", styles.line, styles.card)}>
          <p className="text-lg leading-snug md:text-2xl">
            <span className="font-mono font-bold">{statLead}</span>
            {statRest}
          </p>
          <figcaption className={cn("mt-3 text-xs", styles.muted)}>{source}</figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
