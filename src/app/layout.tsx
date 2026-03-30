import type { Metadata, Viewport } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';
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
    'Interfaces transparentes, engenharia de software precisa. Design digital e desenvolvimento ágil para empresas e produtos de tecnologia.',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: [{ url: '/icon.png', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F8F6' },
    { media: '(prefers-color-scheme: dark)', color: '#4A4643' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className} ${googleSans.variable} ${inter.variable} ${spaceMono.variable} min-h-full bg-[#F9F8F6] text-[#4A4643] antialiased dark:bg-[#4A4643] dark:text-[#F9F8F6]`}
      >
        {children}
      </body>
    </html>
  );
}
