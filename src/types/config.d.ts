export type Alias = {
  alias: string;
  path: string;
};

export type FallbackStrategy = "default" | "error" | "skip" | "infer";

export type InferRules = {
  alternateKeys?: string[];
  alternateQueries?: string[];
};

export type Fallback = {
  strategy: FallbackStrategy;
  value?: string;
  inferRules?: InferRules;
};

export type CacheType = "none" | "memory" | "disk";

export type DataCache = {
  type: CacheType;
  limit?: number;
  expiration?: Date;
};

export type Fuzzy = {
  enabled?: boolean;
  distance?: number;
  limit?: number;
  ignoreCase?: boolean;
};

export type Events = {
  emit?: boolean;
}

export type Config = {
  aliases?: Alias[];
  fallback?: Fallback;
  fuzzy?: Fuzzy;
  dataCache?: DataCache;
  events?: Events;
};
