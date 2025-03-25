import { loadDefaultConfig, loadDefaultConfigFile } from "./loader";
import type { ConfigType, OverrideConfigType } from "./types";
import { overrideConfig } from "./utils";

/**
 * ConfigStore class
 * @description This class is used to store the config object
 * @class ConfigStore
 */
export class ConfigStore {
  private _config: ConfigType;
  private readonly _defaultConfig: ConfigType;

  /**
   * Initialize the config store
   * @constructor
   */
  constructor() {
    this._defaultConfig = loadDefaultConfig();

    const configFile = loadDefaultConfigFile();
    if (!configFile) this._config = this._defaultConfig;
    else this._config = overrideConfig(this._defaultConfig, configFile);
  }

  /**
   * Get the config object
   * @returns {ConfigType} The config object
   */
  public get(): ConfigType {
    return this._config;
  }

  /**
   * Override the config
   * @param {ConfigType} newConfig The new config to override
   * @description This method will override the config object. It will only update the values that are passed in the new config object.
   */
  public set(newConfig: OverrideConfigType): void {
    this._config = overrideConfig(this._config, newConfig);
  }

  /**
   * Clear the config object
   * @description This method will clear the config object. It will remove all the values from the config object and reset it to the default config object.
   */
  public clear(): void {
    this._config = loadDefaultConfig();
  }
}

export const configStore = new ConfigStore();
