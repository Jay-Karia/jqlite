import { existsSync, readFileSync } from "fs";
import { DEFAULT_CONFIG, DEFAULT_CONFIG_FILE_NAME } from "./defaults";
import { ConfigType, DefaultConfigType } from "./types";
import { ConfigError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { validateConfig } from "./utils";

/**
 * Load the default config
 * @returns The default config
 */
export function loadDefaultConfig(): DefaultConfigType {
  return DEFAULT_CONFIG;
}

/**
 * Load a config file
 * @param {string} configFilePath The path to the config file
 * @description Reads the config file and parses it to a JSON object
 * @returns {ConfigType} The config object
 */
export function loadConfigFile(configFilePath: string): ConfigType {
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
  const isValidConfig = validateConfig(parsedConfig);
  if (!isValidConfig)
    throw new ConfigError(ERROR_MESSAGES.CONFIG.INVALID_CONFIG_FILE, {
      filePath: configFilePath,
    });

  return parsedConfig;
}

/**
 * Load the default config file
 * @description Searches the root folder for a config file and loads it
 * @returns {ConfigType} The default config object or void if not found
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
