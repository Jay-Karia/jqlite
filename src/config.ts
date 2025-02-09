import { Config } from "types/config";
import { ConfigError } from "errors";
import { CONFIG_ERRORS } from "errors";

const DEFAULT_CONFIG: Config = {
  aliases: null,
  fallback: null,
  fuzzyDistance: 2,
  fuzzyLimit: 1,
  fuzzyIgnoreCase: true,
};

function overrideConfig(config: Config): Config {
  return { ...DEFAULT_CONFIG, ...config };
}

export class ConfigManager {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public get(): Config {
    return this.config;
  }

  public reset(): void {
    this.config = DEFAULT_CONFIG;
  }

  public addAlias(alias: string, path: string): void {
    if (alias.length == 0)
      throw new ConfigError(CONFIG_ERRORS.EMPTY_ALIAS);
    if (path.length == 0)
      throw new ConfigError(CONFIG_ERRORS.EMPTY_PATH);

    if (this.config.aliases) {
      const aliasExists = this.config.aliases.some(a => a.alias === alias);
      if (aliasExists)
        throw new ConfigError(CONFIG_ERRORS.ALIAS_EXISTS);

      const pathExists = this.config.aliases.some(a => a.path === path);
      if (pathExists)
        throw new ConfigError(CONFIG_ERRORS.PATH_EXISTS);

    } else
      this.config.aliases = [];
    this.config.aliases.push({ alias, path });
  }

  public removeAlias(alias: string): void {
    if (!this.config.aliases) 
      throw new ConfigError(CONFIG_ERRORS.NO_ALIASES);
    const aliasExists = this.config.aliases.some(a => a.alias === alias);
    if (!aliasExists)
      throw new ConfigError(CONFIG_ERRORS.ALIAS_NOT_FOUND);
    this.config.aliases = this.config.aliases.filter(a => a.alias !== alias);
  }

  public clearAliases(): void {
    this.config.aliases = null;
  }

  public setFallback(fallback: string): void {
    this.config.fallback = fallback;
  }

  public overrideFuzzyConfig(options: { [key: string]: any }): void {
    if (typeof options !== "object") {
      throw new Error("Fuzzy options must be an object");
    }

    const validKeys = ["fuzzyDistance", "fuzzyLimit", "fuzzyIgnoreCase"];
    Object.entries(options).forEach(([key, value]) => {
      if (validKeys.includes(key)) {
        (this.config as any)[key] = value;
      }
    });
  }

  public overrideConfig(config: Config): Config {
    return { ...DEFAULT_CONFIG, ...config };
  }
}

export { DEFAULT_CONFIG, overrideConfig };
