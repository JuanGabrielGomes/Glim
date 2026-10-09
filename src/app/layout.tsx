import type { Metadata } from "next";
import { Inter, Outfit, Space_Mono } from "next/font/google";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { PRODUCT_NAME } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const display = Outfit({ subsets: ["latin"], variable: "--font-display", display: "swap" });
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
