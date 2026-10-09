import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface HowItWorksProps {
  tone: Tone;
}

export function HowItWorks({ tone }: HowItWorksProps) {
  const { title, steps, closing } = landing.howItWorks;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-4xl space-y-8">
        <Reveal>
          <SectionTitle title={title} />
        </Reveal>
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.lead}>
              <Reveal delay={index * 0.06} className={cn("h-full rounded-2xl border p-6", styles.line, styles.card)}>
                <span className="font-mono text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-base leading-relaxed md:text-lg">
                  <strong className="font-semibold">{step.lead}</strong>
                  {step.rest}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <p className={cn("text-base md:text-lg", styles.muted)}>{closing}</p>
        </Reveal>
      </div>
    </Section>
  );
}
