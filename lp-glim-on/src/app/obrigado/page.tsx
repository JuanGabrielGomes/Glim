import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { Reveal } from "@/components/ui/Reveal";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { AGENCY_NAME, PRODUCT_NAME, site } from "@/content/site";
import { thanks } from "@/content/thanks";
import glimMark from "../../../public/brand/glim-mark-cream.png";

export const metadata: Metadata = {
  title: `${thanks.metaTitle} | ${PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  const { whatsappUrl, whatsappDisplay, bookingUrl } = site;
  const hasWhatsapp = Boolean(whatsappUrl && whatsappDisplay);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-glim-ink text-glim-cream">
      {/* Mesmo fundo do topo da página de vendas: grade, brilho dourado e granulado. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_20%,black_0%,transparent_70%)]" />
        <div className="absolute left-1/2 top-[-10rem] h-[34rem] w-[min(56rem,160%)] -translate-x-1/2 rounded-full bg-glim-gold/[0.16] blur-3xl" />
        <div className="grain absolute inset-0 opacity-40" />
      </div>

      <Container className="relative flex min-h-dvh max-w-3xl flex-col items-center py-10 text-center md:py-14">
        <Image src={glimMark} alt={AGENCY_NAME} className="h-6 w-auto opacity-90" priority />

        <div className="flex flex-1 flex-col items-center justify-center gap-8 py-10 md:gap-10">
          <Reveal className="space-y-6">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-glim-gold/30 bg-glim-gold/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-glim-gold">
              <Diamond className="h-2 w-2" />
              {thanks.badge}
            </p>
            <h1 className="flex items-end justify-center font-display text-[clamp(4.2rem,20vw,9.5rem)] font-normal leading-[0.85] tracking-[-0.06em]">
              {thanks.hero}
              <Diamond glow className="mb-[0.12em] ml-[0.06em] h-[0.2em] w-[0.2em]" />
            </h1>
            <p className="mx-auto max-w-xl text-balance font-display text-[1.45rem] leading-snug tracking-[-0.02em] md:text-[2rem]">
              {thanks.title}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="w-full space-y-4">
            <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-glim-cream/75 md:text-lg">
              {thanks.text}
            </p>
            <div className="pt-2">
              <Button
                href={bookingUrl || "#"}
                newTab={Boolean(bookingUrl)}
                glow
                className="w-full px-10 py-4 text-base sm:w-auto md:text-lg"
              >
                {thanks.button}
              </Button>
            </div>
            {bookingUrl ? null : <TodoNotice>{thanks.todos.booking}</TodoNotice>}
          </Reveal>

          <Reveal delay={0.16} className="w-full">
            <div className="gold-ring rounded-[1.75rem] bg-white/[0.03] p-5 text-left backdrop-blur-sm md:p-7">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-glim-gold">{thanks.stepsTitle}</p>
              <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
                {thanks.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4 md:flex-col md:gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-glim-gold/50 font-mono text-xs font-bold text-glim-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1">
                      <p className="font-display text-lg tracking-[-0.02em]">{step.title}</p>
                      <p className="text-sm leading-relaxed text-glim-cream/70">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          <p className="text-balance text-sm text-glim-cream/70">
            {thanks.supportEmail}
            {hasWhatsapp ? (
              <>
                {" "}
                {thanks.supportWhatsapp}{" "}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-glim-cream underline underline-offset-4 hover:text-glim-gold"
                >
                  {whatsappDisplay}
                </a>
              </>
            ) : null}
          </p>
          {hasWhatsapp ? null : <TodoNotice>{thanks.todos.whatsapp}</TodoNotice>}
        </div>
      </Container>
    </main>
  );
}
