import type {Readable} from "stream";
import type {ActiveData} from "./types";

/**
 * DataStore class to manage JSON data in memory and session
 * @class DataStore
 */
export class DataStore {
  private _memoryData: object | null = null;
  private _dataStream: Readable | null = null;

  private activeDataType: ActiveData = "memory";

  /**
   * Set JSON data in memory
   * @param {object | null} parsedData The JSON data to be stored in memory
   * @description This method will parse the JSON data and store it in memory. If the data is already an object, it will be stored as is.
   */
  public set(parsedData: object | null): void {
    this._memoryData = parsedData;
    this.setActiveData("memory");
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
  }

  /**
   * Get the active data
   * @description This method returns the active data. If session data is available, it will return that. Otherwise, it will return the memory data.
   * @returns {object | null} The active data
   */
  public getActiveData(): object | Readable | null {
    switch (this.activeDataType) {
      case "memory":
        return this._memoryData;
      case "stream":
        return this._dataStream;
      default:
        return null;
    }
  }

  /**
   * Set the data stream
   * @param {Readable} stream The stream to be set
   * @description This method will set the data stream. If the stream is already set, it will be replaced with the new stream.
   */
  public setStream(stream: Readable): void {
    this._dataStream = stream;
    this.setActiveData("stream");
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
    this.setActiveData("memory");
  }

  /**
   * Set the active data type
   * @param {ActiveData} type The type of data to be set
   * @description This method will change the data to use. It can be either "memory" or "stream".
   */
  public setActiveData(type: ActiveData): void {
    this.activeDataType = type;
  }
}

export const dataStore = new DataStore();
