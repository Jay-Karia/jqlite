export const EVENTS = {
  // Data Events
  BEFORE_SET_DATA: "beforeSetData",
  AFTER_SET_DATA: "afterSetData",
  BEFORE_CLEAR_DATA: "beforeClearData",
  AFTER_CLEAR_DATA: "afterClearData",
  BEFORE_RESOLVE_DATA: "beforeResolveData",
  AFTER_RESOLVE_DATA: "afterResolveData",
  GET_DATA: "getData",
  // Config Events
  BEFORE_SET_CONFIG: "beforeSetConfig",
  AFTER_SET_CONFIG: "afterSetConfig",
  GET_CONFIG: "getConfig",
  BEFORE_ADD_ALIAS: "beforeAddAlias",
  // Cache Events
  CACHE_HIT: "cacheHit",
  CACHE_MISS: "cacheMiss",
  CACHE_EXPIRED: "cacheExpired",
  CACHE_CLEARED: "cacheCleared",
} as const;

export type EventType = keyof typeof EVENTS;
