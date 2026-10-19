import { ImageResponse } from 'next/og';

export const alt = 'glim. | Criação de Sites e Sistemas Sob Medida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: 'radial-gradient(circle at 75% 30%, #3a2a1c 0%, #14100e 60%)',
          color: '#f5f0ea',
        }}
      >
        <div style={{ display: 'flex', fontSize: 168, letterSpacing: -8, color: '#f2b77b' }}>
          glim.
        </div>
        <div style={{ display: 'flex', marginTop: 24, fontSize: 52, letterSpacing: -2 }}>
          Sites e sistemas sob medida
        </div>
        <div style={{ display: 'flex', marginTop: 16, fontSize: 30, color: '#b7ada2' }}>
          Do conceito ao código, o insight é claro.
        </div>
      </div>
    ),
    size,
  );
}
