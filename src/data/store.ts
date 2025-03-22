export class DataStore {
  private _memoryData: object | null = null;
  private _sessionData: object | null = null;

  /**
   * Set JSON data in memory
   * @param parsedData The JSON data to be stored in memory
   */
  public set(parsedData: object | null) {
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
   * Store data in session
   * @param data The data to be stored in session
   */
  public use(data: object) {
    this._sessionData = data;
  }

  /**
   * Reset session data
   */
  public resetSession() {
    this._sessionData = null;
  }

  /**
   * Get the active data
   * @returns The active data
   */
  public getActiveData() {
    return this._sessionData || this._memoryData;
  }
}

export const dataStore = new DataStore();
