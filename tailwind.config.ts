import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Berkeley Mono"',
          '"JetBrains Mono"',
          '"IBM Plex Mono"',
          '"SFMono-Regular"',
          '"SF Mono"',
          '"Cascadia Mono"',
          '"Roboto Mono"',
          "Consolas",
          '"Liberation Mono"',
          "Menlo",
          "monospace"
        ],
        mono: [
          '"Berkeley Mono"',
          '"JetBrains Mono"',
          '"IBM Plex Mono"',
          '"SFMono-Regular"',
          '"SF Mono"',
          '"Cascadia Mono"',
          '"Roboto Mono"',
          "Consolas",
          '"Liberation Mono"',
          "Menlo",
          "monospace"
        ]
      },
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        surfaceStrong: "var(--color-surface-strong)",
        surfaceMuted: "var(--color-surface-muted)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        lineStrong: "var(--color-line-strong)",
        accent: "var(--color-accent)",
        accentSoft: "var(--color-accent-soft)",
        success: "var(--color-success)",
        error: "var(--color-error)"
      },
      borderRadius: {
        panel: "var(--radius-panel)"
      },
      boxShadow: {
        panel: "0 24px 64px -48px rgba(0, 0, 0, 0.9)"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(202, 215, 228, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(202, 215, 228, 0.06) 1px, transparent 1px)",
        scan: "linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        terminalGlow: "radial-gradient(circle at top, rgba(123, 201, 196, 0.18), transparent 38%)"
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 12px, 0)"
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)"
          }
        },
        pulseLine: {
          "0%, 100%": {
            opacity: "0.3"
          },
          "50%": {
            opacity: "0.9"
          }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-line": "pulseLine 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: [typography]
};

export default config;
