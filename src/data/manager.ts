import {parseJson} from "./utils";

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

}

export const dataManager = new DataManager();
