import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Container } from "@/components/ui/Container";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { VslStage } from "@/components/video/VslStage";
import { landing } from "@/content/landing";
import { site } from "@/content/site";
import { resolveVsl } from "@/lib/vsl";

const RING = "gold-ring rounded-[1.25rem] p-1.5 shadow-glow-lg md:rounded-[1.75rem] md:p-2";
const FRAME = "rounded-[0.95rem] md:rounded-[1.3rem]";

export function VideoSection() {
  const { note, placeholder, playLabel, iframeTitle, posterSrc } = landing.video;
  const { label, support } = landing.cta;
  const vsl = resolveVsl(site.vslProvider, site.vslUrl);
  // No YouTube, a capa é a miniatura do próprio vídeo; nos demais, o arquivo local.
  const poster = vsl?.provider === "youtube" ? `https://i.ytimg.com/vi/${vsl.source}/maxresdefault.jpg` : posterSrc;

  const cta = (
    <div className="space-y-3 pt-5 md:pt-8">
      <CheckoutButton glow className="w-full px-9 py-4 text-base sm:w-auto md:text-lg">
        {label}
      </CheckoutButton>
      <p className="font-mono text-[11px] leading-relaxed text-glim-cream/70 md:text-xs">{support}</p>
      <p className="text-[11px] leading-relaxed text-glim-cream/70 md:text-xs">{landing.deliveryNote}</p>
    </div>
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
              title={iframeTitle}
              revealSeconds={site.ctaRevealSeconds}
              wrapperClassName={RING}
              frameClassName={FRAME}
            >
              {cta}
            </VslStage>
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
              {cta}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
