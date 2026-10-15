import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

/**
 * Faixa de números em destaque, entre o vídeo e o resto da página.
 * Cada célula tem o mesmo recuo depois da divisória, para valor e legenda
 * ficarem alinhados entre si e com a linha.
 */
export function Highlights() {
  return (
    <section className="relative border-y border-white/10 bg-glim-cinema text-glim-cream">
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 md:grid-cols-4">
            {landing.highlights.map((item, index) => (
              <li
                key={item.label}
                className={cn(
                  "space-y-2 py-7 pr-4 md:py-10 md:pr-6",
                  // Celular (2 colunas): divisória só na coluna da direita; linha entre as fileiras.
                  index % 2 === 1 ? "border-l border-white/10 pl-5" : "pl-0",
                  index >= 2 && "border-t border-white/10 md:border-t-0",
                  // Desktop (4 colunas): divisória antes de todas, menos a primeira.
                  index > 0 ? "md:border-l md:pl-6" : "md:pl-0",
                )}
              >
                <p className="whitespace-nowrap font-mono text-[1.3rem] font-bold leading-none tracking-[-0.04em] text-glim-gold sm:text-[1.6rem] md:text-[2rem]">
                  {item.value}
                </p>
                <p className="text-[0.82rem] leading-snug text-glim-cream/70 md:text-sm">{item.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
