import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface FaqProps {
  tone: Tone;
}

export function Faq({ tone }: FaqProps) {
  const { title, items } = landing.faq;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal>
          <SectionTitle title={title} />
        </Reveal>
        <Reveal className={cn("border-y", styles.line)}>
          {items.map((item) => (
            <details key={item.question} className={cn("group border-b last:border-b-0", styles.line)}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glim-gold md:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="font-mono text-xl leading-none">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className={cn("pb-5 text-base leading-relaxed", styles.muted)}>{item.answer}</p>
            </details>
          ))}
        </Reveal>
        <p className={cn("text-xs", styles.muted)}>{landing.deliveryNote}</p>
      </div>
    </Section>
  );
}
