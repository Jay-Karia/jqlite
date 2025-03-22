import { DataError } from "errors/factory";
import { loadFromFile, loadFromUrl } from "./loader";
import { dataStore } from "./store";
import { getDefaultFile, isValidUrl, parseJson, saveToFile } from "./utils";
import { ERROR_MESSAGES } from "errors/messages";
import { existsSync } from "fs";
import { configStore } from "config/store";

/**
 * DataManager class
 */
export class DataManager {
  /**
   * Get JSON data from memory
   * @description This method returns the JSON data stored in memory. If no data is found, it will return null.
   * @returns {object | null} The JSON data stored in memory
   * @example
   * ```ts
   * const data = dataManager.get();
   * ```
   * @author Jay-Karia
   */
  public get(): object | null {
    return dataStore.get();
  }

  /**
   * Set JSON data in memory
   * @param {string | data} data The JSON data to be stored in memory
   * @description This method will parse the JSON data and store it in memory. If the data is already an object, it will be stored as is.
   * @example
   * ```ts
   * const data = {
   *   name: "John Doe",
   *   age: 30,
   * }
   * dataManager.set(data);
   * ```
   * @author Jay-Karia
   */
  public set(data: string | object) {
    const parsedData = typeof data === "string" ? parseJson(data) : data;
    dataStore.set(parsedData);
  }

  /**
   * Clear JSON data from memory
   * @description This method will clear the JSON data stored in memory. It will remove all the values from the memory.
   * @author Jay-Karia
   */
  public clear() {
    dataStore.clear();
  }

  /**
   * Save memory data to a file
   * @param {string} [filePath] The file path to save the JSON data
   * @description This method will save the JSON data stored in memory to a file. If no file path is provided, it will use the default file path from the config.
   * @example
   * ```ts
   * const data = {
   *   name: "John Doe",
   *   age: 30,
   * }
   * dataManager.set(data);
   * dataManager.save("./data.json");
   * ```
   * @throws {DataError} If no data is found in memory.
   * @throws {DataError} If no default file path is found in the config.
   * @throws {DataError} If the file path is invalid.
   * @author Jay-Karia
   */
  public save(filePath?: string) {
    // Check if data is in memory
    const memoryData = dataStore.get();
    if (!memoryData) throw new DataError(ERROR_MESSAGES.DATA.NO_DATA);

    // Use the default file path from config
    if (!filePath) saveToFile(getDefaultFile("save"), memoryData);
    // Use provided file path
    else saveToFile(filePath, memoryData);
  }

  /**
   * Save data from a URL to a file
   * @async
   * @param {string} url The URL to fetch data from
   * @param {string} [filePath] The file path to save the fetched data
   * @description This method will fetch the JSON data from the URL and save it to a file. If no file path is provided, it will use the default file path from the config.
   * @example
   * ```ts
   * const url = "https://jsonplaceholder.typicode.com/posts";
   * const filePath = "./data.json";
   * dataManager.saveFromUrl(url, filePath);
   * ```
   * @throws {DataError} If the URL is invalid.
   * @throws {DataError} If no data is found in the URL.
   * @author Jay-Karia
   */
  public async saveFromUrl(url: string, filePath?: string) {
    // Check if URL is valid
    const isUrl = isValidUrl(url);
    if (!isUrl) throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON_URL);

    // Check if the data is in URL
    const urlData = await loadFromUrl(url);
    if (!urlData) throw new DataError(ERROR_MESSAGES.DATA.NO_DATA);

    // Check config for default file path
    if (!filePath) filePath = getDefaultFile("save");

    // Save data to file
    saveToFile(filePath, urlData);
  }

  /**
   * Load data from a file to memory
   * @param {string} filePath The file path load data from
   * @description This method will load the JSON data from the file and store it in memory. If no file path is provided, it will use the default file path from the config.
   * @returns {object} The loaded data
   * @example
   * ```ts
   * const filePath = "./data.json";
   * dataManager.load(filePath);
   * ```
   * @throws {DataError} If no data is found in the file.
   * @throws {DataError} If no default file path is found in the config.
   * @throws {DataError} If the file path is invalid.
   * @author Jay-Karia
   */
  public load(filePath?: string): object {
    // Use the default file path from config
    if (!filePath) filePath = getDefaultFile("load");

    // Check if file path is valid
    const isFile = existsSync(filePath);
    if (!isFile) throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH);

    // Check if data is in file
    const fileData = loadFromFile(filePath);
    if (!fileData) throw new DataError(ERROR_MESSAGES.DATA.NO_DATA_TO_LOAD);

    // Set data to memory
    this.set(fileData);

    return fileData;
  }

  /**
   * Load data from a URL to memory
   * @async
   * @param {string} [url] The URL to fetch data from
   * @description This method will fetch the JSON data from the URL and store it in memory. If no URL is provided, it will use the default URL from the config.
   * @returns The fetched data
   * @example
   * ```ts
   * const url = "https://jsonplaceholder.typicode.com/posts";
   * dataManager.loadFromUrl(url);
   * ```
   * @throws {DataError} If the URL is invalid.
   * @throws {DataError} If no data is found in the URL.
   * @throws {DataError} If no default URL is found in the config.
   * @author Jay-Karia
   */
  public async loadFromUrl(url?: string): Promise<object | void> {
    let urlToLoad: string | null | undefined = url;

    // Use the load url from config
    if (!url) urlToLoad = configStore.get().loadUrl;
    if (!urlToLoad)
      throw new DataError(ERROR_MESSAGES.DATA.NO_DEFAULT_LOAD_URL);

    // Check if URL is valid
    const isUrl = isValidUrl(urlToLoad);
    if (!isUrl) throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON_URL);

    // Check if data is in URL
    const urlData = await loadFromUrl(urlToLoad);
    if (!urlData) throw new DataError(ERROR_MESSAGES.DATA.NO_DATA_TO_LOAD);

    // Set data to memory
    this.set(urlData);
    return urlData;
  }

  /**
   * Use data from a file path without loading it to memory
   * @param {string} filePath The file path to use data from
   * @description This method will use the JSON data from the file without loading it to memory. If no file path is provided, it will use the default file path from the config. This data will be stored in session memory.
   * @returns {object} The loaded data
   * @example
   * ```ts
   * const filePath = "./data.json";
   * dataManager.use(filePath);
   * ```
   * @throws {DataError} If no data is found in the file.
   * @throws {DataError} If no default file path is found in the config.
   * @throws {DataError} If the file path is invalid.
   * @author Jay-Karia
   */
  public use(filePath: string): object | void {
    // Check if file path is valid
    const isFile = existsSync(filePath);
    if (!isFile) throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH);

    // Check if data is in file
    const fileData = loadFromFile(filePath);
    if (!fileData) throw new DataError(ERROR_MESSAGES.DATA.NO_DATA_TO_LOAD);

    // Set data to memory
    dataStore.use(fileData);

    return fileData;
  }

  /**
   * Use data from a URL without loading it to memory
   * @async
   * @param {string} url The URL to use data from
   * @description This method will fetch the JSON data from the URL and use it without loading it to memory. If no URL is provided, it will use the default URL from the config. This data will be stored in session memory.
   * @returns {object} The loaded data
   * @example
   * ```ts
   * const url = "https://jsonplaceholder.typicode.com/posts";
   * dataManager.useFromUrl(url);
   * ```
   * @throws {DataError} If the URL is invalid.
   * @throws {DataError} If no data is found in the URL.
   * @throws {DataError} If no default URL is found in the config.
   * @author Jay-Karia
   */
  public async useFromUrl(url: string): Promise<object | void> {
    // TODO: add default url in config

    // Check if URL is valid
    const isUrl = isValidUrl(url);
    if (!isUrl) throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON_URL);

    // Check if data is in URL
    const urlData = await loadFromUrl(url);
    if (!urlData) throw new DataError(ERROR_MESSAGES.DATA.NO_DATA_TO_LOAD);

    // Set data to memory
    dataStore.use(urlData);
    return urlData;
  }

  /**
   * Reset session data
   * @description This method will reset the session data stored in memory. It will remove all the values from the session.
   * @author Jay-Karia
   */
  public resetSession() {
    dataStore.resetSession();
  }

  /**
   * Get the active data
   * @description This method will return the active data stored in memory. First it will check the session data, if not found then it will check the memory data. If no data is found, it will return null.
   * @returns {object | null} The active data
   */
  public getActiveData(): object | null {
    return dataStore.getActiveData();
  }
}

export const dataManager = new DataManager();
