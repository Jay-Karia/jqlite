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
  let urlData;
  try {
    const response = await fetch(url);
    urlData = await response.json();
    return urlData;
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.CANNOT_LOAD_URL_DATA, {
      url,
      urlData: urlData?.substring(0, 20) + "...",
      timeStamp: new Date().toLocaleTimeString(),
    });
  }
}

/**
 * Load data from a file
 * @param path The file path to load data from
 * @returns The loaded data
 */
export function loadFromFile(path: string): object | null {
  let data;
  try {
    data = readFileSync(path, "utf-8");
    return parseJson(data);
  } catch {
    throw new DataError(ERROR_MESSAGES.DATA.CANNOT_LOAD_FILE_DATA, {
      filePath: path,
      fileData: data?.substring(0, 20) + "...",
      timeStamp: new Date().toLocaleTimeString(),
    });
  }
}
