import { defineConfig, coverageConfigDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, "**/scripts/**", "playground.ts", "testing-jqlite/index.js", "src/parser/**", "src/core/**"],
    },
    testTimeout: 10000,
    // ui: true,
  },
});
