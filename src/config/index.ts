import { overrideDefaultConfig } from "helpers/index";
import { CONFIG_ERRORS } from "../constants/errors";
import { DEFAULT_CONFIG } from "./defaultConfig";
import { ConfigError } from "../errors";
import { type Config } from "./config";
import {
  checkDuplicateAliases,
  validateAlias,
  validateConfig,
} from "../validators/validate-config";
import { getConfig, getDefaultConfig, updateConfig } from "lib/globalConfig";
import { emit } from "lib/globalEmitter";

/**
 * Config Manager for the query language
 */
export class ConfigManager {
  private config: Config;
  public DEFAULT_CONFIG = getDefaultConfig();

  /**
   * Initialize a new object
   * @param config The config object
   */
  constructor(config?: Config) {
    this.config = config ? overrideDefaultConfig(config) : DEFAULT_CONFIG;
    updateConfig(this.config);
  }

  /**
   * Add an alias to the config object
   * @param alias The alias to add
   * @param path The path to add
   */
  public addAlias(alias: string, path: string): void {
    emit("BEFORE_ADD_ALIAS");
    if (alias.length == 0) throw new ConfigError(CONFIG_ERRORS.ALIAS.EMPTY);
    if (path.length == 0) throw new ConfigError(CONFIG_ERRORS.PATH.EMPTY);

    checkDuplicateAliases(this.config, { alias, path });
    this.config.aliases?.push({ alias, path });
    updateConfig(this.config);
    emit("AFTER_ADD_ALIAS", alias, path);
  }

  /**
   * Remove an alias from the config object
   * @param alias The alias to remove
   */
  public removeAlias(alias: string): void {
    emit("BEFORE_REMOVE_ALIAS");
    validateAlias(this.config, alias);
    this.config.aliases = this.config.aliases?.filter(a => a.alias !== alias);
    updateConfig(this.config);
    emit("AFTER_REMOVE_ALIAS", alias);
  }

  /**
   * Remove all aliases from the config object
   */
  public clearAliases(): void {
    emit("BEFORE_CLEAR_ALIASES");
    const aliases: string[] = this.config.aliases?.map(a => a.alias) || [];
    this.config.aliases = [];
    updateConfig(this.config);
    emit("AFTER_CLEAR_ALIASES", aliases);
  }

  /**
   * Set the config object
   * @param config The config object to override
   * @returns The new config object
   */
  public setConfig(config: Config): Config {
    emit("BEFORE_SET_CONFIG", Object.keys(config));
    validateConfig(config);
    this.config = { ...this.config, ...config };
    updateConfig(this.config);
    emit("AFTER_SET_CONFIG", Object.keys(config));
    return this.config;
  }

  /**
   * Get the config object
   * @returns The config object
   */
  public getConfig(): Config {
    emit("GET_CONFIG");
    return getConfig();
  }

  /**
   * Reset the config object to the default config object
   */
  public resetConfig() {
    emit("BEFORE_RESET_CONFIG");
    this.config = DEFAULT_CONFIG;
    updateConfig(this.config);
    emit("AFTER_RESET_CONFIG");
  }
}

export { DEFAULT_CONFIG, overrideDefaultConfig };
