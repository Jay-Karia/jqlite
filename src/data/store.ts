import type {Readable} from "stream";

/**
 * DataStore class to manage JSON data in memory and session
 * @class DataStore
 */
export class DataStore {
  private _memoryData: object | null = null;
  private _sessionData: object | null = null;
  private _dataStream: Readable | null = null;

  private activeData: object | Readable | null = this._memoryData;

  /**
   * Set JSON data in memory
   * @param {object | null} parsedData The JSON data to be stored in memory
   * @description This method will parse the JSON data and store it in memory. If the data is already an object, it will be stored as is.
   */
  public set(parsedData: object | null): void {
    this._memoryData = parsedData;
    this.activeData = this._memoryData;
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
  public clear(): void {
    this._memoryData = null;
    this.activeData = null;
  }

  /**
   * Store data in session
   * @param {object} data The data to be stored in session
   * @description This method will store the data in session. If the data is already an object, it will be stored as is.
   */
  public use(data: object): void {
    this._sessionData = data;
    this.activeData = this._sessionData;
  }

  /**
   * Reset session data
   * @description This method will clear the session data. It will remove all the values from the session.
   */
  public resetSession(): void {
    this._sessionData = null;
    this.activeData = this._memoryData;
  }

  /**
   * Get the active data
   * @description This method returns the active data. If session data is available, it will return that. Otherwise, it will return the memory data.
   * @returns {object | null} The active data
   */
  public getActiveData(): object | Readable | null {
    return this.activeData;
  }

  /**
   * Set the data stream
   * @param {Readable} stream The stream to be set
   * @description This method will set the data stream. If the stream is already set, it will be replaced with the new stream.
   */
  public setStream(stream: Readable): void {
    this._dataStream = stream;
    this.activeData = this._dataStream;
  }

  /**
   * Get the data stream
   * @description This method returns the data stream. If no stream is found, it will return null.
   * @returns {Readable | null} The data stream
   */
  public getStream(): Readable | null {
    return this._dataStream;
  }

  /**
   * Clear the data stream
   * @description This method will clear the data stream. It will remove all the values from the stream.
   */
  public clearStream(): void {
    this._dataStream = null;
    this.activeData = this._memoryData;
  }
}

export const dataStore = new DataStore();
