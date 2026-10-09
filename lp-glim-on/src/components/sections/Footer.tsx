import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { landing } from "@/content/landing";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

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
        "border-t border-glim-light/10 bg-glim-dark pb-10 pt-10 text-glim-light",
        withStickyCta && "pb-28 md:pb-10",
      )}
    >
      <Container className="space-y-4 text-sm text-glim-light/70">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-display text-glim-light">{brand}</span>
          {document ? (
            <span className="font-mono text-xs">
              {documentLabel}: {document}
            </span>
          ) : null}
          {email ? (
            <span className="font-mono text-xs">
              {contactLabel}:{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-glim-gold">
                {email}
              </a>
            </span>
          ) : null}
          <Link href={privacyHref} className="underline underline-offset-4 hover:text-glim-gold">
            {privacyLabel}
          </Link>
        </p>
        {document ? null : <TodoNotice>{landing.todos.footerDocument}</TodoNotice>}
        {email ? null : <TodoNotice>{landing.todos.footerContact}</TodoNotice>}
      </Container>
    </footer>
  );
}
