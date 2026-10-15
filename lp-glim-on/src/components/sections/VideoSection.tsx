import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { Locked } from "@/components/video/Unlock";
import { VslStage } from "@/components/video/VslStage";
import { landing } from "@/content/landing";
import { site } from "@/content/site";
import { resolveVsl } from "@/lib/vsl";

const RING = "gold-ring rounded-[1.25rem] p-1.5 shadow-glow-lg md:rounded-[1.75rem] md:p-2";
const FRAME = "rounded-[0.95rem] md:rounded-[1.3rem]";

export function VideoSection() {
  const { note, placeholder, playLabel, pauseLabel, resumeLabel, iframeTitle, posterSrc, lockedHint } = landing.video;
  const { label, support } = landing.cta;
  const vsl = resolveVsl(site.vslProvider, site.vslUrl);
  // No YouTube, a capa é a miniatura do próprio vídeo; nos demais, o arquivo local.
  const poster = vsl?.provider === "youtube" ? `https://i.ytimg.com/vi/${vsl.source}/maxresdefault.jpg` : posterSrc;

  // Cartão da oferta que aparece embaixo do vídeo quando a página é liberada.
  const unlockCard = (
    <div className="mx-auto mt-6 max-w-xl md:mt-8">
      <div className="gold-ring animate-[glim-pop_0.6s_ease-out] rounded-[1.75rem] bg-glim-cinema/80 px-5 py-7 backdrop-blur-sm md:px-8 md:py-9">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-glim-gold/40 bg-glim-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-glim-gold">
          <Diamond className="h-2 w-2" />
          {landing.unlockOffer.badge}
        </p>
        <p className="mt-4 font-display text-lg tracking-[-0.02em] text-glim-cream/85 md:text-xl">
          {landing.unlockOffer.lead}
        </p>
        <PriceDisplay className="mt-4" />
        <CheckoutButton glow className="mt-7 w-full px-9 py-4 text-base sm:w-auto md:text-lg">
          {label}
        </CheckoutButton>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-glim-cream/70 md:text-xs">{support}</p>
        <p className="mt-2 text-[11px] leading-relaxed text-glim-cream/70 md:text-xs">{landing.deliveryNote}</p>
      </div>
    </div>
  );

  const hint = (
    <p className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-2 font-mono text-[11px] text-glim-cream/70 md:text-xs">
      <Diamond className="h-2 w-2 animate-pulse" />
      {lockedHint}
    </p>
  );

  return (
    <section id="video" className="relative pb-8 text-glim-cream md:pb-20">
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="pb-3 font-mono text-[11px] text-glim-cream/70 md:pb-5 md:text-xs">{note}</p>
          {vsl ? (
            <VslStage
              vsl={vsl}
              posterSrc={poster}
              playLabel={playLabel}
              pauseLabel={pauseLabel}
              resumeLabel={resumeLabel}
              title={iframeTitle}
              unlockSeconds={site.unlockSeconds}
              wrapperClassName={RING}
              frameClassName={FRAME}
            />
          ) : (
            <>
              <div className={RING}>
                <div className={`flex aspect-video w-full items-center justify-center bg-white/[0.04] ${FRAME}`}>
                  <span className="font-mono text-2xl tracking-widest text-glim-cream/60">{placeholder}</span>
                </div>
              </div>
              <div className="pt-3 text-left">
                <TodoNotice>{landing.todos.vsl}</TodoNotice>
              </div>
            </>
          )}
          <Locked fallback={hint}>{unlockCard}</Locked>
        </div>
      </Container>
    </section>
  );
}
