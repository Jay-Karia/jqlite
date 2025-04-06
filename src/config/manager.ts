/**
 * @fileoverview Configuration manager for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ConfigType, OverrideConfigType } from "./types";
import { existsSync } from "fs";
import { loadConfigFile } from "./loader";
import { configStore } from "./store";
import { ConfigError } from "../errors/factory";
import { ERROR_MESSAGES } from "../errors/messages";

//=================================================================================

/**
 * Config manager class
 * @description This class is used to manage the config object.
 */
export class ConfigManager {

  //======================================GETTER / SETTER====================================

  /**
   * Get the config object
   * @description This method returns the config object from the config store. If the config object is not found, it will return the default config object.
   * @returns {ConfigType} The config object
   */
  public get(): ConfigType {
    return configStore.get();
  }

  /**
   * Override the config
   * @param {ConfigType} newConfig The new config to override
   * @description This method will override the config object. It will only update the values that are passed in the new config object.
   * @returns {ConfigType} The config object
   */
  public set(newConfig: OverrideConfigType): ConfigType {
    configStore.set(newConfig);
    return configStore.get();
  }

  //======================================LOADER====================================

  /**
   * Load a config file
   * @param {string} configFilePath The path to the config file
   * @description This method will load a config file and override the config object with the values from the config file. It will only update the values that are passed in the config file.
   * @returns {ConfigType} The config object
   */
  public load(configFilePath: string): ConfigType {
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


  //=======================================PRINT======================================

  /**
   * Print the config
   * @description This method will print the config object to the console.
   */
  public print(): void {
    console.log(this.get());
  }

  //=======================================CLEAR======================================

  /**
   * Clear the config object
   * @description This method will clear the config object. It will remove all the values from the config object and reset it to the default config object.
   * @returns {ConfigType} The config object
   */
  public clear(): ConfigType {
    configStore.clear();
    return configStore.get();
  }

  //====================================================================================

}

export const config = new ConfigManager();
