import { Config, DataCache } from "types/config";

const ERROR_DOCS_BASE_URL = "https://example.com/docs/errors";

const DEFAULT_CONFIG: Config = {
  aliases: [],
  fallback: {
    strategy: "default",
    value: "No value",
  },
  fuzzy: {
    enable: false,
    distance: 2,
    limit: 1,
    ignoreCase: true,
  },
  dataCache: {
    type: "memory",
    enable: true,
  },
};

const DEFAULT_DATA_CACHE_CONFIG: DataCache = {
  type: "memory",
  enable: true,
};

export { ERROR_DOCS_BASE_URL, DEFAULT_CONFIG, DEFAULT_DATA_CACHE_CONFIG };
