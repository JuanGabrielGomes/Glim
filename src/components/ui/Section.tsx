import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export type Tone = "dark" | "light";

export const toneStyles: Record<Tone, { bg: string; line: string; card: string; muted: string }> = {
  dark: {
    bg: "bg-glim-dark text-glim-light",
    line: "border-glim-light/15",
    card: "bg-glim-light/5",
    muted: "text-glim-light/70",
  },
  light: {
    bg: "bg-glim-light text-glim-dark",
    line: "border-glim-dark/15",
    card: "bg-white/50",
    muted: "text-glim-dark/80",
  },
};

interface SectionProps {
  tone: Tone;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Section({ tone, children, id, className }: SectionProps) {
  return (
    <section id={id} className={cn(toneStyles[tone].bg, "py-14 md:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}
