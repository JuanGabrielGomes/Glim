import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section, type Tone } from "@/components/ui/Section";
import { landing } from "@/content/landing";

interface FinalCtaProps {
  tone: Tone;
}

export function FinalCta({ tone }: FinalCtaProps) {
  return (
    <Section id="fechamento" tone={tone}>
      <Reveal className="mx-auto max-w-3xl space-y-8 text-center">
        <h2 className="font-display text-2xl font-semibold leading-tight md:text-4xl">{landing.finalCta.title}</h2>
        <CheckoutButton glow className="w-full sm:w-auto">
          {landing.cta.label}
        </CheckoutButton>
      </Reveal>
    </Section>
  );
}
