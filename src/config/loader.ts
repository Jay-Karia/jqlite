import { readFileSync } from "fs";
import { DEFAULT_CONFIG } from "./defaults";
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
 * @param configFilePath The path to the config file
 * @returns The config object
 */
export function loadConfigFile(configFilePath: string): ConfigType {
  const config = readFileSync(configFilePath, "utf-8");

  // Check if the config has valid JSON
  let parsedConfig: ConfigType;
  try {
    parsedConfig = JSON.parse(config);
  } catch {
    throw new ConfigError(ERROR_MESSAGES.CONFIG.NOT_JSON_CONFIG);
  }

  // Validate the config
  const isValidConfig = validateConfig(parsedConfig);
  if (!isValidConfig)
    throw new ConfigError(ERROR_MESSAGES.CONFIG.INVALID_CONFIG_FILE);

  return parsedConfig;
}
