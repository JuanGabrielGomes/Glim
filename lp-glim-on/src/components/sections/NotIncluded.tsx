import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

interface NotIncludedProps {
  tone: Tone;
}

export function NotIncluded({ tone }: NotIncludedProps) {
  const { eyebrow, title, intro, items, outro } = landing.notIncluded;
  const styles = toneStyles[tone];

  return (
    <Section tone={tone}>
      <Reveal className="max-w-3xl space-y-7">
        <SectionTitle eyebrow={eyebrow} title={title} tone={tone} />
        <p className={cn("text-base leading-relaxed md:text-lg", styles.muted)}>{intro}</p>
        <ul className="flex flex-wrap gap-2.5">
          {items.map((item) => (
            <li
              key={item}
              className={cn(
                "rounded-full border border-dashed px-4 py-2 font-mono text-xs md:text-[13px]",
                tone === "dark" ? "border-white/25 text-glim-cream/85" : "border-glim-dark/25 text-glim-ink2/85",
              )}
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-base leading-relaxed md:text-lg">{outro}</p>
      </Reveal>
    </Section>
  );
}
