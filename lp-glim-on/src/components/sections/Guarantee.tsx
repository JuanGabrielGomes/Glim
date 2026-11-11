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
    <Section tone={tone}>
      <Reveal className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        {/* Selo: o prazo legal em numeral serifado gigante, como o "4" do processo do site. */}
        <div aria-hidden="true" className="mx-auto text-center md:mx-0 md:text-left">
          <p className={cn("font-serif text-[9rem] italic leading-[0.75] tracking-[-0.06em] md:text-[12rem]", styles.accent)}>
            {seal.value}
          </p>
          <p className="meta mt-5">{seal.unit}</p>
          <p className={cn("meta mt-2 text-[10px] normal-case tracking-[0.06em]", styles.muted)}>{seal.caption}</p>
        </div>
        <div className="max-w-2xl space-y-6">
          <SectionTitle eyebrow={eyebrow} title={title} titleEmphasis={titleEmphasis} tone={tone} />
          <p className={cn("text-base leading-relaxed md:text-lg", styles.muted)}>{text}</p>
        </div>
      </Reveal>
    </Section>
  );
}
