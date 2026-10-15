import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";
import { landing } from "@/content/landing";

export function FinalCta() {
  const { title, titleEmphasis } = landing.finalCta;

  return (
    <section id="fechamento" className="relative overflow-hidden bg-glim-ink py-20 text-glim-cream md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_100%,black_0%,transparent_70%)]" />
        <div className="absolute bottom-[-12rem] left-1/2 h-[30rem] w-[min(56rem,150%)] -translate-x-1/2 rounded-full bg-glim-gold/[0.18] blur-3xl" />
        <div className="grain absolute inset-0 opacity-40" />
      </div>
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl space-y-10 text-center">
          <Diamond glow className="mx-auto h-5 w-5" />
          <h2 className="text-balance font-display text-[clamp(2.1rem,7.5vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.05em]">
            <Emphasis text={title} emphasis={titleEmphasis} />
          </h2>
          <div className="space-y-4">
            <CheckoutButton glow className="w-full px-10 py-4 text-base sm:w-auto md:text-lg">
              {landing.cta.label}
            </CheckoutButton>
            <p className="font-mono text-[11px] leading-relaxed text-glim-cream/70 md:text-xs">{landing.cta.support}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
