import { Config, DataCache } from "types/config";

const ERROR_DOCS_BASE_URL = "https://example.com/docs/errors";

const DEFAULT_CONFIG: Config = {
  aliases: [],
  fallback: {
    strategy: "default",
    value: "No value",
  },
  fuzzy: {
    enabled: false,
    distance: 2,
    limit: 1,
    ignoreCase: true,
  },
  dataCache: {
    type: "memory",
    enabled: true,
  },
};

const DEFAULT_DATA_CACHE_CONFIG: DataCache = {
  type: "memory",
  enabled: true,
};

export { ERROR_DOCS_BASE_URL, DEFAULT_CONFIG, DEFAULT_DATA_CACHE_CONFIG };
