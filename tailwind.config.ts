import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F8F7F3",
        ink: "#141414",
        charcoal: "#111111",
        muted: "#8E8A84",
        hairline: "#D8D4CC",
        acid: "#C9FE6E"
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
