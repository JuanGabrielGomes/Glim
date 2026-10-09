import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Diamond } from "@/components/ui/Diamond";
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
  const { title, items, comparison, price, condition, spotsLabel } = landing.offer;
  const styles = toneStyles[tone];

  return (
    <Section id="oferta" tone={tone}>
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-14">
        <Reveal className="space-y-6">
          <SectionTitle title={title} />
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-snug md:text-lg">
                <Diamond className="mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={cn("border-t pt-5 text-sm md:text-base", styles.line, styles.muted)}>{comparison}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-5 rounded-3xl border border-glim-gold/30 bg-glim-dark p-7 text-center text-glim-light md:p-8">
            <p className="font-mono text-5xl font-bold text-glim-gold [text-shadow:0_0_24px_rgba(240,168,85,0.45)] md:text-6xl">
              {price}
            </p>
            <p className="font-mono text-sm text-glim-light/80 first-letter:uppercase">{condition}</p>
            {site.spotsAvailable !== null ? (
              <p className="font-mono text-sm text-glim-light">{spotsLabel(site.spotsAvailable)}</p>
            ) : (
              <TodoNotice>{landing.todos.spots}</TodoNotice>
            )}
            <CheckoutButton className="w-full">{landing.cta.label}</CheckoutButton>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
