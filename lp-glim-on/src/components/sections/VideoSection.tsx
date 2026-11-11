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

// Moldura facetada em volta do vídeo (o corte do canto é a assinatura da marca).
const RING = "faceta [--f:24px] bg-grafite-800 p-1.5 md:p-2";
const FRAME = "";

export function VideoSection() {
  const { note, placeholder, playLabel, pauseLabel, resumeLabel, iframeTitle, posterSrc, lockedHint } = landing.video;
  const { label, support } = landing.cta;
  const vsl = resolveVsl(site.vslProvider, site.vslUrl);
  // No YouTube, a capa é a miniatura do próprio vídeo; nos demais, o arquivo local.
  const poster = vsl?.provider === "youtube" ? `https://i.ytimg.com/vi/${vsl.source}/maxresdefault.jpg` : posterSrc;

  // Cartão da oferta que aparece embaixo do vídeo quando a página é liberada.
  const unlockCard = (
    <div className="mx-auto mt-6 max-w-xl md:mt-8">
      <div className="faceta animate-[glim-pop_0.6s_ease-out] bg-grafite-900 px-5 py-7 [--f:28px] md:px-8 md:py-9">
        <p className="meta inline-flex items-center gap-2 text-ambar-400">
          <Diamond className="h-2 w-2" />
          {landing.unlockOffer.badge}
        </p>
        <p className="mt-4 font-display text-lg tracking-[-0.02em] text-linho-050/85 md:text-xl">
          {landing.unlockOffer.lead}
        </p>
        <p className="mt-4 font-mono text-xs text-pedra-300">
          {landing.unlockOffer.previousBefore}{" "}
          <s className="decoration-ambar-400/70">{landing.unlockOffer.previousPrice}</s>
          {landing.unlockOffer.previousAfter}
        </p>
        <PriceDisplay className="mt-3" />
        <CheckoutButton className="mt-7 w-full px-9 py-4 text-base sm:w-auto md:text-lg">{label}</CheckoutButton>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-pedra-300 md:text-xs">{support}</p>
        <p className="mt-2 text-[11px] leading-relaxed text-pedra-300 md:text-xs">{landing.deliveryNote}</p>
      </div>
    </div>
  );

  const hint = (
    <p className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-2 font-mono text-[11px] text-pedra-300 md:text-xs">
      <Diamond className="h-2 w-2 animate-pulse" />
      {lockedHint}
    </p>
  );

  return (
    <section id="video" className="relative pb-8 text-linho-050 md:pb-20">
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="pb-3 font-mono text-[11px] text-pedra-300 md:pb-5 md:text-xs">{note}</p>
          {vsl ? (
            <VslStage
              vsl={vsl}
              posterSrc={poster}
              playLabel={playLabel}
              pauseLabel={pauseLabel}
              resumeLabel={resumeLabel}
              title={iframeTitle}
              unlockSeconds={site.unlockSeconds}
              autoplayMuted
              unmuteLabel={landing.video.unmuteLabel}
              wrapperClassName={RING}
              frameClassName={FRAME}
            />
          ) : (
            <>
              <div className={RING}>
                <div className={`flex aspect-video w-full items-center justify-center bg-grafite-900 ${FRAME}`}>
                  <span className="font-mono text-2xl tracking-widest text-pedra-300">{placeholder}</span>
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
