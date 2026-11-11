import Image from "next/image";
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
  const { brand, documentLabel, contactLabel, privacyLabel, privacyHref, agencyText, agencyLabel, agencyHref } =
    landing.footer;
  const { document, email } = site.company;

  return (
    <footer
      className={cn(
        "border-t border-grafite-800 bg-grafite-950 pb-12 pt-12 text-linho-050",
        withStickyCta && "pb-28 md:pb-12",
      )}
    >
      <Container className="flex flex-col items-center gap-5 text-center text-sm text-pedra-300">
        {/* Logo oficial da glim. (o mesmo do site institucional). */}
        <a href={agencyHref} aria-label={`${brand}, site principal`} className="inline-flex">
          <Image src="/brand/glim-logo-linho.svg" alt={brand} width={1874} height={995} className="h-9 w-auto md:h-10" />
        </a>
        <p className="max-w-md">
          {agencyText}{" "}
          <a href={agencyHref} className="underline underline-offset-4 hover:text-ambar-400">
            {agencyLabel}
          </a>
        </p>
        {document || email ? (
          <p className="meta flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] normal-case tracking-[0.04em]">
            {document ? (
              <span>
                {documentLabel}: {document}
              </span>
            ) : null}
            {email ? (
              <span>
                {contactLabel}:{" "}
                <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-ambar-400">
                  {email}
                </a>
              </span>
            ) : null}
          </p>
        ) : null}
        <Link href={privacyHref} className="underline underline-offset-4 hover:text-ambar-400">
          {privacyLabel}
        </Link>
        {document ? null : <TodoNotice>{landing.todos.footerDocument}</TodoNotice>}
        {email ? null : <TodoNotice>{landing.todos.footerContact}</TodoNotice>}
      </Container>
    </footer>
  );
}
