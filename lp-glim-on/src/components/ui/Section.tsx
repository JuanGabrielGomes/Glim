import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export type Tone = "dark" | "light";
export type GlowPosition = "left" | "right" | "center" | "none";

export const toneStyles: Record<Tone, { bg: string; line: string; card: string; muted: string; accent: string }> = {
  dark: {
    bg: "bg-glim-cinema text-glim-cream",
    line: "border-white/10",
    card: "border border-white/10 bg-white/[0.04] backdrop-blur-sm",
    muted: "text-glim-cream/70",
    accent: "text-glim-gold",
  },
  light: {
    bg: "bg-glim-light text-glim-ink2",
    line: "border-glim-dark/15",
    card: "border border-glim-dark/10 bg-white/70 shadow-[0_24px_80px_-48px_rgba(74,70,67,0.55)]",
    muted: "text-glim-ink2/75",
    accent: "text-glim-gold-deep",
  },
};

const glowPlacement: Record<Exclude<GlowPosition, "none">, string> = {
  left: "-left-40 top-10",
  right: "-right-40 top-1/3",
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
};

interface SectionProps {
  tone: Tone;
  children: React.ReactNode;
  id?: string;
  className?: string;
  glow?: GlowPosition;
}

/** Seção com o fundo "vivo" do site institucional: grade com máscara, brilho dourado e granulado. */
export function Section({ tone, children, id, className, glow = "none" }: SectionProps) {
  const dark = tone === "dark";

  return (
    <section id={id} className={cn("relative overflow-hidden py-16 md:py-28", toneStyles[tone].bg, className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_70%)]",
            dark ? "grid-dark" : "grid-light",
          )}
        />
        {glow !== "none" ? (
          <div
            className={cn(
              "absolute h-[26rem] w-[26rem] rounded-full blur-3xl",
              glowPlacement[glow],
              dark ? "bg-glim-gold/[0.13]" : "bg-glim-gold/25",
            )}
          />
        ) : null}
        <div className={cn("grain absolute inset-0", dark ? "opacity-40" : "opacity-60")} />
      </div>
      <Container className="relative">{children}</Container>
    </section>
  );
}
