module.exports = {
    root: true,
    env: { browser: true, es2022: true, jest: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended"
    ],
    ignorePatterns: ["dist", ".eslintrc.mjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "@typescript-eslint"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname
    },
    rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto"
            }
        ],
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true }
        ],
        "@typescript-eslint/no-non-null-assertion": "off"
    }
};
