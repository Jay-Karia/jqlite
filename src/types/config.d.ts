/** @format */

interface Alias {
  alias: string;
  path: string;
}

export type Config = {
  aliases?: Alias[] | null;
  fallback?: string | null;
  fuzzyDistance?: number;
  fuzzyLimit?: number;
  fuzzyIgnoreCase?: boolean;
};
