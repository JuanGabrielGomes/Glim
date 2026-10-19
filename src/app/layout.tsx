import type { Metadata, Viewport } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { MagneticCursor } from '@/components/cursor/MagneticCursor';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { INSTAGRAM_URL } from '@/lib/content';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/seo';
import './globals.css';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_DESCRIPTION,
      founder: { '@type': 'Person', name: 'Juan Gabriel Gomes' },
      areaServed: { '@type': 'Country', name: 'Brasil' },
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'RS',
        addressCountry: 'BR',
      },
      sameAs: [INSTAGRAM_URL],
      knowsAbout: ['Desenvolvimento web', 'Design digital', 'Software sob medida'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | glim.',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'criação de sites',
    'desenvolvimento de sites',
    'sistemas sob medida',
    'software sob medida',
    'desenvolvimento web',
    'design digital',
    'landing page',
    'Serra Gaúcha',
  ],
  authors: [{ name: 'Juan Gabriel Gomes' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <SmoothScroll>
          {children}
          <MagneticCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
