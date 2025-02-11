import { Config } from "types/config";

const ERROR_DOCS_BASE_URL = "https://example.com/docs/errors";

const DEFAULT_CONFIG: Config = {
  aliases: [],
  fallback: {
    strategy: "default",
    value: "No value"
  },
  enableFuzzy: false,
  fuzzyDistance: 2,
  fuzzyLimit: 1,
  fuzzyIgnoreCase: true,
};

export { ERROR_DOCS_BASE_URL, DEFAULT_CONFIG };
