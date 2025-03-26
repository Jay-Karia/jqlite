import type { ActiveData } from "./types";

/**
 * DataStore class to manage JSON data in memory and session
 * @class DataStore
 */
export class DataStore {
  private _memoryData: object | null = null;

  private activeDataType: ActiveData = "memory";

  /**
   * Set JSON data in memory
   * @param {object | null} parsedData The JSON data to be stored in memory
   * @description This method will parse the JSON data and store it in memory. If the data is already an object, it will be stored as is.
   */
  public set(parsedData: object | null): void {
    this._memoryData = parsedData;
  }

  /**
   * Get JSON data from memory
   * @description This method returns the JSON data stored in memory. If no data is found, it will return null.
   * @returns {object | null} The JSON data stored in memory
   */
  public get(type?: ActiveData): object | null {
    return this._memoryData;
  }

  /**
   * Clear JSON data from memory
   * @description This method will clear the JSON data stored in memory. It will remove all the values from the memory.
   */
  public clear(type?: ActiveData): void {
    this._memoryData = null;
  }

  /**
   * Set the active data type
   * @param {ActiveData} type The type of data to be set
   * @description This method will change the data to use. It can be either "memory" or "stream".
   */
  public setActiveData(type: ActiveData): void {
    this.activeDataType = type;
  }

  /**
   * Get the active data type
   * @description This method returns the active data type. It can be either "memory" or "stream".
   * @returns {ActiveData} The active data type
   */
  public getActiveDataType(): ActiveData {
    return this.activeDataType;
  }

  public getActiveData(): object | null {
    return this._memoryData;
  }
}

export const dataStore = new DataStore();
