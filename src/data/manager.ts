import { loadFromFile, loadFromUrl } from "./loader";
import {dataStore} from "./store";
import { isValidUrl, parseJson, saveToFile } from "./utils";

export class DataManager {
  /**
   * Get JSON data from memory
   * @returns The JSON data stored in memory
   */
  public get(): object | null {
    return dataStore.get();
  }

  /**
   * Set JSON data in memory
   * @param data The JSON data to be stored in memory
   */
  public set(data: string | object) {
    const parsedData = typeof data === "string" ? parseJson(data) : data;
    dataStore.set(parsedData);
  }

  /**
   * Clear JSON data from memory
   */
  public clear() {
    dataStore.clear();
  }

  /**
   * Save memory data to a file
   * @param filePath The file path to save the JSON data
   */
  public save(filePath: string) {
    const memoryData = dataStore.get();
    if (!memoryData) throw new Error("No data to save");
    saveToFile(filePath, memoryData);
  }

  /**
   * Save data from a URL to a file
   * @param url The URL to fetch data from
   * @param filePath The file path to save the fetched data
   */
  public async saveFromUrl(url: string, filePath: string) {
    const isUrl = isValidUrl(url);
    if (!isUrl) throw new Error("Invalid URL");

    const urlData = await loadFromUrl(url);
    if (!urlData) throw new Error("No data to save");

    saveToFile(filePath, urlData);
  }

  /**
   * Load data from a file path memory
   * @param filePath The file path load data from
   */
  public load(filePath: string): object {
    const fileData = loadFromFile(filePath);
    if (!fileData) throw new Error("No data to load");
    this.set(fileData);

    return fileData;
  }

  /**
   * Load data from a URL to memory
   * @param url The URL to fetch data from
   * @returns The fetched data
   */
  public async loadFromUrl(url: string): Promise<object | void> {
    const isUrl = isValidUrl(url);
    if (!isUrl) throw new Error("Invalid URL");

    const urlData = await loadFromUrl(url);
    if (!urlData) throw new Error("No data to load");
    this.set(urlData);

    return urlData;
  }

  /**
   * Use data from a file path without loading it to memory
   * @param filePath The file path to use data from
   */
  public use(filePath: string) {
    const fileData = loadFromFile(filePath);
    if (!fileData) throw new Error("No data to use");
    dataStore.use(fileData);
  }

  /**
   * Use data from a URL without loading it to memory
   * @param url The URL to use data from
   */
  public async useFromUrl(url: string) {
    const isUrl = isValidUrl(url);
    if (!isUrl) throw new Error("Invalid URL");

    const urlData = await loadFromUrl(url);
    if (!urlData) throw new Error("No data to use");

    dataStore.use(urlData);
  }

  /**
   * Reset session data
   */
  public resetSession() {
    dataStore.resetSession();
  }

  /**
   * Get the active data
   * @returns The active data
   */
  public getActiveData(): object | null {
    return dataStore.getActiveData();
  }
}

export const dataManager = new DataManager();
