import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

const OLD_SAFARI_UA =
  'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1';

/** Baixa a fonte do Google Fonts (TTF) em tempo de build. Devolve null se falhar: aí cai na fonte padrão. */
async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
        headers: { 'User-Agent': OLD_SAFARI_UA },
      })
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const response = await fetch(url);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function loadLogoDataUri(): Promise<string> {
  const svg = await readFile(path.join(process.cwd(), 'public/brand/glim-logo-linho.svg'));
  return `data:image/svg+xml;base64,${svg.toString('base64')}`;
}

export interface OgLine {
  text: string;
  /** Trecho final em âmbar (ex.: "VÊ."). */
  accent?: string;
}

interface OgOptions {
  /** Linha mono pequena acima do título. */
  eyebrow: string;
  /** Linhas do título gigante, em caixa alta. */
  lines: readonly OgLine[];
  /** Linha mono no rodapé do cartão. */
  footer: string;
  /** Tamanho da fonte do título (px). */
  fontSize?: number;
}

/** Cartão de compartilhamento 1200x630 no padrão da marca: grafite, logo linho e âmbar. */
export async function renderOg({ eyebrow, lines, footer, fontSize = 156 }: OgOptions) {
  const [display, mono, logo] = await Promise.all([
    loadGoogleFont('Inter+Tight', 600),
    loadGoogleFont('JetBrains+Mono', 500),
    loadLogoDataUri(),
  ]);

  const fonts = [
    display
      ? { name: 'Inter Tight', data: display, weight: 600 as const, style: 'normal' as const }
      : null,
    mono
      ? { name: 'JetBrains Mono', data: mono, weight: 500 as const, style: 'normal' as const }
      : null,
  ].filter((font): font is NonNullable<typeof font> => font !== null);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: '#1C1A18',
        backgroundImage:
          'radial-gradient(circle at 78% 62%, rgba(240,168,85,0.34) 0%, rgba(240,168,85,0) 58%)',
        color: '#F5F0EB',
        fontFamily: '"Inter Tight"',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt="" width={106} height={56} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontFamily: '"JetBrains Mono"',
            fontSize: 22,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A39B91',
            marginBottom: 28,
          }}
        >
          {eyebrow}
        </div>
        {lines.map((line) => (
          <div
            key={line.text}
            style={{
              display: 'flex',
              fontSize,
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: '-0.055em',
              textTransform: 'uppercase',
            }}
          >
            {line.text}
            {line.accent ? (
              <span style={{ color: '#F0A855', marginLeft: 18 }}>{line.accent}</span>
            ) : null}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          fontFamily: '"JetBrains Mono"',
          fontSize: 20,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#A39B91',
        }}
      >
        {footer}
      </div>
    </div>,
    { ...OG_SIZE, fonts }
  );
}
