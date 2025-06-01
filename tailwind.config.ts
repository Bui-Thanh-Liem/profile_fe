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
      animation: {
        wave: "wave 2s ease-in-out infinite",
        "fade-in": "fade-in 1s ease-in-out",
        "wave-fade-in": "wave 2s ease-in-out infinite, fade-in 1s ease-in-out",
        "bounce-left": "bounce-x 1s infinite",
      },
      keyframes: {
        wave: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "30%": { opacity: "0.3" },
          "50%": { opacity: "0.5" },
          "70%": { opacity: "0.7" },
          "100%": { opacity: "1" },
        },
        "bounce-x": {
          "0%, 100%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      fontFamily: {
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
