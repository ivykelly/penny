import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        fontFamily: {
            sans: ["Manrope", ...fontFamily.sans],
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
} satisfies Config;
