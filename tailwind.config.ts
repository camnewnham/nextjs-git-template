import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        default: "rgb(from var(--bgColor-default) r g b / <alpha-value>)",
        muted: "rgb(from var(--bgColor-muted) r g b / <alpha-value>)",
        "neutral-muted":
          "rgb(from var(--bgColor-neutral-muted) r g b / <alpha-value>)",
        "attention-muted":
          "rgb(from var(--bgColor-attention-muted) r g b / <alpha-value>)",
      },
      borderColor: {
        default: "rgb(from var(--borderColor-default) r g b / <alpha-value>)",
        muted: "rgb(from var(--borderColor-muted) r g b / <alpha-value>)",
        "neutral-muted":
          "rgb(from var(--borderColor-neutral-muted) r g b / <alpha-value>)",
        "accent-emphasis":
          "rgb(from var(--borderColor-accent-emphasis) r g b / <alpha-value>)",
        "success-emphasis":
          "rgb(from var(--borderColor-success-emphasis) r g b / <alpha-value>)",
        "attention-emphasis":
          "rgb(from var(--borderColor-attention-emphasis) r g b / <alpha-value>)",
        "danger-emphasis":
          "rgb(from var(--borderColor-danger-emphasis) r g b / <alpha-value>)",
        "done-emphasis":
          "rgb(from var(--borderColor-done-emphasis) r g b / <alpha-value>)",
      },
      colors: {
        default: "rgb(from var(--fgColor-default) r g b / <alpha-value>)",
        muted: "rgb(from var(--fgColor-muted) r g b / <alpha-value>)",
        accent: "rgb(from var(--fgColor-accent) r g b / <alpha-value>)",
        success: "rgb(from var(--fgColor-success) r g b / <alpha-value>)",
        attention: "rgb(from var(--fgColor-attention) r g b / <alpha-value>)",
        danger: "rgb(from var(--fgColor-danger) r g b / <alpha-value>)",
        done: "rgb(from var(--fgColor-done) r g b / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
