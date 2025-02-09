import { Config } from "types/config";
import { ConfigError } from "errors";
import { CONFIG_ERRORS } from "errors";
import { validateConfig } from "@lib/validate-config";

// Default config object
const DEFAULT_CONFIG: Config = {
  aliases: null,
  fallback: null,
  fuzzyDistance: 2,
  fuzzyLimit: 1,
  fuzzyIgnoreCase: true,
};

/**
 * Override the default config object with the given config object
 * @param config The config object to override
 * @returns The new config object
 */
function overrideConfig(config: Config): Config {
  return { ...DEFAULT_CONFIG, ...config };
}

/**
 * Config Manager for the query language
 */
export class ConfigManager {
  private config: Config;

  /**
   * Initialize a new object
   * @param config The config object
   */
  constructor(config?: Config) {
    this.config = config ? overrideConfig(config) : DEFAULT_CONFIG;
  }

  /**
   * Get the config object
   * @returns The config object
   */
  public get(): Config {
    return this.config;
  }

  /**
   * Add an alias to the config object
   * @param alias The alias to add
   * @param path The path to add
   */
  public addAlias(alias: string, path: string): void {
    if (alias.length == 0) throw new ConfigError(CONFIG_ERRORS.ALIAS.EMPTY);
    if (path.length == 0) throw new ConfigError(CONFIG_ERRORS.PATH.EMPTY);

    // Checks if the alias or path already exists
    if (this.config.aliases) {
      const aliasExists = this.config.aliases.some(a => a.alias === alias);
      if (aliasExists) throw new ConfigError(CONFIG_ERRORS.ALIAS.EXISTS);

      const pathExists = this.config.aliases.some(a => a.path === path);
      if (pathExists) throw new ConfigError(CONFIG_ERRORS.PATH.EXISTS);
    } else this.config.aliases = [];

    this.config.aliases.push({ alias, path });
  }

  /**
   * Remove an alias from the config object
   * @param alias The alias to remove
   */
  public removeAlias(alias: string): void {
    // Checks if the aliases array exists
    if (!this.config.aliases)
      throw new ConfigError(CONFIG_ERRORS.ALIAS.NULL_ARRAY);

    // Checks if the given alias exists
    const aliasExists = this.config.aliases.some(a => a.alias === alias);
    if (!aliasExists) throw new ConfigError(CONFIG_ERRORS.ALIAS.NOT_FOUND);

    this.config.aliases = this.config.aliases.filter(a => a.alias !== alias);
  }

  /**
   * Remove all aliases from the config object
   */
  public clearAliases(): void {
    this.config.aliases = null;
  }

  /**
   * Set the fallback for the config object
   * @param fallback The fallback to set
   */
  public setFallback(fallback: string | null): void {
    this.config.fallback = fallback;
  }

  /**
   * Set the fuzzy distance for the config object
   * @param fuzzyDistance The fuzzy distance to set
   */
  public setFuzzyDistance(fuzzyDistance: number): void {
    if (fuzzyDistance < 0)
      throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_DISTANCE);
    this.config.fuzzyDistance = fuzzyDistance;
  }

  /**
   * Set the fuzzy limit for the config object
   * @param fuzzyLimit The fuzzy limit to set
   */
  public setFuzzyLimit(fuzzyLimit: number): void {
    if (fuzzyLimit < 0)
      throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_LIMIT);
    this.config.fuzzyLimit = fuzzyLimit;
  }

  /**
   * Set the fuzzy ignore case for the config object
   * @param fuzzyIgnoreCase The fuzzy ignore case to set
   */
  public setFuzzyIgnoreCase(fuzzyIgnoreCase: boolean): void {
    this.config.fuzzyIgnoreCase = fuzzyIgnoreCase;
  }

  /**
   * Set the config object
   * @param config The config object to override
   * @returns The new config object
   */
  public set(config: Config): Config {
    validateConfig(config);
    this.config = { ...this.config, ...config };

    return this.config;
  }
}

export { DEFAULT_CONFIG, overrideConfig };
