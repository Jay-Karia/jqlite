export type Alias = {
  alias: string;
  path: string;
};

export type Config = {
  aliases?: Alias[];
  fallback?: string | null;
  fuzzyDistance?: number;
  fuzzyLimit?: number;
  fuzzyIgnoreCase?: boolean;
};
