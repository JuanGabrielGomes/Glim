import { Reveal } from '@/components/ui/Reveal';
import { Shot } from '@/components/ui/Shot';
import { ABOUT } from '@/lib/content';
import { NoBreak } from '@/components/ui/NoBreak';

/** Estúdio: foto 4:5 facetada e a bio curta em primeira pessoa. */
export function About() {
  const [intro, emphasis, outro] = ABOUT.title;

  return (
    <section
      id="estudio"
      aria-labelledby="estudio-title"
      className="px-[var(--m)] py-[clamp(80px,9vw,140px)]"
    >
      <div className="grid items-center gap-[clamp(32px,6vw,96px)] md:grid-cols-[0.9fr_1.1fr]">
        <Shot
          src={ABOUT.photoSrc}
          alt={ABOUT.photoAlt}
          width={842}
          height={1264}
          sizes="(max-width: 820px) 92vw, 42vw"
          ratioClassName="aspect-[4/5]"
          position="center 20%"
          className="saturate-[0.85]"
        />

        <Reveal>
          <p className="meta text-pedra-500">Quem constrói</p>
          <h2
            id="estudio-title"
            className="mt-[22px] mb-[26px] text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em]"
          >
            {intro}{' '}
            <em className="font-serif text-[1.1em] leading-[0.9] font-normal tracking-[-0.01em]">
              {emphasis}
            </em>{' '}
            {outro}
          </h2>
          <p className="text-pedra-500 max-w-[34em] text-[clamp(18px,1.5vw,21px)] leading-[1.5]">
            <NoBreak>{ABOUT.bio}</NoBreak>
          </p>
          <ul className="meta mt-7 flex flex-wrap gap-2.5">
            {ABOUT.credentials.map((item) => (
              <li key={item} className="border-pedra-200 border px-3.5 py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
