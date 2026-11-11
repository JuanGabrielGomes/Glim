import { Reveal } from "@/components/ui/Reveal";
import { withFootnote } from "@/components/ui/Footnote";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface HowItWorksProps {
  tone: Tone;
}

export function HowItWorks({ tone }: HowItWorksProps) {
  const { eyebrow, title, titleEmphasis, steps, stepTags, closing } = landing.howItWorks;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone}>
      <div className="space-y-12">
        <Reveal>
          <SectionTitle eyebrow={eyebrow} title={title} titleEmphasis={titleEmphasis} tone={tone} />
        </Reveal>

        <ol className={cn("grid gap-x-6 gap-y-2 border-t md:grid-cols-4", styles.line)}>
          {steps.map((step, index) => (
            <li key={step.lead} className="relative">
              <Reveal delay={index * 0.07} className="flex h-full gap-5 py-6 md:flex-col md:gap-5 md:py-8">
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-12 shrink-0 font-serif text-[3.2rem] italic leading-[0.8] md:w-auto md:text-[4.4rem]",
                    styles.accent,
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-3">
                  <p className="text-base leading-relaxed md:text-[1.05rem]">
                    <strong className="font-display text-lg font-medium tracking-[-0.02em] md:text-xl">
                      {step.lead}
                    </strong>
                    {step.rest}
                  </p>
                  {stepTags[index] ? (
                    <span className={cn("meta inline-block border px-2.5 py-1 text-[10px]", styles.line, styles.muted)}>
                      {withFootnote(stepTags[index])}
                    </span>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="max-w-2xl font-display text-xl leading-snug tracking-[-0.02em] md:text-2xl">{closing}</p>
        </Reveal>
      </div>
    </Section>
  );
}
