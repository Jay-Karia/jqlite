import { DataError } from "errors/factory";
import { loadFromFile, loadFromUrl } from "./loader";
import { dataStore } from "./store";
import {
  getDefaultLoadFile,
  isValidUrl,
  parseJson,
} from "./utils";
import { ERROR_MESSAGES } from "errors/messages";
import { existsSync } from "fs";
import { configStore } from "config/store";

/**
 * DataManager class
 */
export class DataManager {
  /**
   * Get JSON data from memory
   * @description This method returns the JSON data stored in memory.
   * @returns {object | null} The JSON data stored in memory
   */
  public get(): object | null {
    return dataStore.get();
  }

  /**
   * Set JSON data in memory
   * @param {string | data} data The JSON data to be stored in memory
   * @description This method will parse the JSON data and store it in memory. If the data is already an object, it will be stored as is.
   */
  public set(data: string | object): void {
    const parsedData = typeof data === "string" ? parseJson(data) : data;
    dataStore.set(parsedData);
  }

  /**
   * Clear JSON data from memory or session
   * @description This method will clear the JSON data stored in memory. Default will be the active data type.
   * @param {ActiveData} type The type of data to be cleared
   */
  public clear(): void {
    dataStore.clear();
  }

  /**
   * Print the data of memory.
   * @description This method will print the data stored in memory.
   */
  public print(): void {
    const data = dataStore.get();
    if (data) console.log(JSON.stringify(data, null, 2));
  }

  /**
   * Load data from a file to memory
   * @param {string} filePath The file path to load data from
   * @description This method will load the JSON data from the file and store it in memory. If no file path is provided, it will use the default file path from the config.
   * @returns {object} The loaded data
   * @example
   * ```ts
   * const filePath = "./data.json";
   * data.load(filePath);
   * ```
   * @throws {DataError} If no data is found in the file.
   * @throws {DataError} If no default file path is found in the config.
   * @throws {DataError} If the file path is invalid.
   */
  public load(filePath?: string): object {
    // Use the default file path from config
    if (!filePath) filePath = getDefaultLoadFile();

    // Check if file path is valid
    const isFile = existsSync(filePath);
    if (!isFile)
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH, {
        filePath,
        isFile,
      });

    // Check if data is in file
    const fileData = loadFromFile(filePath);
    if (!fileData)
      throw new DataError(ERROR_MESSAGES.DATA.NO_DATA_TO_LOAD, {
        filePath,
      });

    // Set data to memory
    this.set(fileData);
    return fileData;
  }

  /**
   * Fetch data from a URL to memory
   * @async
   * @param {string} [url] The URL to fetch data from
   * @description This method will fetch the JSON data from the URL and store it in memory. If no URL is provided, it will use the default URL from the config.
   * @returns The fetched data
   * @example
   * ```ts
   * const url = "https://jsonplaceholder.typicode.com/posts";
   * data.fetch(url);
   * ```
   * @throws {DataError} If the URL is invalid.
   * @throws {DataError} If no data is found in the URL.
   * @throws {DataError} If no default URL is found in the config.
   */
  public async fetch(url?: string): Promise<object | void> {
    let urlToLoad: string | null | undefined = url;

    // Use the load url from config
    if (!url) urlToLoad = configStore.get().fetchUrl;
    if (!urlToLoad)
      throw new DataError(ERROR_MESSAGES.DATA.NO_DEFAULT_LOAD_URL, {
        url: urlToLoad,
      });

    // Check if URL is valid
    const isUrl = isValidUrl(urlToLoad);
    if (!isUrl)
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON_URL, {
        url: urlToLoad,
        isUrl,
      });

    // Check if data is in URL
    const urlData = await loadFromUrl(urlToLoad);
    if (!urlData)
      throw new DataError(ERROR_MESSAGES.DATA.NO_DATA_TO_LOAD, {
        url: urlToLoad,
      });

    // Set data to memory
    this.set(urlData);
    return urlData;
  }
}

export const data = new DataManager();
