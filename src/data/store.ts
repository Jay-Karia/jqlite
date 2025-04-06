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

  private _memoryData: object | null = null;

  //======================================GETTER / SETTER====================================

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
