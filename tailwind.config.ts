import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F7F7",
        ink: "#141414",
        charcoal: "#111111",
        muted: "#747474",
        hairline: "#D9D9D9"
      },
      fontFamily: {
        sans: ["var(--font-aileron)", "Aileron", "Arial", "sans-serif"]
      },
      maxWidth: {
        editorial: "1680px"
      }
    }
  },
  plugins: [forms]
};

export default config;
