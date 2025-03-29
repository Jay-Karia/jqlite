/**
 * @fileoverview Data store for jqlite.
 * @author Jay-Karia
 */

"use strict";

/**
 * DataStore class.
 */
export class DataStore {
  private _memoryData: object | null = null;

  /**
   * Set JSON data in memory
   * @param {object | null} parsedData The JSON data to be stored in memory
   */
  public set(parsedData: object | null): void {
    this._memoryData = parsedData;
  }

  /**
   * Get JSON data from memory
   * @returns {object | null} The JSON data stored in memory
   */
  public get(): object | null {
    return this._memoryData;
  }

  /**
   * Clear JSON data from memory
   */
  public clear(): void {
    this._memoryData = null;
  }

}

export const dataStore = new DataStore();
