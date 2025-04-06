/**
 * @fileoverview Configuration store for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS==========================================

import type { ConfigType, OverrideConfigType } from "./types";
import { loadDefaultConfig, loadDefaultConfigFile } from "./loader";
import { overrideConfig } from "./utils";

//========================================================================================

/**
 * Config store class
 * @description This class is used to store the config object
 */
export class ConfigStore {

  //======================================PROPERTIES=======================================

  private _config: ConfigType;
  private readonly _defaultConfig: ConfigType;

  //=====================================CONSTRUCTOR=======================================

  /**
   * Initialize the config store
   * @constructor
  */
  constructor() {
    this._defaultConfig = loadDefaultConfig();

    // Load the config file if it exists, otherwise use the default config
    const configFile = loadDefaultConfigFile();
    if (!configFile) this._config = this._defaultConfig;
    else this._config = overrideConfig(this._defaultConfig, configFile);
  }

  //======================================GETTER / SETTER====================================

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

  //===========================================CLEAR=============================================

  /**
   * Clear the config object
   */
  public clear(): void {
    this._config = loadDefaultConfig();
  }

  //==============================================================================================
}

export const configStore = new ConfigStore();
