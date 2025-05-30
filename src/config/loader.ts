/**
 * @fileoverview Loader for jqlite configuration.
 * @author Jay-Karia
 */

"use strict";

//====================================IMPORTS=====================================

import type { ConfigType } from "./types";
import { existsSync, readFileSync } from "fs";
import { ConfigError } from "../errors/factory";
import { ERROR_MESSAGES } from "../errors/messages";
import { DEFAULT_CONFIG, DEFAULT_CONFIG_FILE_NAME } from "./defaults";
import { validateConfig } from "./utils";

//================================================================================

/**
 * Load the default config
 * @returns {ConfigType} The default config
 */
export function loadDefaultConfig(): ConfigType {
  return DEFAULT_CONFIG;
}

/**
 * Load a config file
 * @param {string} configFilePath The path to the config file
 * @returns {ConfigType} The config object
 */
export function loadConfigFile(configFilePath: string): ConfigType {
  // Read the config file
  const config = readFileSync(configFilePath, "utf-8");

  // Check if the config has valid JSON
  let parsedConfig: ConfigType;
  try {
    parsedConfig = JSON.parse(config);
  } catch {
    throw new ConfigError(ERROR_MESSAGES.CONFIG.NOT_JSON_CONFIG, {
      filePath: configFilePath,
    });
  }

  // Validate the config
  validateConfig(parsedConfig);

  return parsedConfig;
}

/**
 * Load the default config file
 * @returns {ConfigType | void} The default config object or void if not found
 */
export function loadDefaultConfigFile(): ConfigType | void {
  // Search the root folder for a config file
  const fileName = DEFAULT_CONFIG_FILE_NAME;
  const filePath = `${process.cwd()}/${fileName}`;

  // Check if the config file exists
  const isFile = existsSync(filePath);
  if (!isFile) return;

  // Get the config object
  const config = loadConfigFile(filePath);
  return config;
}
