import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { Emphasis } from "@/components/ui/Emphasis";
import { landing } from "@/content/landing";

export function Hero() {
  const { kicker, title, titleEmphasis, subtitle } = landing.hero;

  return (
    <section className="relative text-linho-050">
      <Container className="relative pb-4 pt-10 md:pb-10 md:pt-16">
        <header className="mx-auto max-w-4xl space-y-4 text-center md:space-y-7">
          <p className="meta inline-flex items-center gap-2.5 text-[10px] text-ambar-400 sm:text-xs">
            <Diamond className="h-2 w-2" />
            {kicker}
          </p>
          <h1 className="mx-auto max-w-[20ch] text-balance font-display text-[clamp(1.85rem,7.4vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.05em]">
            <Emphasis text={title} emphasis={titleEmphasis} />
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-[0.95rem] leading-snug text-pedra-300 md:text-lg md:leading-relaxed">
            {subtitle}
          </p>
        </header>
      </Container>
    </section>
  );
}
