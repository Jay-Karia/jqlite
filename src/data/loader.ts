import { readFileSync } from "fs";
import { parseJson } from "./utils";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";

/**
 * Load data from a URL
 * @param url The URL to fetch data from
 * @returns The fetched data
 */
export async function loadFromUrl(url: string): Promise<object | null> {
  // TODO: try to even refactor this to use the fetch API and/or with that utils function
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.CANNOT_LOAD_URL_DATA);
  }
}

/**
 * Load data from a file
 * @param path The file path to load data from
 * @returns The loaded data
 */
export function loadFromFile(path: string): object | null {
  // TODO: even this
  try {
    const data = readFileSync(path, "utf-8");
    return parseJson(data);
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.CANNOT_LOAD_FILE_DATA);
  }
}
