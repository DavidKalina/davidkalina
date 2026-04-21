import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        "bg-card": "var(--bg-card)",
        fg: "var(--fg)",
        "fg-dim": "var(--fg-dim)",
        "fg-mute": "var(--fg-mute)",
        signal: "var(--signal)",
        ink: {
          50: "#fafaf9",
          100: "#f4f4f3",
          200: "#e7e7e4",
          300: "#d1d1cc",
          400: "#a3a39c",
          500: "#71716b",
          600: "#52524c",
          700: "#3a3a35",
          800: "#252522",
          900: "#16160f",
          950: "#0c0c08",
        },

        /* shadcn aliases */
        background: "var(--bg)",
        foreground: "var(--fg)",
        card: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--fg)",
        },
        popover: {
          DEFAULT: "var(--bg-card)",
          foreground: "var(--fg)",
        },
        primary: {
          DEFAULT: "var(--fg)",
          foreground: "var(--bg)",
        },
        secondary: {
          DEFAULT: "var(--bg-elev)",
          foreground: "var(--fg)",
        },
        muted: {
          DEFAULT: "var(--bg-elev)",
          foreground: "var(--fg-dim)",
        },
        accent: {
          DEFAULT: "var(--signal)",
          foreground: "var(--bg)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--signal)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
      },
      maxWidth: {
        page: "1280px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
