import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FCC224",
          coral: "#E9635D",
          blue: "#335595",
          orange: "#FE9440",
          brown: "#3A1A16",
          mint: "#2ACCB5",
          warm: "#FFF6E2",
          cream: "#FFF9EB",
          paper: "#FFFDF7",
          dark: "#24110F",
          "dark-soft": "#4A241F",
          ink: "#24110F"
        },
        "background-warm": "var(--background)",
        "background-paper": "var(--card)",
        "background-dark": "var(--background)",
        "background-dark-soft": "var(--card)",
        "text-brown": "#3A1A16",
        "text-muted-warm": "#7B5F59",
        "text-inverse": "#FFF6E2",
        "border-soft": "rgba(58, 26, 22, 0.12)",
        "border-brand": "rgba(252, 194, 36, 0.55)",
        "border-dark": "rgba(255, 246, 226, 0.18)"
      },
      fontFamily: {
        display: ["var(--font-headline)"],
        sans: ["var(--font-body)"]
      },
      boxShadow: {
        soft: "0 10px 28px rgba(58, 26, 22, 0.10)",
        card: "0 18px 45px rgba(58, 26, 22, 0.14)",
        premium: "0 24px 70px rgba(58, 26, 22, 0.20)",
        floating: "0 26px 80px rgba(58, 26, 22, 0.22)",
        mobile: "0 24px 70px rgba(36, 17, 15, 0.32)",
        brand: "0 18px 50px rgba(58, 26, 22, 0.16)",
        glow: "0 0 0 1px rgba(252, 194, 36, 0.2), 0 20px 70px rgba(42, 204, 181, 0.18)"
      },
      backgroundImage: {
        "brand-radial": "linear-gradient(135deg, #FFF6E2 0%, #FFFFFF 44%, #FFE3BF 100%)",
        "brand-dark": "linear-gradient(135deg, #3A1A16 0%, #24110F 58%, #335595 100%)",
        "gradient-sunrise": "linear-gradient(135deg, #FCC224 0%, #FE9440 52%, #E9635D 100%)",
        "gradient-territory": "linear-gradient(135deg, #3A1A16 0%, #335595 54%, #2ACCB5 100%)",
        "gradient-forest": "linear-gradient(135deg, #2ACCB5 0%, #335595 100%)",
        "gradient-night": "linear-gradient(135deg, #3A1A16 0%, #24110F 70%, #335595 100%)",
        "gradient-learning": "linear-gradient(135deg, #FFF6E2 0%, #FCC224 45%, #2ACCB5 100%)",
        "gradient-tourism": "linear-gradient(135deg, #FE9440 0%, #E9635D 45%, #335595 100%)"
      },
      borderRadius: {
        card: "var(--radius-card)",
        mobile: "1.75rem",
        pill: "999px"
      },
      transitionDuration: {
        fast: "140ms",
        normal: "220ms",
        slow: "420ms"
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(.2,.8,.2,1)"
      }
    }
  },
  plugins: []
};

export default config;
