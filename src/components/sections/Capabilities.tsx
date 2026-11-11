import Link from 'next/link';
import { GlimOnCard } from '@/components/sections/GlimOnCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { SERVICES_LIST } from '@/lib/content';

/** Serviços: lista numerada com fios de 1 px e o card do glim. On ao lado. */
export function Capabilities() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="bg-linho-100 px-[var(--m)] py-[clamp(80px,9vw,140px)]"
    >
      <Reveal>
        <SectionHead
          id="servicos-title"
          lines={['Serviços']}
          caption="Do site de uma página ao sistema"
          className="mb-[clamp(40px,5vw,72px)]"
        />
      </Reveal>

      <Reveal>
        <div className="grid items-start gap-[clamp(32px,5vw,80px)] md:grid-cols-[1.25fr_1fr]">
          <ul className="border-pedra-200 border-t">
            {SERVICES_LIST.map((service, index) => (
              <li key={service.slug} className="border-pedra-200 border-b">
                <Link
                  href={`/servicos/${service.slug}`}
                  className="group grid grid-cols-[40px_1fr] items-baseline gap-x-5 py-[26px] md:grid-cols-[56px_1fr_auto]"
                >
                  <span className="meta text-pedra-500">0{index + 1}</span>
                  <div>
                    <p className="text-[clamp(22px,2vw,30px)] leading-[1.1] font-medium tracking-[-0.03em]">
                      {service.title}
                    </p>
                    <p className="text-pedra-500 mt-1.5 max-w-[34em] text-base">
                      {service.description}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden text-[22px] leading-none transition-transform group-hover:translate-x-1 md:block"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <GlimOnCard />
        </div>
      </Reveal>
    </section>
  );
}
