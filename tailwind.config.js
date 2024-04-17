/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            "2xs": "100px",
            xs: "515px",
            ...defaultTheme.screens
        },
        extend: {
            colors: {
                bg: "#E5E9EC",
                title: "#1D232C",
                "sb-bg": "#F9FAFC",
                "sb-t": "#2684FF",
                "sb-tb": "#F0F3FB",
                "sb-p": "#673366",
                bcard: "#0077E4",
                dbcard: "#004587"
            }
        }
    },
    plugins: []
};
