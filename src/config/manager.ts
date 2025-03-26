import { existsSync } from "fs";
import { loadConfigFile } from "./loader";
import { configStore } from "./store";
import type { ConfigType, OverrideConfigType } from "./types";
import { ConfigError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";

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
   */
  public set(newConfig: OverrideConfigType): ConfigType {
    configStore.set(newConfig);
    return configStore.get();
  }

  /**
   * Clear the config object
   * @description This method will clear the config object. It will remove all the values from the config object and reset it to the default config object.
   * @returns The config object
   */
  public clear(): ConfigType {
    configStore.clear();
    return configStore.get();
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
   */
  public use(configFilePath: string): ConfigType {
    // Check if the config file exists
    const isFile = existsSync(configFilePath);
    if (!isFile)
      throw new ConfigError(ERROR_MESSAGES.CONFIG.CONFIG_FILE_NOT_FOUND, {
        filePath: configFilePath,
      });

    // Get the config object
    const config = loadConfigFile(configFilePath);

    // Set the config object
    return this.set(config);
  }

  /**
   * Print the config
   * @description This method will print the config object to the console.
   * @example
   * ```ts
   * configManager.print();
   * ```
   */
  public print(): void {
    console.log(this.get());
  }
}

export const config = new ConfigManager();
