/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "#E5E9EC",
                "sb-bg": "#F9FAFC",
                "sb-t": "#2684FF",
                "sb-tb": "#F0F3FB",
                "sb-p": "#673366"
            }
        }
    },
    plugins: []
};
