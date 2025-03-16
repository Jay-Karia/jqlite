export const EVENTS = {
  BEFORE_SET_DATA: "beforeSetData",
  AFTER_SET_DATA: "afterSetData",
  BEFORE_CLEAR_DATA: "beforeClearData",
  AFTER_CLEAR_DATA: "afterClearData",
  BEFORE_RESOLVE_DATA: "beforeResolveData",
  AFTER_RESOLVE_DATA: "afterResolveData",
  BEFORE_SET_CONFIG: "beforeSetConfig",
  AFTER_SET_CONFIG: "afterSetConfig",
  BEFORE_GET_CONFIG: "beforeGetConfig",
  AFTER_GET_CONFIG: "afterGetConfig",
  BEFORE_GET_DATA: "beforeGetData",
  AFTER_GET_DATA: "afterGetData",
  CACHE_HIT: "cacheHit",
  CACHE_MISS: "cacheMiss",
  CACHE_EXPIRED: "cacheExpired",
  CACHE_CLEARED: "cacheCleared",
} as const;

export type EventType = keyof typeof EVENTS;
