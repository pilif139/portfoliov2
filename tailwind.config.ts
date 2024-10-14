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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // custom nord color scheme for website
      backgroundColor: {
        nord: {
          0: "#2e3440",
          1: "#3b4252",
          2: "#434c5e",
          3: "#4c566a",
        }
      },
      textColor: {
        nord: {
          0: "#d8dee9",
          1: "#e5e9f0",
          2: "#eceff4",
          3: "#8fbcbb",
          4: "#88c0d0",
          5: "#81a1c1",
          6: "#5e81ac",
          7: "#bf616a",
          8: "#d08770",
          9: "#ebcb8b",
          10: "#a3be8c",
          11: "#b48ead",
        }
      }
    },
  },
  plugins: [],
};
export default config;
