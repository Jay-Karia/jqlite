import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { existsSync, writeFileSync } from "fs";

/**
 * Parse JSON data
 * @param data The JSON data to parse
 * @returns The parsed JSON data
 */
export function parseJson(data: string): object | null {
  try {
    return JSON.parse(data);
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON);
  }
}

/**
 * Save JSON data to a file
 * @param filePath The file path to save the JSON data
 * @param data The JSON data to save
 */
export function saveToFile(filePath: string, data: object): void {
  // Check if the file path is valid
  const isFile = existsSync(filePath);
  if (!isFile) throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH);

  // Save the data to the file
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * Check if a URL is valid
 * @param url The URL to validate
 * @returns Whether the URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
