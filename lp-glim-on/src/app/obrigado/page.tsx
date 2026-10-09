import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { PRODUCT_NAME, site } from "@/content/site";
import { thanks } from "@/content/thanks";

export const metadata: Metadata = {
  title: `${thanks.metaTitle} — ${PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  const { whatsappUrl, whatsappDisplay, bookingUrl } = site;
  const hasWhatsapp = Boolean(whatsappUrl && whatsappDisplay);

  return (
    <main className="flex min-h-dvh items-center bg-glim-dark py-12 text-glim-light">
      <Container className="max-w-2xl">
        <div className="space-y-7 rounded-3xl border border-glim-light/15 bg-glim-light/5 p-7 text-center backdrop-blur md:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-glim-gold/50">
            <Diamond className="h-6 w-6" />
          </span>

          <h1 className="font-display text-2xl font-semibold leading-tight md:text-4xl">
            <span className="block text-glim-gold">{thanks.titleLead}</span>
            <span className="block">{thanks.titleRest}</span>
          </h1>

          <p className="text-base leading-relaxed text-glim-light/80 md:text-lg">{thanks.text}</p>

          <div className="space-y-3">
            <Button href={bookingUrl || "#"} newTab={Boolean(bookingUrl)} glow className="w-full sm:w-auto">
              {thanks.button}
            </Button>
            {bookingUrl ? null : <TodoNotice>{thanks.todos.booking}</TodoNotice>}
          </div>

          <p className="text-balance text-sm text-glim-light/70">
            {thanks.supportEmail}
            {hasWhatsapp ? (
              <>
                {" "}
                {thanks.supportWhatsapp}{" "}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-glim-light underline underline-offset-4 hover:text-glim-gold"
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
