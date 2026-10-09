import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Section } from "@/components/ui/Section";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { VslStage } from "@/components/video/VslStage";
import { landing } from "@/content/landing";
import { site } from "@/content/site";
import { resolveVsl } from "@/lib/vsl";

export function VideoSection() {
  const { note, placeholder, playLabel, iframeTitle, posterSrc } = landing.video;
  const { label, support } = landing.cta;
  const vsl = resolveVsl(site.vslProvider, site.vslUrl);

  const cta = (
    <div className="space-y-3 pt-4 md:pt-5">
      <CheckoutButton glow className="w-full sm:w-auto">
        {label}
      </CheckoutButton>
      <p className="font-mono text-[11px] leading-relaxed text-glim-light/70 md:text-xs">{support}</p>
      <p className="text-[11px] leading-relaxed text-glim-light/75 md:text-xs">{landing.deliveryNote}</p>
    </div>
  );

  return (
    <Section id="video" tone="dark" className="pb-12 pt-0 md:pb-20 md:pt-0">
      <div className="mx-auto max-w-3xl space-y-3 text-center md:space-y-0">
        <p className="font-mono text-[11px] text-glim-light/70 md:pb-5 md:text-xs">{note}</p>
        {vsl ? (
          <VslStage
            vsl={vsl}
            posterSrc={posterSrc}
            playLabel={playLabel}
            title={iframeTitle}
            revealSeconds={site.ctaRevealSeconds}
          >
            {cta}
          </VslStage>
        ) : (
          <>
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-glim-light/15 bg-glim-light/5 backdrop-blur">
              <span className="font-mono text-2xl tracking-widest text-glim-light/60">{placeholder}</span>
            </div>
            <div className="pt-3 text-left">
              <TodoNotice>{landing.todos.vsl}</TodoNotice>
            </div>
            {cta}
          </>
        )}
      </div>
    </Section>
  );
}
