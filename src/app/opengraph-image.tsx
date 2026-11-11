import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'glim. · Precisão que se vê. Sites, lojas e sistemas sob medida.';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOg({
    eyebrow: 'Estúdio de engenharia e design digital',
    lines: [{ text: 'Precisão' }, { text: 'que se', accent: 'vê.' }],
    footer: 'Sites · Lojas · Sistemas sob medida · glimweb.com',
  });
}
