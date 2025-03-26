import { ConfigError } from "errors/factory";
import { loadDefaultConfig } from "./loader";
import type { ConfigType } from "./types";
import { ERROR_MESSAGES } from "errors/messages";

/**
 * Check if a value is an object
 * @param {any} item The item to check
 * @returns {boolean} Whether the item is an object
 */
function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Override the given config with the new one
 * @param currentConfig The old config
 * @param newConfig The new config to override
 * @description Deep merges the new config into the old one
 * @returns The new overridden config
 */
export function overrideConfig<ConfigType>(
  currentConfig: ConfigType,
  newConfig: Partial<ConfigType>
): ConfigType {
  // Create a shallow copy of the current config to avoid modifying the original
  const output = { ...currentConfig };

  for (const key in newConfig) {
    if (newConfig[key] === undefined) continue;

    // Check if the current property is an object.
    if (isObject(newConfig[key])) {
      // If the key is not an object. Then replace it with the new value.
      if (currentConfig[key] === undefined || !isObject(currentConfig[key])) {
        output[key] = newConfig[key];
      } else {
        // If value is object, recursively merge them.
        output[key] = overrideConfig(currentConfig[key], newConfig[key]);
      }
    } else {
      // For primitives , directly override the value.
      output[key] = newConfig[key];
    }
  }
  return output;
}

/**
 * Check if the config is valid
 * @param {ConfigType} config The config object to validate
 * @returns {boolean} Whether the config is valid or not
 */
export function validateConfig(config: ConfigType): boolean {
  // Get the config keys
  const configKeys = Object.keys(config);
  const validKeys = Object.keys(loadDefaultConfig());

  // Check for any extra keys
  const extraKeys = configKeys.filter(key => !validKeys.includes(key));
  if (extraKeys.length > 0)
    throw new ConfigError(ERROR_MESSAGES.CONFIG.INVALID_CONFIG_KEYS, {
      extraKeys,
    });

  // Validate config values

  return true;
}
