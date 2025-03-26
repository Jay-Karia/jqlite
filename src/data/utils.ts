import { configStore } from "config/store";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";

/**
 * Parse JSON data
 * @param {string} data The JSON data to parse
 * @description This method will parse the JSON data and return it as an object. If the data is already an object, it will be returned as is.
 * @returns {object | null} The parsed JSON data
 */
export function parseJson(data: string): object | null {
  try {
    return JSON.parse(data);
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON, {
      jsonData: `${data.substring(0, 20)}...`,
    });
  }
}

/**
 * Check if a URL is valid
 * @param {string} url The URL to validate
 * @description This method will check if the URL is valid. If the URL is valid, it will return true. Otherwise, it will return false.
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
 * Get the default path to save data
 * @description This method will return the default path to save data. If no default path is found, it will throw an error.
 * @returns {string} The default path to save data
 */
export function getDefaultFile(type: "save" | "load"): string {
  switch (type) {
    // Get the default save file
    case "save": {
      const savePath = configStore.get().saveFile;
      if (!savePath)
        throw new DataError(ERROR_MESSAGES.DATA.NO_DEFAULT_SAVE_FILE, {
          "config.saveFile": savePath,
        });
      return savePath;
    }
    
    // Get the default load file
    case "load": {
      const loadPath = configStore.get().loadFile;
      if (!loadPath)
        throw new DataError(ERROR_MESSAGES.DATA.NO_DEFAULT_LOAD_FILE, {
          "config.loadFile": loadPath,
        });
      return loadPath;
    }
  }
}

/**
 * Trim the data
 * @param {string} data The data to trim
 * @description This method will trim the data to a certain length and add "..." at the end if required. This is required to print the data in the error message.
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
