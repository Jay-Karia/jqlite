import { readFileSync } from "fs";
import { parseJson } from "./utils";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { onError, tryOperation } from "utils";

/**
 * Load data from a URL
 * @param url The URL to fetch data from
 * @returns The fetched data
 */
export async function loadFromUrl(url: string): Promise<object | null> {
  return tryOperation(
    async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
    onError(() => {
      throw new DataError(ERROR_MESSAGES.DATA.CANNOT_LOAD_URL_DATA);
    })
  );
}

/**
 * Load data from a file
 * @param path The file path to load data from
 * @returns The loaded data
 */
export function loadFromFile(path: string): object | null {
  return tryOperation(
    () => {
      const data = readFileSync(path, "utf-8");
      return parseJson(data);
    },
    onError(() => {
      throw new DataError(ERROR_MESSAGES.DATA.CANNOT_LOAD_FILE_DATA);
    })
  );
}
