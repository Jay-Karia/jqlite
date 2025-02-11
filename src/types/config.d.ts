export type Alias = {
  alias: string;
  path: string;
};

export type Strategies = "default" | "error" | "skip";

export type Fallback = {
  strategy: Strategies;
  value?: string;
};

export type Config = {
  aliases?: Alias[];
  fallback?: Fallback;
  enableFuzzy?: boolean;
  fuzzyDistance?: number;
  fuzzyLimit?: number;
  fuzzyIgnoreCase?: boolean;
};
