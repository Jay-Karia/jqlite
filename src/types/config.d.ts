export type Alias = {
  alias: string;
  path: string;
};

export type Strategies = "default" | "error" | "skip" | "infer";
export type InferRules = {
  alternateKeys?: string[];
  alternateQueries?: string[];
};

export type Fallback = {
  strategy: Strategies;
  value?: string;
  inferRules?: InferRules;
};

export type Config = {
  aliases?: Alias[];
  fallback?: Fallback;
  enableFuzzy?: boolean;
  fuzzyDistance?: number;
  fuzzyLimit?: number;
  fuzzyIgnoreCase?: boolean;
};
