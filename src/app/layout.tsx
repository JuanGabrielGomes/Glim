import type { Metadata } from 'next';
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
    'Interfaces transparentes, engenharia de software precisa. Boutique de design digital e desenvolvimento ágil de elite para SMEs e startups de tecnologia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body
        className={`${inter.className} ${googleSans.variable} ${inter.variable} ${spaceMono.variable} min-h-full bg-[#F9F8F6] text-[#4A4643] antialiased dark:bg-[#4A4643] dark:text-[#F9F8F6]`}
      >
        {children}
      </body>
    </html>
  );
}
