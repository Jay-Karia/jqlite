import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import tsparser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,

  { languageOptions: { globals: globals.node } },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
        sourceType: "module",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      semi: "warn",
      camelcase: "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      // "no-console": "warn",
      "no-debugger": "error",

      "@typescript-eslint/explicit-function-return-type": "error", // Force return types
      "@typescript-eslint/consistent-type-imports": "warn", // Use `import type {}` when possible
      "@typescript-eslint/no-non-null-assertion": "warn", // Avoid `!` non-null assertions
      "@typescript-eslint/no-inferrable-types": "warn", // Prevent redundant types
      "@typescript-eslint/prefer-readonly": "warn", // Prefer `readonly` properties

      "no-var": "error", // No `var`, only `let` or `const`
      "prefer-const": "warn", // Use `const` when possible
      "no-duplicate-imports": "warn", // Prevent duplicate imports
      "prefer-template": "warn", // Use template literals instead of string concatenation

      "no-return-await": "error", // `return await` is unnecessary
      "no-unsafe-finally": "warn", // Avoid unsafe `finally` blocks
      "require-await": "warn", // Disallow async functions without `await`

      "import/newline-after-import": "warn", // Require a newline after imports
    },
  },
  {
    files: ["src/config/manager.ts", "src/data/manager.ts"],
    rules: {
      "no-console": "off",
    },
  }
);
