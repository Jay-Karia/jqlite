import { loadDefaultConfig, loadDefaultConfigFile } from "./loader";
import { ConfigType, DefaultConfigType } from "./types";
import { overrideConfig } from "./utils";

export class ConfigStore {
  private _config: ConfigType;
  private _defaultConfig: DefaultConfigType;

  /**
   * Initialize the config store
   */
  constructor() {
    this._defaultConfig = loadDefaultConfig();

    const configFile = loadDefaultConfigFile();
    if (!configFile) this._config = this._defaultConfig;
    else this._config = overrideConfig(this._defaultConfig, configFile);
  }

  /**
   * Get the config object
   * @returns The config object
   */
  public get() {
    return this._config;
  }

  /**
   * Override the config
   * @param newConfig The new config to override
   */
  public set(newConfig: ConfigType) {
    this._config = overrideConfig(this._config, newConfig);
  }

  /**
   * Clear the config object
   */
  public clear() {
    this._config = loadDefaultConfig();
  }
}

export const configStore = new ConfigStore();
