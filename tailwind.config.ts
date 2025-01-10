import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                nord: {
                    0: "#2e3440",
                    1: "#3b4252",
                    2: "#434c5e",
                    3: "#4c566a",
                    4: "#d8dee9",
                    5: "#e5e9f0",
                    6: "#eceff4",
                    7: "#8fbcbb",
                    8: "#88c0d0",
                    9: "#81a1c1",
                    10: "#5e81ac",
                    11: "#bf616a",
                    12: "#d08770",
                    13: "#ebcb8b",
                    14: "#a3be8c",
                    15: "#b48ead",
                },
            },
            // custom nord color scheme for website
        },
    },
    plugins: [],
}
export default config
