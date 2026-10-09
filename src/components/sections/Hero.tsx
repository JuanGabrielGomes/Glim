import { Diamond } from "@/components/ui/Diamond";
import { Section } from "@/components/ui/Section";
import { landing } from "@/content/landing";

export function Hero() {
  const { kicker, title, subtitle } = landing.hero;

  return (
    <Section tone="dark" className="pb-3 pt-5 md:pb-8 md:pt-16">
      <header className="mx-auto max-w-3xl space-y-2 text-center md:space-y-4">
        <p className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wide text-glim-gold md:text-xs">
          <Diamond />
          {kicker}
        </p>
        <h1 className="font-display text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl">{title}</h1>
        <p className="text-sm leading-snug text-glim-light/75 md:text-lg">{subtitle}</p>
      </header>
    </Section>
  );
}
