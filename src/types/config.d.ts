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

export type CacheStrategy = "none" | "memory" | "disk";

export type DataCache = {
  strategy: CacheStrategy;
  limit?: number;
  autoSave?: boolean;
  expiration?: number;
};

export type Config = {
  aliases?: Alias[];
  fallback?: Fallback;
  enableFuzzy?: boolean;
  fuzzyDistance?: number;
  fuzzyLimit?: number;
  fuzzyIgnoreCase?: boolean;
  dataCache?: DataCache;
};
