import Image from 'next/image';
import { Glass } from '@/components/ui/Glass';
import { Reveal } from '@/components/ui/Reveal';
import { PRINCIPLE } from '@/lib/content';

/** Princípio: respiro com foto conceito e um card de vidro escuro facetado. */
export function Principle() {
  return (
    <section className="relative isolate grid min-h-[640px] place-items-center px-[var(--m)] py-[100px]">
      <Image
        src="/fotos/vidro-chuva.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* O vidro fica parado; só o texto entra. Animar opacidade num elemento com backdrop-filter trava a rolagem. */}
      <Glass tone="escuro" faceta={28} className="w-full max-w-[820px] p-[clamp(36px,5vw,64px)]">
        <Reveal>
          <p className="meta text-pedra-200">{PRINCIPLE.label}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <blockquote className="mt-7 font-serif text-[clamp(34px,4vw,60px)] leading-[1.05] tracking-[-0.01em] text-balance italic">
            {PRINCIPLE.quote}
          </blockquote>
        </Reveal>
      </Glass>
    </section>
  );
}
