/**
 * Fundo contínuo do topo (hero + vídeo): grade, brilho dourado atrás do player e granulado.
 * No celular ocupa a tela inteira (100svh), e a faixa de números começa logo depois da dobra,
 * sem ser cortada. A altura que sobra é dividida igualmente acima do título e abaixo do botão.
 */
interface TopStageProps {
  children: React.ReactNode;
}

export function TopStage({ children }: TopStageProps) {
  return (
    <div className="relative overflow-hidden bg-glim-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black_0%,transparent_65%)]" />
        <div className="absolute -top-40 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-glim-gold/[0.12] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[24rem] w-[min(60rem,150%)] -translate-x-1/2 rounded-full bg-glim-gold/[0.14] blur-3xl" />
        <div className="grain absolute inset-0 opacity-40" />
      </div>
      <div className="relative flex min-h-[100svh] flex-col md:block md:min-h-0">
        <div aria-hidden="true" className="flex-1 md:hidden" />
        {children}
        <div aria-hidden="true" className="flex-1 md:hidden" />
      </div>
    </div>
  );
}
