import { Fragment } from 'react';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { HeroGem } from '@/components/hero/HeroGem';
import { HeroScroll } from '@/components/hero/HeroScroll';
import { FitText } from '@/components/ui/FitText';
import { HERO } from '@/lib/content';
import { NoBreak } from '@/components/ui/NoBreak';

const MEGA_SIZE = 'mega text-[17vw] md:text-[clamp(56px,11.2vw,168px)]';

/** Some conforme o hero é percorrido (--hero-p vai de 0 a 1, definido por HeroScroll). */
const FADE_OUT =
  '[opacity:calc(1_-_var(--hero-p,0)_*_1.2)] md:[opacity:calc(1_-_var(--hero-p,0)_*_2.2)] group-data-[faded=true]/hero:pointer-events-none';

/**
 * Hero editorial: mega-título em duas linhas soltas com a gema à frente das letras.
 * No desktop, com movimento liberado, a seção é mais alta e o conteúdo fica fixo (sticky):
 * enquanto você rola, o diamante avança em direção à tela e os textos saem.
 */
export function Hero() {
  return (
    <section
      id="topo"
      className="group/hero relative h-[860px] md:h-[max(100svh,760px)] motion-safe:md:h-[calc(max(100svh,760px)+110svh)]"
    >
      <div className="bg-grafite-950 text-linho-050 relative h-full overflow-hidden motion-safe:md:sticky motion-safe:md:top-0 motion-safe:md:h-[max(100svh,760px)]">
        <div
          aria-hidden="true"
          className="absolute top-[46%] left-1/2 aspect-square w-[min(70vw,900px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgb(240_168_85/0.30),rgb(240_168_85/0)_62%)] md:top-[46%]"
        />

        <h1 className="contents">
          <span
            className={`absolute inset-x-[var(--m)] top-[120px] z-[2] [translate:0_calc(var(--hero-p,0)_*_-60px)] md:top-[150px] ${FADE_OUT}`}
          >
            <FitText lines={['Precisão']} className={MEGA_SIZE} />
          </span>
          <span
            className={`absolute inset-x-[var(--m)] bottom-[250px] z-[2] [translate:0_calc(var(--hero-p,0)_*_60px)] text-right md:bottom-[150px] ${FADE_OUT}`}
          >
            <FitText
              lines={[
                <Fragment key="que-se-ve">
                  que se <span className="text-ambar-400">vê.</span>
                </Fragment>,
              ]}
              className={MEGA_SIZE}
            />
          </span>
        </h1>

        <HeroGem />

        <p
          className={`caps absolute top-[170px] right-[var(--m)] z-[4] hidden text-right md:block ${FADE_OUT}`}
        >
          {HERO.side.map((item) => (
            <span key={item} className="block">
              {item}
            </span>
          ))}
        </p>

        <div
          className={`absolute inset-x-[var(--m)] bottom-14 z-[4] md:right-auto md:bottom-[170px] md:max-w-[400px] ${FADE_OUT}`}
        >
          <p className="text-pedra-300 mb-[22px] text-base leading-[1.5] md:mb-7 md:text-[19px]">
            <NoBreak>{HERO.lead}</NoBreak>
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-[18px] md:gap-x-[22px]">
            <ButtonLink href="/#raio-x" tone="linho">
              {HERO.cta}
            </ButtonLink>
            <TextLink href="/#trabalhos">{HERO.secondary}</TextLink>
          </div>
        </div>

        <dl
          className={`meta text-pedra-300 border-grafite-800 absolute inset-x-0 bottom-0 z-[4] hidden grid-cols-4 gap-6 border-t px-[var(--m)] pt-[22px] pb-7 md:grid ${FADE_OUT}`}
        >
          {HERO.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className="text-linho-050 mt-1">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <HeroScroll />
    </section>
  );
}
