import { Container } from "@/components/ui/Container";
import { Diamond } from "@/components/ui/Diamond";
import { Reveal } from "@/components/ui/Reveal";
import { landing } from "@/content/landing";

/** Faixa de números em destaque, entre o vídeo e o resto da página. */
export function Highlights() {
  return (
    <section className="relative border-y border-white/10 bg-glim-cinema text-glim-cream">
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 md:grid-cols-4">
            {landing.highlights.map((item, index) => (
              <li
                key={item.label}
                className={[
                  "space-y-2 px-1 py-7 md:px-6 md:py-10",
                  index % 2 === 1 ? "border-l border-white/10 pl-5 md:pl-6" : "",
                  index >= 2 ? "border-t border-white/10 md:border-t-0" : "",
                  index === 2 ? "md:border-l" : "",
                ].join(" ")}
              >
                <p className="flex items-center gap-2 whitespace-nowrap font-mono text-[1.3rem] font-bold leading-none tracking-[-0.04em] text-glim-gold sm:text-[1.6rem] md:text-[2rem]">
                  <Diamond className="h-2 w-2 shrink-0 opacity-70" />
                  {item.value}
                </p>
                <p className="text-[0.82rem] leading-snug text-glim-cream/70 md:text-sm">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
