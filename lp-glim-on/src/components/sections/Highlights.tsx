import { Container } from "@/components/ui/Container";
import { withFootnote } from "@/components/ui/Footnote";
import { Reveal } from "@/components/ui/Reveal";
import { landing } from "@/content/landing";
import { cn } from "@/lib/utils";

/**
 * Faixa de números em destaque, entre o vídeo e o resto da página: valores em serifa
 * itálica âmbar. Cada célula tem o mesmo recuo depois da divisória, para valor e legenda
 * ficarem alinhados entre si e com a linha.
 */
export function Highlights() {
  return (
    <section className="relative border-y border-grafite-800 bg-grafite-950 text-linho-050">
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 md:grid-cols-4">
            {landing.highlights.map((item, index) => (
              <li
                key={item.label}
                className={cn(
                  "space-y-3 py-7 pr-4 md:py-10 md:pr-6",
                  // Celular (2 colunas): divisória só na coluna da direita; linha entre as fileiras.
                  index % 2 === 1 ? "border-l border-grafite-800 pl-5" : "pl-0",
                  index >= 2 && "border-t border-grafite-800 md:border-t-0",
                  // Desktop (4 colunas): divisória antes de todas, menos a primeira.
                  index > 0 ? "md:border-l md:pl-6" : "md:pl-0",
                )}
              >
                <p className="whitespace-nowrap font-serif text-[1.9rem] italic leading-[0.9] tracking-[-0.01em] text-ambar-400 sm:text-[2.3rem] md:text-[3.2rem]">
                  {withFootnote(item.value)}
                </p>
                <p className="text-[0.82rem] leading-snug text-pedra-300 md:text-sm">{item.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
