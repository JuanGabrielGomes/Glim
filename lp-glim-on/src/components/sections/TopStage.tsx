/**
 * Topo da página (hero + vídeo) sobre grafite liso. No celular ocupa a tela inteira (100svh),
 * e a faixa de números começa logo depois da dobra, sem ser cortada. A altura que sobra é
 * dividida igualmente acima do título e abaixo do botão.
 */
interface TopStageProps {
  children: React.ReactNode;
}

export function TopStage({ children }: TopStageProps) {
  return (
    <div className="relative overflow-hidden bg-grafite-950">
      <div className="relative flex min-h-[100svh] flex-col md:block md:min-h-0">
        <div aria-hidden="true" className="flex-1 md:hidden" />
        {children}
        <div aria-hidden="true" className="flex-1 md:hidden" />
      </div>
    </div>
  );
}
