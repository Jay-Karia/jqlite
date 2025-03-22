import { loadDefaultConfig } from "./loader";
import { ConfigType } from "./types";
import { overrideConfig } from "./utils";

export class ConfigStore {
  private _config: ConfigType;

  /**
   * Initialize the config store
   */
  constructor() {
    this._config = loadDefaultConfig();
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
