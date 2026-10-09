import { Diamond } from "@/components/ui/Diamond";
import { Reveal } from "@/components/ui/Reveal";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";

interface GuaranteeProps {
  tone: Tone;
}

export function Guarantee({ tone }: GuaranteeProps) {
  const { title, text } = landing.guarantee;

  return (
    <Section tone={tone}>
      <Reveal className="mx-auto max-w-3xl space-y-5">
        <Diamond className="h-4 w-4" />
        <SectionTitle title={title} />
        <p className="text-base leading-relaxed md:text-lg">{text}</p>
      </Reveal>
    </Section>
  );
}
