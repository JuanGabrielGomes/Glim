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
    <Section tone={tone} glow="right">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <Reveal>
          <SectionTitle eyebrow={eyebrow} title={title} tone={tone} className="md:sticky md:top-24" />
        </Reveal>
        <Reveal className="space-y-3">
          {items.map((item) => (
            <details key={item.question} className={cn("group rounded-2xl", styles.card)}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-5 font-display text-[1.05rem] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glim-gold md:px-6 md:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-lg leading-none transition-transform duration-200 group-open:rotate-45",
                    tone === "dark"
                      ? "border-glim-gold/40 text-glim-gold"
                      : "border-glim-gold-deep/40 text-glim-gold-deep",
                  )}
                >
                  +
                </span>
              </summary>
              <p className={cn("px-5 pb-5 text-base leading-relaxed md:px-6", styles.muted)}>{item.answer}</p>
            </details>
          ))}
          <p className={cn("pt-2 text-xs", styles.muted)}>{landing.deliveryNote}</p>
        </Reveal>
      </div>
    </Section>
  );
}
