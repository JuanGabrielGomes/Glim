import Link from 'next/link';

export function GlimOnHighlight() {
  return (
    <div className="border-glim-diamond/25 relative mt-16 overflow-hidden rounded-[2rem] border bg-[linear-gradient(135deg,rgba(242,183,123,0.1),rgba(255,255,255,0.02)_55%)] p-7 sm:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="border-glim-diamond/40 text-glim-diamond inline-block rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.22em] uppercase">
            Novo produto
          </p>
          <h3 className="font-google mt-5 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.08] tracking-[-0.05em] text-balance text-[#f5f0ea]">
            glim. On: seu site profissional em até 7 dias.
          </h3>
          <p className="mt-4 text-base leading-7 text-[#d9d3cc] sm:text-lg">
            Um site institucional de uma página, com escopo fechado, pra quem precisa aparecer no Google sem
            esperar semanas. R$ 997 em até 12x no cartão.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <Link
            href="/servicos/glim-on"
            data-cursor-hover
            className="bg-glim-diamond text-glim-dark inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold shadow-[0_18px_44px_-22px_rgba(242,183,123,0.85)] transition-transform hover:-translate-y-0.5 sm:text-base"
          >
            Conhecer o glim. On
          </Link>
          <a
            href="https://on.glimweb.com"
            data-cursor-hover
            className="text-sm font-medium text-[#d9d3cc] underline decoration-[#f2c48f]/40 underline-offset-4 transition-colors hover:text-white"
          >
            Ir direto pra on.glimweb.com
          </a>
        </div>
      </div>
    </div>
  );
}
