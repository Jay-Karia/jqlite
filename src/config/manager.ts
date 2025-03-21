import {configStore} from "./store";
import {ConfigType} from "./types";

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
}

export const configManager = new ConfigManager();
