import { Config, DataCache } from "types/config";

const ERROR_DOCS_BASE_URL = "https://example.com/docs/errors";

const DEFAULT_DATA_CACHE_CONFIG: DataCache = {
  type: "memory",
  limit: 10,
};

const DEFAULT_EVENTS_CONFIG = {
  emit: true,
  defaultEvents: true,
};

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
  dataCache: DEFAULT_DATA_CACHE_CONFIG,
  events: DEFAULT_EVENTS_CONFIG,
};

export {
  ERROR_DOCS_BASE_URL,
  DEFAULT_CONFIG,
  DEFAULT_DATA_CACHE_CONFIG,
  DEFAULT_EVENTS_CONFIG,
};
