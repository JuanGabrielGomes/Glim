import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { Emphasis } from "@/components/ui/Emphasis";
import { landing } from "@/content/landing";

export function Hero() {
  const { kicker, title, titleEmphasis, subtitle } = landing.hero;

  return (
    <section className="relative text-glim-cream">
      <Container className="relative pb-4 pt-5 md:pb-10 md:pt-16">
        <header className="mx-auto max-w-4xl space-y-3 text-center md:space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-glim-gold/30 bg-glim-gold/10 px-3 py-1 font-mono text-[10px] tracking-[-0.01em] sm:text-[11px] text-glim-gold md:px-4 md:text-xs">
            <Diamond className="h-2 w-2" />
            {kicker}
          </p>
          <h1 className="mx-auto max-w-[20ch] text-balance font-display text-[clamp(1.85rem,7.4vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.05em]">
            <Emphasis text={title} emphasis={titleEmphasis} />
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-[0.92rem] leading-snug text-glim-cream/75 md:text-lg md:leading-relaxed">
            {subtitle}
          </p>
        </header>
      </Container>
    </section>
  );
}
