import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        bounceLeft: {
          "0%, 100%": {
            transform: "translateX(0)",
            animationTimingFunction: "ease-out",
          },
          "20%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "ease-in",
          },
        },
      },
      animation: {
        bounceLeft: "bounceLeft 1s ease-in-out 3",
      },
    },
  },
  plugins: [],
} satisfies Config;
