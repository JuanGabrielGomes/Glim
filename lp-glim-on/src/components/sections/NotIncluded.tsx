import { Reveal } from "@/components/ui/Reveal";
import { Section, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { landing } from "@/content/landing";

interface NotIncludedProps {
  tone: Tone;
}

export function NotIncluded({ tone }: NotIncludedProps) {
  const { title, text } = landing.notIncluded;

  return (
    <Section tone={tone}>
      <Reveal className="mx-auto max-w-3xl space-y-5">
        <SectionTitle title={title} />
        <p className="text-base leading-relaxed md:text-lg">{text}</p>
      </Reveal>
    </Section>
  );
}
