/**
 * @fileoverview Utility functions for jqlite data management.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { configStore } from "config/store";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";

//=================================================================================

/**
 * Parse JSON data
 * @param {string} data The JSON data to parse
 * @returns {object | null} The parsed JSON data
 */
export function parseJson(data: string): object | null {
  try {
    return JSON.parse(data) as object;
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON, {
      jsonData: `${data.substring(0, 20)}...`,
    });
  }
}

/**
 * Check if a URL is valid
 * @param {string} url The URL to validate
 * @returns {boolean | URL} Whether the URL is valid
 */
export function isValidUrl(url: string): boolean | URL {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the default load file path
 * @returns {string} The default file path to load data from
 */
export function getDefaultLoadFile(): string {
  // Get the default path from the config
  const loadPath = configStore.get().loadFile;

  // Check if the path is valid
  if (!loadPath)
    throw new DataError(ERROR_MESSAGES.DATA.NO_DEFAULT_LOAD_FILE, {
      "config.loadFile": loadPath,
    });

  return loadPath;
}

/**
 * Trim the data
 * @param {string} data The data to trim
 * @returns {string} The trimmed data
 */
export function trimData(data?: string): string {
  // Check if the data is defined
  if (!data) return "";

  // Check if the data is too long
  const maxLength = 50;
  if (data.length > maxLength) {
    return `${data.substring(0, maxLength)}...`;
  }

  // Return the data as is
  return data;
}
