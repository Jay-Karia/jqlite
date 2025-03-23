import { ConfigError } from "errors/factory";
import { loadDefaultConfig } from "./loader";
import { ConfigType, DataStreamingType } from "./types";
import { ERROR_MESSAGES } from "errors/messages";
import { ErrorParams } from "errors/types";

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

  // Data Streaming validation
  if (config.dataStreaming) validateDataStreamConfig(config.dataStreaming);

  return true;
}

/**
 * Validate if the config value is natural number
 * @param {ErrorParams} errorMessage The error message to throw
 * @param {string} name THe name of the config key
 * @param {any} [value] The value of the config key
 * @description Validates if the value is a number and greater than 0
 */
export function validateNumericConfig(
  errorMessage: ErrorParams,
  name: string,
  value?: any
): void {
  // Check if the value is a number and greater than 0
  if (value !== undefined && (typeof value !== "number" || value <= 0)) {
    throw new ConfigError(errorMessage, {
      [name]: value,
    });
  }
}

/**
 * Validate the data streaming config
 * @param {DataStreamingType} dataStreaming The data streaming config to validate
 * @description Validates the data streaming config
 */
export function validateDataStreamConfig(
  dataStreaming: DataStreamingType
): void {
  // Check buffer size if it's defined
  validateNumericConfig(
    ERROR_MESSAGES.CONFIG.INVALID_BUFFER_SIZE,
    "config.dataStreaming.bufferSize",
    dataStreaming.bufferSize
  );

  // Check the chunk size if it's defined
  validateNumericConfig(
    ERROR_MESSAGES.CONFIG.INVALID_CHUNK_SIZE,
    "config.dataStreaming.chunkSize",
    dataStreaming.chunkSize
  );

  // Check the min data size if it's defined
  validateNumericConfig(
    ERROR_MESSAGES.CONFIG.INVALID_MIN_DATA_SIZE,
    "config.dataStreaming.minDataSize",
    dataStreaming.minDataSize
  );

  // Check if the chunk size is greater than the buffer size
  if (dataStreaming.chunkSize && dataStreaming.bufferSize) {
    if (dataStreaming.chunkSize > dataStreaming.bufferSize) {
      throw new ConfigError(ERROR_MESSAGES.CONFIG.ERR_BUFFER_AND_CHUNK_SIZE, {
        "config.dataStreaming.chunkSize": dataStreaming.chunkSize,
        "config.dataStreaming.bufferSize": dataStreaming.bufferSize,
      });
    }
  }

  // Check if the min data size is lesser than the buffer size
  if (dataStreaming.minDataSize && dataStreaming.bufferSize) {
    if (dataStreaming.minDataSize < dataStreaming.bufferSize) {
      throw new ConfigError(
        ERROR_MESSAGES.CONFIG.ERR_BUFFER_AND_MIN_DATA_SIZE,
        {
          "config.dataStreaming.minDataSize": dataStreaming.minDataSize,
          "config.dataStreaming.bufferSize": dataStreaming.bufferSize,
        }
      );
    }
  }
}
