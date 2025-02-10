import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,

  { languageOptions: { globals: globals.node } },
  {
    ignores: [
      "**/*.config.js",
      "!**/eslint.config.js",
      "pnpm-workspace.yaml",
      "pnpm-lock.yaml",
      ".npmrc",
      ".gitignore",
      "build/index.js"
    ],
    rules: {
      semi: "error",
      camelcase: "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
