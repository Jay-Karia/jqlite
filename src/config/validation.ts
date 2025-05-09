/**
 * @fileoverview Config keys validation
 */

"use strict";

//======================================IMPORTS====================================

import type { ConfigType } from "./types";
import { ConfigError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";

//=================================================================================

/**
 * Check if the config values are strings
 * @param {ConfigType} config The config object to validate
 * @param {Array<string>} keys The keys to check
 * @returns {boolean} Whether the config values are strings or not
 */
export function validateStringValues(config: ConfigType, keys: (keyof ConfigType)[]): boolean {
  for (const key of keys) {
    if (config[key] && typeof config[key] !== "string") {
      throw new ConfigError(ERROR_MESSAGES.CONFIG.INVALID_CONFIG_VALUE, {
        key,
        expected: "string",
        received: typeof config[key],
        value: config[key],
      });
    }
  }
  return true;
}

/**
 * Check if the config values are booleans
 * @param {ConfigType} config The config object to validate
 * @param {Array<string>} keys The keys to check
 * @returns {boolean} Whether the config values are booleans or not
 */
export function validateBooleanValues(config: ConfigType, keys: (keyof ConfigType)[]): boolean {
  for (const key of keys) {
    if (config[key] && typeof config[key] !== "boolean") {
      throw new ConfigError(ERROR_MESSAGES.CONFIG.INVALID_CONFIG_VALUE, {
        key,
        expected: "boolean",
        received: typeof config[key],
        value: config[key],
      });
    }
  }
  return true;
}

/**
 * Check if the config values match specific allowed values
 * @param {ConfigType} config The config object to validate
 * @param {Array<string>} keys The keys to check
 * @param {Array<T>} allowedValues The allowed values
 * @returns {boolean} Whether the config values match the allowed values
 */
export function validateCustomValues<T>(config: ConfigType, keys: (keyof ConfigType)[], allowedValues: T[]): boolean {
  for (const key of keys) {
    if (config[key] && !allowedValues.includes(config[key] as unknown as T)) {
      throw new ConfigError(ERROR_MESSAGES.CONFIG.INVALID_CONFIG_VALUE, {
        key,
        expected: allowedValues.join(" | "),
        received: config[key],
        value: config[key],
      });
    }
  }
  return true;
}
