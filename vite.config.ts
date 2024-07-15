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
            "@components": "/src/app/web/components",
            "@screens": "/src/app/web/screens",
            "@routes": "/src/app/web/routes",
            "@assets": "/src/app/assets",
            "@styles": "/src/app/web/styles",
            "@constants": "/src/app/utils/constants",
            "@integrations": "/src/@clean/integrations/modules",
            "@enums": "/src/@clean/shared/domain/enums",
            "@interfaces": "/src/app/utils/@types/interfaces",
            "@functions": "/src/app/utils/functions",
            "@formatters": "/src/app/utils/formatters"
        }
    },
    optimizeDeps: {
        exclude: ["react-spinners"]
    }
});
