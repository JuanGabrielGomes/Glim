import { Reveal } from '@/components/ui/Reveal';
import { PROCESS } from '@/lib/content';
import { SERVICE_PROCESS } from '@/lib/services';

/** Processo: "4" gigante em serifa itálica, promessa de prazo e os quatro passos. */
export function Process() {
  const [first, emphasis, last] = PROCESS.promise;

  return (
    <section
      id="processo"
      aria-labelledby="processo-title"
      className="bg-grafite-950 text-linho-050 px-[var(--m)] py-[clamp(80px,9vw,140px)]"
    >
      <Reveal>
        <div className="mb-[clamp(56px,6vw,96px)] grid items-end gap-[clamp(24px,4vw,64px)] md:grid-cols-[auto_1fr]">
          <span
            aria-hidden="true"
            className="text-linho-050 font-serif text-[230px] leading-[0.72] tracking-[-0.06em] italic md:text-[clamp(220px,26vw,380px)]"
          >
            {PROCESS.weeks}
          </span>
          <div>
            <p className="caps text-ambar-400 mb-[22px]">
              {PROCESS.caption.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <h2
              id="processo-title"
              className="text-[clamp(30px,3.6vw,52px)] leading-[1.02] font-medium tracking-[-0.04em]"
            >
              {first} <em className="font-serif text-[1.1em] leading-[0.9] font-normal tracking-[-0.01em]">{emphasis}</em>{' '}
              {last}
            </h2>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <ol className="border-grafite-800 grid grid-cols-2 gap-x-[18px] border-t md:grid-cols-4 md:gap-x-0">
          {SERVICE_PROCESS.map((step, index) => (
            <li key={step.title} className="pt-7 pr-0 pb-[18px] md:pt-[34px] md:pr-7 md:pb-0">
              <span className="text-ambar-400 block font-serif text-[56px] leading-[0.8] italic md:text-[76px]">
                0{index + 1}
              </span>
              <h3 className="mt-[26px] mb-3 text-2xl leading-[1.1] font-medium tracking-[-0.03em]">
                {step.title}
              </h3>
              <p className="text-pedra-300 text-base">{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
