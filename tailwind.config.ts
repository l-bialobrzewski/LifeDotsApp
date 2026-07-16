import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mood: {
          1: "#94a3b8",
          2: "#60a5fa",
          3: "#fbbf24",
          4: "#fb923c",
          5: "#34d399",
        },
      },
    },
  },
  plugins: [],
};

export default config;
