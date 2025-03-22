import { existsSync } from "fs";
import { configStore } from "./store";
import { ConfigType } from "./types";
import { ConfigError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { loadConfigFile } from "./loader";

export class ConfigManager {
  /**
   * Get the config object
   * @returns The config object
   */
  public get() {
    return configStore.get();
  }

  /**
   * Override the config
   * @param newConfig The new config to override
   */
  public set(newConfig: ConfigType) {
    configStore.set(newConfig);
  }

  /**
   * Clear the config object
   */
  public clear() {
    configStore.clear();
  }

  /**
   * Load a config file
   * @param configFilePath The path to the config file
   * @returns The config object
   */
  public use(configFilePath: string) {
    // Check if the config file exists
    const isFile = existsSync(configFilePath);
    if (!isFile)
      throw new ConfigError(ERROR_MESSAGES.CONFIG.CONFIG_FILE_NOT_FOUND);

    // Get the config object
    const config = loadConfigFile(configFilePath);

    // Set the config object
    configStore.set(config);
  }
}

export const configManager = new ConfigManager();
