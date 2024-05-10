import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            devTarget: "es2022"
        })
    ],
    resolve: {
        alias: {
            "@components": "/src/components",
            "@screens": "/src/screens",
            "@routes": "/src/routes",
            "@assets": "/src/assets",
            "@style": "/src/style",
            "@util": "/src/util",
            "@constants": "/src/constants",
            "@integrations": "/src/integrations/modules",
            "@enum": "/src/enum"
        }
    },
    optimizeDeps: {
        exclude: ["react-spinners"]
    }
});
