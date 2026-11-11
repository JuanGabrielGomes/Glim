import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface FaqProps {
  tone: Tone;
}

export function Faq({ tone }: FaqProps) {
  const { eyebrow, title, items } = landing.faq;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone}>
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <Reveal>
          <SectionTitle eyebrow={eyebrow} title={title} tone={tone} className="md:sticky md:top-24" />
        </Reveal>
        <Reveal>
          <div className={cn("border-t", styles.line)}>
            {items.map((item) => (
              <details key={item.question} className={cn("group border-b", styles.line)}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.05rem] font-medium tracking-[-0.02em] md:text-lg [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-2xl font-normal leading-none transition-transform duration-200 group-open:rotate-45",
                      styles.accent,
                    )}
                  >
                    +
                  </span>
                </summary>
                <p className={cn("max-w-[40em] pb-6 text-base leading-relaxed", styles.muted)}>{item.answer}</p>
              </details>
            ))}
          </div>
          <p className={cn("pt-4 text-xs", styles.muted)}>{landing.deliveryNote}</p>
        </Reveal>
      </div>
    </Section>
  );
}
