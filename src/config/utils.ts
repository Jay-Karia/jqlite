import { ConfigError } from "errors/factory";
import { loadDefaultConfig } from "./loader";
import { ConfigType } from "./types";
import { ERROR_MESSAGES } from "errors/messages";

/**
 * Override the given config with the new one
 * @param oldConfig The old config
 * @param newConfig The new config to override
 * @returns The new overridden config
 */
export function overrideConfig(
  oldConfig: ConfigType,
  newConfig: ConfigType
): ConfigType {
  return { ...oldConfig, ...newConfig };
}

/**
 * Check if the config is valid
 * @param config The config object to validate
 * @returns Whether the config is valid or not
 */
export function validateConfig(config: ConfigType): boolean {
  // Check for any extra keys
  const configKeys = Object.keys(config);
  const validKeys = Object.keys(loadDefaultConfig());

  const extraKeys = configKeys.filter(key => !validKeys.includes(key));
  if (extraKeys.length > 0)
    throw new ConfigError(ERROR_MESSAGES.CONFIG.INVALID_CONFIG_KEYS);

  // Validate the values if required

  return true;
}
