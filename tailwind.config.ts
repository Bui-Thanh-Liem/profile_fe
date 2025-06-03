import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "gray-app": "var(--gray-app)",
        "gray-second-app": "var(--gray-second-app)",
      },
      height: {
        "content-storage": "var(--height-content-storage)",
      },
      minHeight: {
        "content-storage": "var(--height-content-storage)",
      },
      animation: {},
      keyframes: {},
      fontFamily: {
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
