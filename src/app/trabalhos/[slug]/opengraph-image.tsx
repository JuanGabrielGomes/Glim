import { getCaseEntry } from '@/lib/cases';
import { CASE_STUDIES } from '@/lib/content';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Case da glim.';

export function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ slug: item.slug }));
}

const MAX_ONE_LINE = 14;

/** Uma linha se couber; senão divide entre palavras minimizando a linha mais longa. */
function balanceLines(name: string): string[] {
  const words = name.split(' ');
  if (name.length <= MAX_ONE_LINE || words.length < 2) return [name];

  let best: string[] = [name];
  let bestLongest = Infinity;
  for (let cut = 1; cut < words.length; cut += 1) {
    const rows = [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
    const longest = Math.max(...rows.map((row) => row.length));
    if (longest < bestLongest) {
      best = rows;
      bestLongest = longest;
    }
  }
  return best;
}

interface CaseOgProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseOpengraphImage({ params }: CaseOgProps) {
  const { slug } = await params;
  const entry = getCaseEntry(slug);

  return renderOg({
    eyebrow: entry ? `Case ${entry.number} · ${entry.type}` : 'Case',
    lines: balanceLines(entry?.client ?? 'Trabalhos').map((text) => ({ text })),
    footer: 'glim. · sites no ar para empresas reais',
    fontSize: 132,
  });
}
