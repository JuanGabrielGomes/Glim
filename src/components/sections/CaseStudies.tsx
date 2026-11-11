import Link from 'next/link';
import { TextLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Shot } from '@/components/ui/Shot';
import { CASE_STUDIES } from '@/lib/content';

/** Trabalhos: três cases alternados, cada um levando para /trabalhos/[slug]. */
export function CaseStudies() {
  return (
    <section
      id="trabalhos"
      aria-labelledby="trabalhos-title"
      className="px-[var(--m)] py-[clamp(80px,9vw,140px)]"
    >
      <Reveal>
        <SectionHead
          id="trabalhos-title"
          lines={['Trabalhos']}
          caption="Sites no ar para empresas reais"
          className="mb-[clamp(40px,5vw,72px)]"
        />
      </Reveal>

      <div className="grid gap-[clamp(64px,7vw,110px)]">
        {CASE_STUDIES.map((item, index) => {
          const isReversed = index % 2 === 1;
          const href = `/trabalhos/${item.slug}`;

          return (
            <Reveal key={item.slug}>
              <article
                className={`grid items-end gap-[clamp(28px,4vw,64px)] ${
                  isReversed ? 'md:grid-cols-[1fr_1.55fr]' : 'md:grid-cols-[1.55fr_1fr]'
                }`}
              >
                <Link
                  href={href}
                  aria-label={`Ver o case ${item.client}`}
                  className={`group block ${isReversed ? 'md:order-2' : ''}`}
                >
                  <Shot
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    sizes="(max-width: 820px) 92vw, 52vw"
                  />
                </Link>

                <div>
                  <span className="text-pedra-200 block font-serif text-[88px] leading-[0.8] italic">
                    0{index + 1}
                  </span>
                  <p className="meta text-pedra-500 mt-[22px]">{item.kind}</p>
                  <h3 className="mt-[18px] mb-[14px] text-[clamp(26px,2.4vw,36px)] leading-[1.05] font-medium tracking-[-0.035em]">
                    {item.title}
                  </h3>
                  <p className="text-pedra-500">{item.blurb}</p>
                  <ul className="meta text-pedra-500 mt-[22px] mb-7 flex flex-wrap gap-x-[18px] gap-y-2">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <TextLink href={href}>Ver case</TextLink>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
