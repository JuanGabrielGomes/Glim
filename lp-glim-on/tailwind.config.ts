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
          dark: "#4A4643",
          light: "#F9F8F6",
          gold: "#F2B77B",
          "gold-hover": "#E2A96B",
          // Dourado escurecido: só para texto de destaque sobre fundo claro (contraste).
          "gold-deep": "#9A5F24",
          // Tons "cinema" do site institucional, para as seções escuras.
          cinema: "#14100E",
          ink: "#0B0908",
          cream: "#F5F0EA",
          ink2: "#2F2B28",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        glow: "0 0 28px rgba(242, 183, 123, 0.35)",
        "glow-lg": "0 30px 120px -30px rgba(242, 183, 123, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
