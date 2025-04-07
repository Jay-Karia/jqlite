/**
 * @fileoverview Data store for jqlite.
 * @author Jay-Karia
 */

"use strict";

/**
 * Data store class.
 * @description This class is used to store the JSON data in memory.
 */
export class DataStore {
  //==========================================PROPERTIES=====================================

  private _memoryData: Record<string, unknown> | null = null;

  //======================================GETTER / SETTER====================================

  /**
   * Set JSON data in memory
   * @param {Record<string, unknown> | null} parsedData The JSON data to be stored in memory
   */
  public set(parsedData: Record<string, unknown> | null): void {
    this._memoryData = parsedData;
  }

  /**
   * Get JSON data from memory
   * @returns {Record<string, unknown> | null} The JSON data stored in memory
   */
  public get(): Record<string, unknown> | null {
    return this._memoryData;
  }

  //===========================================CLEAR==========================================

  /**
   * Clear JSON data from memory
   */
  public clear(): void {
    this._memoryData = null;
  }

  //============================================================================================
}

export const dataStore = new DataStore();
