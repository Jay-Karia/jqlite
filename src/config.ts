import { InferRules, Strategies, type Config } from "./types/config";
import { ConfigError } from "./utils/errors";
import { CONFIG_ERRORS } from "./constants/errors";
import {
  checkDuplicateAliases,
  validateAlias,
  validateConfig,
  validateFallback,
  validateFuzzyOptions,
} from "./lib/validate-config";
import { DEFAULT_CONFIG } from "./constants/index";

/**
 * Override the default config object with the given config object
 * @param config The config object to override
 * @returns The new config object
 */
function overrideDefaultConfig(config: Config): Config {
  validateConfig(config);
  return { ...DEFAULT_CONFIG, ...config };
}

/**
 * Config Manager for the query language
 */
export class ConfigManager {
  public config: Config;
  public defaultConfig = DEFAULT_CONFIG;

  /**
   * Initialize a new object
   * @param config The config object
   */
  constructor(config?: Config) {
    this.config = config ? overrideDefaultConfig(config) : DEFAULT_CONFIG;
  }

  /**
   * Add an alias to the config object
   * @param alias The alias to add
   * @param path The path to add
   */
  public addAlias(alias: string, path: string): void {
    if (alias.length == 0) throw new ConfigError(CONFIG_ERRORS.ALIAS.EMPTY);
    if (path.length == 0) throw new ConfigError(CONFIG_ERRORS.PATH.EMPTY);

    checkDuplicateAliases(this.config, { alias, path });
    this.config.aliases?.push({ alias, path });
  }

  /**
   * Remove an alias from the config object
   * @param alias The alias to remove
   */
  public removeAlias(alias: string): void {
    validateAlias(this.config, alias);
    this.config.aliases = this.config.aliases?.filter(a => a.alias !== alias);
  }

  /**
   * Remove all aliases from the config object
   */
  public clearAliases(): void {
    this.config.aliases = [];
  }

  /**
   * Set the fallback for the config object
   * @param fallback The fallback to set
   */
  public overrideFallback({
    strategy,
    value,
    inferRules,
  }: {
    strategy?: Strategies;
    value?: string;
    inferRules?: InferRules;
  }): void {
    // override the fallback object with the given keys
    if (this.config.fallback && strategy) {
      validateFallback({ strategy, value, inferRules });
      this.config.fallback = { strategy, value, inferRules };
    }
  }

  /**
   * Set the fuzzy distance for the config object
   * @param fuzzyDistance The fuzzy distance to set
   */
  public setFuzzyDistance(fuzzyDistance: number): void {
    validateFuzzyOptions(fuzzyDistance);
    this.config.fuzzyDistance = fuzzyDistance;
  }

  /**
   * Set the fuzzy limit for the config object
   * @param fuzzyLimit The fuzzy limit to set
   */
  public setFuzzyLimit(fuzzyLimit: number): void {
    validateFuzzyOptions(undefined, fuzzyLimit);
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
   * Enables global fuzzy search to all variables
   * @param fuzzy The fuzzy to set
   */
  public setFuzzy(fuzzy: boolean): void {
    this.config.enableFuzzy = fuzzy;
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

  /**
   * Reset the config object to the default config object
   */
  public reset() {
    this.config = DEFAULT_CONFIG;
  }
}

export { DEFAULT_CONFIG, overrideDefaultConfig };
