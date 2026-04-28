import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Space Theme Color Palette
        space: {
          black: "#03001C",
          deep: "#0A0E23",
          navy: "#0D1B2A",
          nebula: "#1A1040",
        },
        star: {
          white: "#E8F4FD",
          gold: "#FFD700",
          silver: "#C0C0C0",
        },
        cosmic: {
          purple: "#7B2FBE",
          violet: "#9D4EDD",
          pink: "#E040FB",
          cyan: "#00D4FF",
          teal: "#00BFA5",
        },
        neon: {
          blue: "#3D5AF1",
          green: "#00FF87",
          orange: "#FF6B35",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
        display: ["Outfit", "Poppins", "sans-serif"],
      },
      backgroundImage: {
        "space-gradient": "linear-gradient(135deg, #03001C 0%, #0A0E23 50%, #1A1040 100%)",
        "nebula-gradient": "radial-gradient(ellipse at center, #7B2FBE33 0%, transparent 70%)",
        "stellar": "radial-gradient(ellipse at top, #0D1B2A 0%, #03001C 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "twinkle": "twinkle 2s ease-in-out infinite alternate",
        "orbit": "orbit 20s linear infinite",
        "warp": "warp 0.5s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%": { opacity: "0.3", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1.2)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(60px) rotate(-360deg)" },
        },
        warp: {
          "0%": { transform: "scaleX(1)", opacity: "1" },
          "100%": { transform: "scaleX(20)", opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px #7B2FBE44" },
          "50%": { boxShadow: "0 0 30px #7B2FBE, 0 0 60px #7B2FBE44" },
        },
      },
      boxShadow: {
        "neon-purple": "0 0 20px #7B2FBE, 0 0 40px #7B2FBE44",
        "neon-cyan": "0 0 20px #00D4FF, 0 0 40px #00D4FF44",
        "star": "0 0 6px #FFD700, 0 0 12px #FFD70044",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
