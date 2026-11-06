import { Fragment, type ReactNode } from "react";

/** Troca cada "*" do texto por um asterisco pequeno, em sobrescrito. */
export function withFootnote(text: string): ReactNode {
  if (!text.includes("*")) return text;
  const parts = text.split("*");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <span
          className="inline-block -translate-y-[0.75em] align-baseline text-[max(0.45em,9px)] font-normal leading-none opacity-70"
        >
          *
        </span>
      ) : null}
    </Fragment>
  ));
}
