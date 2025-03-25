import { DataError } from "errors/factory";
import { loadFromFile, loadFromUrl } from "./loader";
import { dataStore } from "./store";
import { getDefaultFile, isValidUrl, parseJson, saveToFile } from "./utils";
import { ERROR_MESSAGES } from "errors/messages";
import { existsSync } from "fs";
import { configStore } from "config/store";
import { dataStreamer } from "./streamer";
import type { Readable } from "stream";
import type {ActiveData} from "./types";

/**
 * DataManager class
 */
export class DataManager {
  /**
   * Get JSON data from memory
   * @description This method returns the JSON data stored in memory. If no data is found, it will return null.
   * @returns {object | null} The JSON data stored in memory
   * @author Jay-Karia
   */
  public get(): object | null {
    return dataStore.get();
  }

  /**
   * Set JSON data in memory
   * @param {string | data} data The JSON data to be stored in memory
   * @description This method will parse the JSON data and store it in memory. If the data is already an object, it will be stored as is.
   * @author Jay-Karia
   */
  public set(data: string | object): void {
    const parsedData = typeof data === "string" ? parseJson(data) : data;
    dataStore.set(parsedData);
  }

  /**
   * Clear JSON data from memory
   * @description This method will clear the JSON data stored in memory. It will remove all the values from the memory.
   * @author Jay-Karia
   */
  public clear(): void {
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
  public save(filePath?: string): void {
    // Check if data is in memory
    const memoryData = dataStore.get();
    if (!memoryData)
      throw new DataError(ERROR_MESSAGES.DATA.NO_DATA, {
        memoryData,
        filePath: filePath,
      });

    // Use the default file path from config
    if (!filePath) saveToFile(getDefaultFile("save"), memoryData);
    // Use provided file path
    else saveToFile(filePath, memoryData);
  }

  /**
   * Load data from a file to memory
   * @param {string} filePath The file path to load data from
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
   * Load data from a file and save it to memory stream
   * @param {string} filePath The file path to load data from
   * @description This method will load the JSON data from the file and store it in memory. If no file path is provided, it will use the default file path from the config.
   */
  public setFileStream(filePath: string): Readable {
    // Check if file path is valid
    const isFile = existsSync(filePath);
    if (!isFile)
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH, {
        filePath,
        isFile,
      });

    // Create a readable stream from the file
    const fileStream = dataStreamer.createFileStream(filePath);

    // Set the stream to memory
    dataStore.setStream(fileStream);
    return fileStream;
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

  /**
   * Get the active data
   * @description This method will return the active data stored in memory. First it will check the session data, if not found then it will check the memory data. If no data is found, it will return null.
   * @returns {object | null} The active data
   */
  public getActiveData(): object | null {
    return dataStore.getActiveData();
  }

  /**
   * Print the data in memory
   * @description This method will print the data stored in memory. If no data is found, it will print "No data in memory."
   * @author Jay-Karia
   */
  public printActiveData(): void {
    const data = dataStore.getActiveData();
    if (data) console.log(JSON.stringify(data, null, 2));
    else console.log("No data in memory.");
  }

  /**
   * Clear the stream data
   * @description This method will clear the stream data stored in memory. It will remove all the values from the stream.
   */
  public clearStream(): void {
    dataStore.clearStream();
  }

  /**
   * Set the data stream
   * @param {ActiveData} type The type of data to be set
   * @description This method will change the data to use.
   */
  public setActiveData(type: ActiveData): void {
    dataStore.setActiveData(type);
  }
}

export const dataManager = new DataManager();
