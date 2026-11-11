import Image from 'next/image';
import Link from 'next/link';
import { Glass } from '@/components/ui/Glass';
import { GLIM_ON_CARD } from '@/lib/content';

/** Card do glim. On: foto conceito de luz dourada com um card de vidro escuro por cima. */
export function GlimOnCard() {
  return (
    <Link
      href={GLIM_ON_CARD.href}
      className="faceta-falsa text-linho-050 relative isolate block min-h-[460px] overflow-hidden [--corner:var(--color-linho-100)] md:min-h-[520px]"
    >
      <Image
        src="/fotos/luz-dourada.jpg"
        alt=""
        fill
        sizes="(max-width: 820px) 92vw, 40vw"
        className="-z-10 object-cover"
      />
      <Glass tone="escuro" faceta={0} className="absolute inset-x-7 bottom-7 p-[34px]">
        <p className="meta text-pedra-200">{GLIM_ON_CARD.eyebrow}</p>
        <p className="mt-[18px] mb-2 text-[clamp(40px,4vw,56px)] leading-[0.9] font-semibold tracking-[-0.05em]">
          {GLIM_ON_CARD.title}
        </p>
        <p className="opacity-85">{GLIM_ON_CARD.text}</p>
        <span className="mt-[26px] inline-block border-b border-current pb-[5px] text-base leading-none font-medium whitespace-nowrap">
          {GLIM_ON_CARD.cta}
        </span>
      </Glass>
    </Link>
  );
}
