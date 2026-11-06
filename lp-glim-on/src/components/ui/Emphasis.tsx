import { cn } from "@/lib/utils";
import type { Tone } from "@/components/ui/Section";
import { withFootnote } from "@/components/ui/Footnote";

interface EmphasisProps {
  text: string;
  /** Trecho do próprio texto que ganha destaque dourado. */
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
      <span className={cn(tone === "dark" ? "text-glim-gold" : "text-glim-gold-deep", className)}>
        {withFootnote(emphasis)}
      </span>
      {withFootnote(text.slice(index + emphasis.length))}
    </>
  );
}
