import { join } from "path";
import { skeleton } from "@skeletonlabs/tw-plugin";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
        join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}"),
    ],
    theme: {
        extend: {
            animation: {
                // Tooltip
                "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            },
            colors: {
                "white-transparent": "#ffffff61",
                "blue-accent": "#3A86FF",
                "lightblue-accent": "#00e6ff",
                "purple-accent": "#8338EC",
                "rose-accent": "#FF006E",
                "orange-accent": "#fb5607",
                "yellow-accent": "#ffbe0b",
                // flowbite-svelte
                primary: {
                    50: "#FFF5F2",
                    100: "#FFF1EE",
                    200: "#FFE4DE",
                    300: "#FFD5CC",
                    400: "#FFBCAD",
                    500: "#FE795D",
                    600: "#EF562F",
                    700: "#EB4F27",
                    800: "#CC4522",
                    900: "#A5371B",
                },
            },
            keyframes: {
                // Tooltip
                "slide-up-fade": {
                    "0%": { opacity: 0, transform: "translateY(6px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                "slide-down-fade": {
                    "0%": { opacity: 0, transform: "translateY(-6px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
        fontFamily: {
            cards: ["Poppins", "sans-serif"], //, ...defaultTheme.fontFamily.sans],
        },
    },
    plugins: [
        skeleton({
            themes: { preset: ["modern"] },
        }),
    ],
};
