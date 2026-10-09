import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { PRODUCT_NAME } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

// Mesma Google Sans Flex do site da glim. (licença OFL), recortada para latim e com os
// eixos fixos no padrão do site (peso 400). Só o tamanho óptico (opsz) segue variável.
const display = localFont({
  src: "./fonts/GoogleSansFlex-latin.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PRODUCT_NAME,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
