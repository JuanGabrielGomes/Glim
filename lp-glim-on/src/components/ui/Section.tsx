import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export type Tone = "dark" | "light";

/** Estilos por tom de seção (marca v1): grafite escuro ou linho claro, sem brilhos, grade ou grão. */
export const toneStyles: Record<Tone, { bg: string; line: string; card: string; muted: string; accent: string }> = {
  dark: {
    bg: "bg-grafite-950 text-linho-050",
    line: "border-grafite-800",
    card: "border border-grafite-800 bg-grafite-900",
    muted: "text-pedra-300",
    accent: "text-ambar-400",
  },
  light: {
    bg: "bg-linho-050 text-grafite-950",
    line: "border-pedra-200",
    card: "border border-pedra-200 bg-linho-100",
    muted: "text-pedra-500",
    accent: "text-ambar-700",
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
    <section id={id} className={cn("relative py-16 md:py-28", toneStyles[tone].bg, className)}>
      <Container className="relative">{children}</Container>
    </section>
  );
}
