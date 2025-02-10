import { Config } from "types/config";
import { ConfigError } from "errors";
import { CONFIG_ERRORS } from "errors";
import { validateConfig } from "@lib/validate-config";
import { DEFAULT_CONFIG } from "@constants/index";

/**
 * Override the default config object with the given config object
 * @param config The config object to override
 * @returns The new config object
 */
function overrideConfig(config: Config): Config {
  validateConfig(config);
  return { ...DEFAULT_CONFIG, ...config };
}

/**
 * Config Manager for the query language
 */
export class ConfigManager {
  private config: Config;
  public default = DEFAULT_CONFIG;

  public aliases = DEFAULT_CONFIG.aliases;
  public fuzzyDistance = DEFAULT_CONFIG.fuzzyDistance;
  public fuzzyIgnoreCase = DEFAULT_CONFIG.fuzzyIgnoreCase;
  public fuzzyLimit = DEFAULT_CONFIG.fuzzyLimit;
  public fallback = DEFAULT_CONFIG.fallback;

  /**
   * Initialize a new object
   * @param config The config object
   */
  constructor(config?: Config) {
    this.config = config ? overrideConfig(config) : DEFAULT_CONFIG;

    this.aliases = this.config.aliases;
    this.fuzzyDistance = this.config.fuzzyDistance;
    this.fuzzyIgnoreCase = this.config.fuzzyIgnoreCase;
    this.fuzzyLimit = this.config.fuzzyLimit;
    this.fallback = this.config.fallback;
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
    // this.aliases = this.config.aliases;
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

    this.config.aliases = this.aliases = this.config.aliases.filter(
      a => a.alias !== alias
    );
  }

  /**
   * Remove all aliases from the config object
   */
  public clearAliases(): void {
    this.config.aliases = this.aliases = null;
  }

  /**
   * Set the fallback for the config object
   * @param fallback The fallback to set
   */
  public setFallback(fallback: string | null): void {
    this.config.fallback = this.fallback = fallback;
  }

  /**
   * Set the fuzzy distance for the config object
   * @param fuzzyDistance The fuzzy distance to set
   */
  public setFuzzyDistance(fuzzyDistance: number): void {
    if (fuzzyDistance < 0)
      throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_DISTANCE);
    this.config.fuzzyDistance = this.fuzzyDistance = fuzzyDistance;
  }

  /**
   * Set the fuzzy limit for the config object
   * @param fuzzyLimit The fuzzy limit to set
   */
  public setFuzzyLimit(fuzzyLimit: number): void {
    if (fuzzyLimit < 0)
      throw new ConfigError(CONFIG_ERRORS.FUZZY.INVALID_LIMIT);
    this.config.fuzzyLimit = this.fuzzyLimit = fuzzyLimit;
  }

  /**
   * Set the fuzzy ignore case for the config object
   * @param fuzzyIgnoreCase The fuzzy ignore case to set
   */
  public setFuzzyIgnoreCase(fuzzyIgnoreCase: boolean): void {
    this.config.fuzzyIgnoreCase = this.fuzzyIgnoreCase = fuzzyIgnoreCase;
  }

  /**
   * Set the config object
   * @param config The config object to override
   * @returns The new config object
   */
  public set(config: Config): Config {
    validateConfig(config);
    this.config = { ...this.config, ...config };
    this.aliases = this.config.aliases;
    this.fuzzyDistance = this.config.fuzzyDistance;
    this.fuzzyIgnoreCase = this.config.fuzzyIgnoreCase;
    this.fuzzyLimit = this.config.fuzzyLimit;
    this.fallback = this.config.fallback;

    return this.config;
  }

  /**
   * Reset the config object to the default config object
   */
  public reset() {
    this.config = DEFAULT_CONFIG;
    this.aliases = DEFAULT_CONFIG.aliases;
    this.fuzzyDistance = DEFAULT_CONFIG.fuzzyDistance;
    this.fuzzyIgnoreCase = DEFAULT_CONFIG.fuzzyIgnoreCase;
    this.fuzzyLimit = DEFAULT_CONFIG.fuzzyLimit;
    this.fallback = DEFAULT_CONFIG.fallback;
  }
}

export { DEFAULT_CONFIG, overrideConfig };
