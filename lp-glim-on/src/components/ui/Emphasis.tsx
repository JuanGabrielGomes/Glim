import { cn } from "@/lib/utils";
import type { Tone } from "@/components/ui/Section";
import { withFootnote } from "@/components/ui/Footnote";

interface EmphasisProps {
  text: string;
  /** Trecho do próprio texto que vira itálico serifado em âmbar (assinatura da marca). */
  emphasis?: string;
  tone?: Tone;
  className?: string;
}

export function Emphasis({ text, emphasis, tone = "dark", className }: EmphasisProps) {
  if (!emphasis || !text.includes(emphasis)) return <>{withFootnote(text)}</>;
  const index = text.indexOf(emphasis);

  return (
    <>
      {withFootnote(text.slice(0, index))}
      <em
        className={cn(
          "font-serif text-[1.1em] font-normal italic leading-[0.9] tracking-[-0.01em]",
          tone === "dark" ? "text-ambar-400" : "text-ambar-700",
          className,
        )}
      >
        {withFootnote(emphasis)}
      </em>
      {withFootnote(text.slice(index + emphasis.length))}
    </>
  );
}
