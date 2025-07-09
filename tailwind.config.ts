import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f9fafb",
          text: "#111827",
          primary: "#2563eb",
        },
        dark: {
          background: "#111827",
          text: "#f9fafb",
          primary: "#3b82f6",
        },
      },
    },
  },
  plugins: [],
};

export default config;