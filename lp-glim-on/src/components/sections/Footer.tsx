import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { landing } from "@/content/landing";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import glimMark from "../../../public/brand/glim-mark-cream.png";

interface FooterProps {
  /** Espaço extra embaixo no celular para o CTA fixo não cobrir o rodapé. */
  withStickyCta?: boolean;
}

export function Footer({ withStickyCta = false }: FooterProps) {
  const { brand, documentLabel, contactLabel, privacyLabel, privacyHref } = landing.footer;
  const { document, email } = site.company;

  return (
    <footer
      className={cn(
        "border-t border-white/10 bg-glim-ink pb-12 pt-12 text-glim-cream",
        withStickyCta && "pb-28 md:pb-12",
      )}
    >
      <Container className="flex flex-col items-center gap-5 text-center text-sm text-glim-cream/70">
        {/* Logo oficial da glim. (o mesmo do site institucional). */}
        <Image src={glimMark} alt={brand} className="h-7 w-auto md:h-8" />
        {document || email ? (
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-xs">
            {document ? (
              <span>
                {documentLabel}: {document}
              </span>
            ) : null}
            {email ? (
              <span>
                {contactLabel}:{" "}
                <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-glim-gold">
                  {email}
                </a>
              </span>
            ) : null}
          </p>
        ) : null}
        <Link href={privacyHref} className="underline underline-offset-4 hover:text-glim-gold">
          {privacyLabel}
        </Link>
        {document ? null : <TodoNotice>{landing.todos.footerDocument}</TodoNotice>}
        {email ? null : <TodoNotice>{landing.todos.footerContact}</TodoNotice>}
      </Container>
    </footer>
  );
}
