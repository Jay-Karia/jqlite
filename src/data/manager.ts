import { loadFromFile, loadUrlData } from "./loader";
import { isValidUrl, parseJson, saveToFile } from "./utils";

export class DataManager {
  private _memoryData: object | null = null;

  /**
   * Set JSON data in memory
   * @param data The JSON data to be stored in memory
   */
  public set(data: string | object) {
    const parsedData = typeof data === "string" ? parseJson(data) : data;
    this._memoryData = parsedData;
  }

  /**
   * Get JSON data from memory
   * @returns The JSON data stored in memory
   */
  public get(): object | null {
    return this._memoryData;
  }

  /**
   * Clear JSON data from memory
   */
  public clear() {
    this._memoryData = null;
  }

  /**
   * Save memory data to a file
   * @param filePath The file path to save the JSON data
   */
  public save(filePath: string) {
    if (!this._memoryData) throw new Error("No data to save");
    saveToFile(filePath, this._memoryData);
  }

  /**
   * Save data from a URL to a file
   * @param url The URL to fetch data from
   * @param filePath The file path to save the fetched data
   */
  public async saveFromUrl(url: string, filePath: string) {
    const isUrl = isValidUrl(url);
    if (!isUrl) throw new Error("Invalid URL");

    const urlData = await loadUrlData(url);
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

    const urlData = await loadUrlData(url);
    if (!urlData) throw new Error("No data to load");
    this.set(urlData);

    return urlData;
  }

  /**
   * Use data from a file path without loading it to memory
   * @param filePath The file path to use data from
   */
  public use(filePath: string) {
    console.log(`Using data from ${filePath}`);
  }

  /**
   * Use data from a URL without loading it to memory
   * @param url The URL to use data from
   */
  public useFromUrl(url: string) {
    console.log(`Using data from ${url}`);
  }
}

export const dataManager = new DataManager();
