import type { Metadata, Viewport } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { MagneticCursor } from '@/components/cursor/MagneticCursor';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import './globals.css';

const googleSans = localFont({
  src: './fonts/GoogleSans-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-google-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'glim. | Engenharia de Software e Design Digital de Elite',
    template: '%s | glim.',
  },
  description:
    'Sites e produtos digitais lapidados com direção visual e engenharia sólida, para negócios cujo padrão técnico não pode ficar escondido atrás de um site genérico.',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: [{ url: '/icon.png', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#14100E',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark h-full">
      <body
        className={`${inter.className} ${googleSans.variable} ${inter.variable} ${spaceMono.variable} min-h-full bg-[#14100E] text-[#F5F0EA] antialiased`}
      >
        <SmoothScroll>
          {children}
          <MagneticCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
