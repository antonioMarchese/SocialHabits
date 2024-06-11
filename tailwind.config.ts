import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        error: "#dc2626",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#8b5cf6",
        "primary-light": "#a78bfa",
        "primary-dark": "#7c3aed",
        secondary: "#262626",
        "secondary-light": "#404040",
        "secondary-dark": "#171717",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        grow: {
          from: {
            transform: "scale(0)",
          },
          to: {
            transform: "scale(1)",
          },
        },
        opacityPass: {
          0: {
            opacity: "100%",
          },
          "50%": {
            opacity: "70%",
          },
          "100%": {
            opacity: "100%",
          },
        },
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out",
        slideUp: "slideUp 0.3s ease-out",
        contentShow: "grow 150ms linear",
        opacityPass: "opacityPass 1.2s infinite",
      },
      screens: {
        "2xs": "400px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
