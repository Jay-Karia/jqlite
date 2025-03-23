import { ConfigError } from "errors/factory";
import { loadDefaultConfig } from "./loader";
import { ConfigType } from "./types";
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
export function overrideConfig<T extends Record<string, any>>(
  currentConfig: T,
  newConfig: T
): T {
  // Create a shallow copy of the current config to avoid modifying the original
  const output = { ...currentConfig };

  // Iterate through each key in the new config
  for (const key in newConfig) {
    // Skip undefined values to allow partial config updates
    if (newConfig[key] === undefined) continue;

    // Check if the current property is an object (not null, not an array)
    if (isObject(newConfig[key])) {
      // If the value is an object in the new config
      if (!(key in currentConfig) || !isObject(currentConfig[key])) {
        // Directly replace/add the value
        output[key] = newConfig[key];
      } else {
        // If both values are objects, recursively merge them.
        output[key] = overrideConfig(currentConfig[key], newConfig[key]);
      }
    } else {
      // For primitive values (strings, numbers, booleans) or arrays, directly override the value.
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
  // Check for any extra keys
  const configKeys = Object.keys(config);
  const validKeys = Object.keys(loadDefaultConfig());

  const extraKeys = configKeys.filter(key => !validKeys.includes(key));
  if (extraKeys.length > 0)
    throw new ConfigError(ERROR_MESSAGES.CONFIG.INVALID_CONFIG_KEYS, {
      extraKeys,
    });

  //------------------------------------//
  // Data Streaming Validation
  //------------------------------------//
  // if (config.dataStreaming) {
  //   const streaming = config.dataStreaming;
  //   console.log(streaming.bufferSize);
  // }

  return true;
}
