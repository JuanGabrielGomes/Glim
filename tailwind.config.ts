import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glim: {
          dark: "#4A4540",
          light: "#F5F0EB",
          gold: "#F0A855",
          "gold-hover": "#e09a45",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        glow: "0 0 28px rgba(240, 168, 85, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
