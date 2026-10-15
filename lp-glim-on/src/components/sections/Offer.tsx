import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Diamond } from "@/components/ui/Diamond";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Reveal } from "@/components/ui/Reveal";
import { Section, toneStyles, type Tone } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { landing } from "@/content/landing";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

interface OfferProps {
  tone: Tone;
}

export function Offer({ tone }: OfferProps) {
  const { eyebrow, title, titleEmphasis, items, comparison, spotsLabel } = landing.offer;
  const styles = toneStyles[tone];

  return (
    <Section id="oferta" tone={tone} glow="right">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
        <Reveal className="space-y-8">
          <SectionTitle eyebrow={eyebrow} title={title} titleEmphasis={titleEmphasis} tone={tone} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className={cn("flex gap-3 rounded-2xl p-4 text-[0.95rem] leading-snug", styles.card)}>
                <Diamond className="mt-1.5 h-2.5 w-2.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="gold-ring rounded-[2rem] bg-glim-ink p-7 text-center text-glim-cream shadow-glow-lg md:p-10">
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-glim-cream/70">{comparison}</p>
            <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <PriceDisplay />
            {site.spotsAvailable !== null ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-glim-gold/30 px-3 py-1 font-mono text-xs text-glim-gold">
                <Diamond className="h-2 w-2" />
                {spotsLabel(site.spotsAvailable)}
              </p>
            ) : (
              <div className="mt-5 text-left">
                <TodoNotice>{landing.todos.spots}</TodoNotice>
              </div>
            )}
            <CheckoutButton className="mt-7 w-full py-4 text-base md:text-lg">{landing.cta.label}</CheckoutButton>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-glim-cream/70">{landing.cta.support}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
