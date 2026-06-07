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
          ink: "#24110F"
        }
      },
      fontFamily: {
        display: ["Impact", "Arial Black", "Trebuchet MS", "sans-serif"],
        sans: ["Nunito Sans", "Aptos", "Segoe UI", "system-ui", "sans-serif"]
      },
      boxShadow: {
        brand: "0 18px 50px rgba(58, 26, 22, 0.16)",
        glow: "0 0 0 1px rgba(252, 194, 36, 0.2), 0 20px 70px rgba(42, 204, 181, 0.18)"
      },
      backgroundImage: {
        "brand-radial": "linear-gradient(135deg, #FFF6E2 0%, #FFFFFF 44%, #FFE3BF 100%)",
        "brand-dark": "linear-gradient(135deg, #3A1A16 0%, #24110F 58%, #335595 100%)"
      }
    }
  },
  plugins: []
};

export default config;
