import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { landing } from "@/content/landing";

export function FinalCta() {
  const { title, titleEmphasis } = landing.finalCta;

  return (
    <section id="fechamento" className="relative bg-grafite-950 py-20 text-linho-050 md:py-32">
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl space-y-10 text-center">
          <Diamond className="mx-auto h-4 w-4" />
          <h2 className="text-balance font-display text-[clamp(2.1rem,7.5vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.05em]">
            <Emphasis text={title} emphasis={titleEmphasis} />
          </h2>
          <div className="space-y-4">
            <CheckoutButton className="w-full px-10 py-4 text-base sm:w-auto md:text-lg">
              {landing.cta.label}
            </CheckoutButton>
            <p className="font-mono text-[11px] leading-relaxed text-pedra-300 md:text-xs">{landing.cta.support}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
