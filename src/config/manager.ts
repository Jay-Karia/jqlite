import { existsSync } from "fs";
import { configStore } from "./store";
import { ConfigType } from "./types";
import { ConfigError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { loadConfigFile } from "./loader";

/**
 * ConfigManager class
 * @description This class is used to manage the config object.
 * @class
 */
export class ConfigManager {
  /**
   * Get the config object
   * @description This method returns the config object from the config store. If the config object is not found, it will return the default config object.
   * @returns {ConfigType} The config object
   * @example
   * ```ts
   * const config = configManager.get();
   * ```
   * @author Jay-Karia
   */
  public get(): ConfigType {
    return configStore.get();
  }

  /**
   * Override the config
   * @param {ConfigType} newConfig The new config to override
   * @description This method will override the config object. It will only update the values that are passed in the new config object.
   * @returns {ConfigType} The config object
   * @example
   * ```ts
   * const newConfig = {
   *   createIfMissing = false,
   * }
   * configManager.set(newConfig);
   * ```
   * @author Jay-Karia
   */
  public set(newConfig: ConfigType): ConfigType {
    configStore.set(newConfig);
    return configStore.get();
  }

  /**
   * Clear the config object
   * @description This method will clear the config object. It will remove all the values from the config object and reset it to the default config object.
   * @returns The config object
   * @author Jay-Karia
   */
  public clear() {
    configStore.clear();
  }

  /**
   * Load a config file
   * @param {string} configFilePath The path to the config file
   * @description This method will load a config file and override the config object with the values from the config file. It will only update the values that are passed in the config file.
   * @returns {ConfigType} The config object
   * @example
   * ```ts
   * configManager.use("./config.json");
   * ```
   * @throws {ConfigError} If the config file.
   * @throws {ConfigError} If the config file is not found
   * @throws {ConfigError} If the config file is not valid
   * @author Jay-Karia
   */
  public use(configFilePath: string): ConfigType {
    // Check if the config file exists
    const isFile = existsSync(configFilePath);
    if (!isFile)
      throw new ConfigError(ERROR_MESSAGES.CONFIG.CONFIG_FILE_NOT_FOUND);

    // Get the config object
    const config = loadConfigFile(configFilePath);

    // Set the config object
    return this.set(config);
  }
}

export const configManager = new ConfigManager();
