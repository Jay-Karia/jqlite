import { overrideDefaultConfig } from "helpers/index";
import { CONFIG_ERRORS } from "./constants/errors";
import { DEFAULT_CONFIG } from "./constants/index";
import { ConfigError } from "./errors";
import { type Config } from "./types/config";
import {
  checkDuplicateAliases,
  validateAlias,
  validateConfig,
} from "./validators/validate-config";
import { JQLite } from "index";
import { EventManager } from "hooks/eventManager";
import { getConfig, updateConfig } from "lib/globalConfig";

/**
 * Config Manager for the query language
 */
export class ConfigManager {
  private config: Config;
  public DEFAULT_CONFIG = DEFAULT_CONFIG;
  private eventManager: EventManager;

  /**
   * Initialize a new object
   * @param config The config object
   */
  constructor(jqlite: JQLite, config?: Config) {
    this.config = config ? overrideDefaultConfig(config) : DEFAULT_CONFIG;
    if (!jqlite.eventManager) this.eventManager = new EventManager();
    else this.eventManager = jqlite.eventManager;
    updateConfig(this.config);
  }

  /**
   * Add an alias to the config object
   * @param alias The alias to add
   * @param path The path to add
   */
  public addAlias(alias: string, path: string): void {
    this.eventManager.emit("BEFORE_ADD_ALIAS");
    if (alias.length == 0) throw new ConfigError(CONFIG_ERRORS.ALIAS.EMPTY);
    if (path.length == 0) throw new ConfigError(CONFIG_ERRORS.PATH.EMPTY);

    checkDuplicateAliases(this.config, { alias, path });
    this.config.aliases?.push({ alias, path });
    updateConfig(this.config);
    this.eventManager.emit("AFTER_ADD_ALIAS");
  }

  /**
   * Remove an alias from the config object
   * @param alias The alias to remove
   */
  public removeAlias(alias: string): void {
    this.eventManager.emit("BEFORE_REMOVE_ALIAS");
    validateAlias(this.config, alias);
    this.config.aliases = this.config.aliases?.filter(a => a.alias !== alias);
    updateConfig(this.config);
    this.eventManager.emit("AFTER_REMOVE_ALIAS");
  }

  /**
   * Remove all aliases from the config object
   */
  public clearAliases(): void {
    this.eventManager.emit("BEFORE_CLEAR_ALIASES");
    this.config.aliases = [];
    updateConfig(this.config);
    this.eventManager.emit("AFTER_CLEAR_ALIASES");
  }

  /**
   * Set the config object
   * @param config The config object to override
   * @returns The new config object
   */
  public setConfig(config: Config): Config {
    this.eventManager.emit("BEFORE_SET_CONFIG");
    validateConfig(config);
    this.config = { ...this.config, ...config };
    updateConfig(this.config);
    this.eventManager.emit("AFTER_SET_CONFIG");
    return this.config;
  }

  public getConfig(): Config {
    this.eventManager.emit("GET_CONFIG");
    return getConfig();
  }

  /**
   * Reset the config object to the default config object
   */
  public resetConfig() {
    this.eventManager.emit("BEFORE_RESET_CONFIG");
    this.config = DEFAULT_CONFIG;
    updateConfig(this.config);
    this.eventManager.emit("AFTER_RESET_CONFIG");
  }
}

export { DEFAULT_CONFIG, overrideDefaultConfig };
