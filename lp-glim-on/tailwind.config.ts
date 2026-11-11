import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Marca glim. v1 (mesmos tokens do site institucional e de 00_MARCA/03_TOKENS).
      colors: {
        grafite: { 950: "#1C1A18", 900: "#26231F", 800: "#3A3631" },
        pedra: { 700: "#4A4540", 500: "#6E675F", 300: "#A39B91", 200: "#D8CFC4" },
        linho: { 100: "#EBE4DA", "050": "#F5F0EB" },
        // Âmbar em texto sobre linho: sempre 700. O 400 só sobre grafite.
        ambar: { 400: "#F0A855", 500: "#C27D2B", 700: "#9A5E17" },
      },
      fontFamily: {
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        sans: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
export default config;
