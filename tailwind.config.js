/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (driven by CSS variables in globals.css).
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        // Brand evergreen — also the "human / verified" signal.
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          soft: "var(--primary-soft)",
        },
        // Brick red — the "AI detected" alert signal.
        alert: {
          DEFAULT: "var(--alert)",
          foreground: "var(--alert-foreground)",
          soft: "var(--alert-soft)",
        },
        // Amber — the "mixed signals" mid state.
        caution: {
          DEFAULT: "var(--caution)",
          soft: "var(--caution-soft)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(25, 25, 25, 0.04), 0 8px 24px -12px rgba(25, 25, 25, 0.12)",
        lift: "0 2px 4px rgba(25, 25, 25, 0.05), 0 18px 40px -16px rgba(25, 25, 25, 0.22)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scanline: "scanline 2.2s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
