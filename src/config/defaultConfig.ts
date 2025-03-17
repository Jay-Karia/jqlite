import { Config, DataCache, Events } from "./config";

const DEFAULT_DATA_CACHE_CONFIG: DataCache = {
  type: "memory",
  limit: 10,
};

const DEFAULT_EVENTS_CONFIG: Events = {
  emit: true,
  verbose: true,
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

export { DEFAULT_CONFIG, DEFAULT_DATA_CACHE_CONFIG, DEFAULT_EVENTS_CONFIG };
