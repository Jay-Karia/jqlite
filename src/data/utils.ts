import { configStore } from "config/store";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { existsSync, writeFileSync } from "fs";
import { onError, tryOperation } from "utils";

/**
 * Parse JSON data
 * @param {string} data The JSON data to parse
 * @description This method will parse the JSON data and return it as an object. If the data is already an object, it will be returned as is.
 * @returns {object | null} The parsed JSON data
 */
export function parseJson(data: string): object | null {
  return tryOperation(
    () => JSON.parse(data),
    onError(() => {
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON);
    })
  );
}

/**
 * Save JSON data to a file
 * @param {string} filePath The file path to save the JSON data
 * @param {object} data The JSON data to save
 * @description This method will save the JSON data to a file. If the file already exists, it will overwrite the existing data.
 * If the file does not exist, it will create a new file with the provided data.
 */
export function saveToFile(filePath: string, data: object): void {
  // Check if the file path is valid
  const isFile = existsSync(filePath);
  if (!isFile) {
    // Check if the file should be created if missing
    const createIfMissing = configStore.get().createIfMissing;
    if (!createIfMissing)
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH);

    // Create the file
    writeFileSync(filePath, JSON.stringify(data, null, 2));
    return;
  }

  // Check if the file can be overwritten
  const canOverwrite = configStore.get().allowOverwrite;
  if (!canOverwrite) throw new DataError(ERROR_MESSAGES.DATA.NO_OVERWRITE);

  // Save the data to the file
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * Check if a URL is valid
 * @param {string} url The URL to validate
 * @description This method will check if the URL is valid. If the URL is valid, it will return true. Otherwise, it will return false.
 * @returns {boolean | URL} Whether the URL is valid
 */
export function isValidUrl(url: string): boolean | URL {
  return tryOperation(
    () => new URL(url),
    onError(() => {
      return false;
    })
  );
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
        throw new DataError(ERROR_MESSAGES.DATA.NO_DEFAULT_SAVE_FILE);
      return savePath;
    }
    // Get the default load file
    case "load": {
      const loadPath = configStore.get().loadFile;
      if (!loadPath)
        throw new DataError(ERROR_MESSAGES.DATA.NO_DEFAULT_LOAD_FILE);
      return loadPath;
    }
  }
}
