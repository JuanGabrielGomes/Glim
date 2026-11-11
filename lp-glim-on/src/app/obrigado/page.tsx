import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { Reveal } from "@/components/ui/Reveal";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { AGENCY_NAME, PRODUCT_NAME, site } from "@/content/site";
import { thanks } from "@/content/thanks";

export const metadata: Metadata = {
  title: `${thanks.metaTitle} | ${PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  const { whatsappUrl, whatsappDisplay, bookingUrl } = site;
  const hasWhatsapp = Boolean(whatsappUrl && whatsappDisplay);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-grafite-950 text-linho-050">
      <Container className="relative flex min-h-dvh max-w-3xl flex-col items-center py-10 text-center md:py-14">
        <Image src="/brand/glim-logo-linho.svg" alt={AGENCY_NAME} width={1874} height={995} className="h-9 w-auto" priority />

        <div className="flex flex-1 flex-col items-center justify-center gap-8 py-10 md:gap-10">
          <Reveal className="space-y-6">
            <p className="meta mx-auto inline-flex items-center gap-2 text-ambar-400">
              <Diamond className="h-2 w-2" />
              {thanks.badge}
            </p>
            <h1 className="mega flex items-end justify-center text-[clamp(3rem,15vw,8.5rem)]">
              {thanks.hero}
              <Diamond className="mb-[0.12em] ml-[0.06em] h-[0.2em] w-[0.2em]" />
            </h1>
            <p className="mx-auto max-w-xl text-balance font-display text-[1.45rem] font-medium leading-snug tracking-[-0.03em] md:text-[2rem]">
              {thanks.title}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="w-full space-y-4">
            <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-pedra-300 md:text-lg">
              {thanks.text}
            </p>
            <div className="pt-2">
              <Button
                href={bookingUrl || "#"}
                newTab={Boolean(bookingUrl)}
                className="w-full px-10 py-4 text-base sm:w-auto md:text-lg"
              >
                {thanks.button}
              </Button>
            </div>
            {bookingUrl ? null : <TodoNotice>{thanks.todos.booking}</TodoNotice>}
          </Reveal>

          <Reveal delay={0.16} className="w-full">
            <div className="faceta bg-grafite-900 p-5 text-left [--f:28px] md:p-7">
              <p className="meta mb-5 text-ambar-400">{thanks.stepsTitle}</p>
              <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
                {thanks.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4 md:flex-col md:gap-3">
                    <span className="w-10 shrink-0 font-serif text-[2.6rem] italic leading-[0.8] text-ambar-400 md:w-auto">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1">
                      <p className="font-display text-lg font-medium tracking-[-0.02em]">{step.title}</p>
                      <p className="text-sm leading-relaxed text-pedra-300">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          <p className="text-balance text-sm text-pedra-300">
            {thanks.supportEmail}
            {hasWhatsapp ? (
              <>
                {" "}
                {thanks.supportWhatsapp}{" "}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-linho-050 underline underline-offset-4 hover:text-ambar-400"
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
