import { ConfigError } from "errors/factory";
import { loadDefaultConfig } from "./loader";
import { ConfigType } from "./types";
import { ERROR_MESSAGES } from "errors/messages";

/**
 * Override the given config with the new one
 * @param {ConfigType} oldConfig The old config
 * @param {ConfigType} newConfig The new config to override
 * @description This method will override the config object. It will only update the values that are passed in the new config object.
 * @returns {ConfigType} The new overridden config
 */
export function overrideConfig(
  oldConfig: ConfigType,
  newConfig: ConfigType
): ConfigType {
  // TODO: fix cannot deep override keys, like data streaming ones
  return { ...oldConfig, ...newConfig };
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
