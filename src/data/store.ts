/**
 * DataStore class to manage JSON data in memory and session
 * @class DataStore
 */
export class DataStore {
  private _memoryData: object | null = null;
  private _sessionData: object | null = null;

  /**
   * Set JSON data in memory
   * @param {object | null} parsedData The JSON data to be stored in memory
   * @description This method will parse the JSON data and store it in memory. If the data is already an object, it will be stored as is.
   */
  public set(parsedData: object | null) {
    this._memoryData = parsedData;
  }

  /**
   * Get JSON data from memory
   * @description This method returns the JSON data stored in memory. If no data is found, it will return null.
   * @returns {object | null} The JSON data stored in memory
   */
  public get(): object | null {
    return this._memoryData;
  }

  /**
   * Clear JSON data from memory
   * @description This method will clear the JSON data stored in memory. It will remove all the values from the memory.
   */
  public clear() {
    this._memoryData = null;
  }

  /**
   * Store data in session
   * @param {object} data The data to be stored in session
   * @description This method will store the data in session. If the data is already an object, it will be stored as is.
   */
  public use(data: object) {
    this._sessionData = data;
  }

  /**
   * Reset session data
   * @description This method will clear the session data. It will remove all the values from the session.
   */
  public resetSession() {
    this._sessionData = null;
  }

  /**
   * Get the active data
   * @description This method returns the active data. If session data is available, it will return that. Otherwise, it will return the memory data.
   * @returns {object | null} The active data
   */
  public getActiveData(): object | null {
    return this._sessionData || this._memoryData;
  }
}

export const dataStore = new DataStore();
