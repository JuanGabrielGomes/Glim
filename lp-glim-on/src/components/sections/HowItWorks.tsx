import { Reveal } from "@/components/ui/Reveal";
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
    <Section tone={tone} glow="left">
      <div className="space-y-12">
        <Reveal>
          <SectionTitle eyebrow={eyebrow} title={title} titleEmphasis={titleEmphasis} tone={tone} />
        </Reveal>

        <ol className="relative grid gap-4 md:grid-cols-4 md:gap-5">
          {/* Linha que costura os passos: vertical no celular, horizontal no desktop. */}
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[2.6rem] top-8 w-px bg-gradient-to-b from-glim-gold/70 via-glim-gold/25 to-transparent md:bottom-auto md:left-8 md:right-8 md:top-[2.85rem] md:h-px md:w-auto md:bg-gradient-to-r"
          />
          {steps.map((step, index) => (
            <li key={step.lead} className="relative">
              <Reveal
                delay={index * 0.07}
                className={cn("flex h-full gap-5 rounded-3xl p-5 md:flex-col md:gap-6 md:p-6", styles.card)}
              >
                <span
                  className={cn(
                    "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-bold",
                    tone === "dark"
                      ? "border-glim-gold/50 bg-glim-cinema text-glim-gold"
                      : "border-glim-gold-deep/40 bg-glim-light text-glim-gold-deep",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-3">
                  <p className="text-base leading-relaxed md:text-[1.05rem]">
                    <strong className="font-display text-lg font-normal tracking-[-0.02em] md:text-xl">
                      {step.lead}
                    </strong>
                    {step.rest}
                  </p>
                  {stepTags[index] ? (
                    <span
                      className={cn(
                        "inline-block rounded-full border px-2.5 py-1 font-mono text-[10.5px]",
                        tone === "dark"
                          ? "border-glim-gold/30 text-glim-gold"
                          : "border-glim-gold-deep/30 text-glim-gold-deep",
                      )}
                    >
                      {stepTags[index]}
                    </span>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="max-w-2xl border-l-2 border-glim-gold/60 pl-5 font-display text-xl leading-snug tracking-[-0.02em] md:text-2xl">
            {closing}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
