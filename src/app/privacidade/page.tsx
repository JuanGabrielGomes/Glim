/*
 * ATENÇÃO: o texto desta política (src/content/privacy.ts) é um rascunho e deve ser
 * revisado pelo Juan antes de publicar.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { TodoNotice } from "@/components/ui/TodoNotice";
import { privacy } from "@/content/privacy";
import { PRODUCT_NAME, site } from "@/content/site";

export const metadata: Metadata = {
  title: `${privacy.metaTitle} — ${PRODUCT_NAME}`,
  description: privacy.metaDescription,
};

export default function PrivacyPage() {
  const { document, email } = site.company;

  return (
    <>
      <main className="bg-glim-light py-12 text-glim-dark md:py-20">
        <Container className="max-w-2xl space-y-10">
          <Link
            href="/"
            className="inline-block font-mono text-xs underline underline-offset-4 hover:text-glim-gold-hover"
          >
            {privacy.backLabel}
          </Link>

          <header className="space-y-3">
            <h1 className="font-display text-3xl font-semibold md:text-5xl">{privacy.title}</h1>
            {privacy.lastUpdated ? (
              <p className="font-mono text-xs text-glim-dark/80">
                {privacy.lastUpdatedLabel} {privacy.lastUpdated}
              </p>
            ) : (
              <TodoNotice>{privacy.todos.lastUpdated}</TodoNotice>
            )}
            <p className="text-base leading-relaxed md:text-lg">{privacy.intro}</p>
          </header>

          {privacy.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="font-display text-xl font-semibold md:text-2xl">{section.title}</h2>
              {section.blocks.map((block, index) =>
                block.type === "p" ? (
                  <p key={index} className="leading-relaxed">
                    {block.text}
                  </p>
                ) : (
                  <ul key={index} className="space-y-2">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed">
                        <Diamond className="mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ),
              )}
              {"showController" in section && section.showController && (document || email) ? (
                <dl className="space-y-1 rounded-2xl border border-glim-dark/15 bg-white/50 p-5 font-mono text-sm">
                  {document ? (
                    <div className="flex flex-wrap gap-x-2">
                      <dt>{privacy.controllerLabels.document}:</dt>
                      <dd>{document}</dd>
                    </div>
                  ) : null}
                  {email ? (
                    <div className="flex flex-wrap gap-x-2">
                      <dt>{privacy.controllerLabels.email}:</dt>
                      <dd>
                        <a href={`mailto:${email}`} className="underline underline-offset-4">
                          {email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
              {"showController" in section && section.showController ? (
                <>
                  {document ? null : <TodoNotice>{privacy.todos.document}</TodoNotice>}
                  {email ? null : <TodoNotice>{privacy.todos.email}</TodoNotice>}
                </>
              ) : null}
            </section>
          ))}
        </Container>
      </main>
      <Footer />
    </>
  );
}
