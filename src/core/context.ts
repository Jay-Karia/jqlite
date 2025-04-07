/**
 * @fileoverview Context for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=======================================IMPORTS===================================

import type { Keys } from "./types";
import { configStore } from "src/config/store";

//===================================================================================

/**
 * Context class
 * @description This class is responsible for managing the context of the query.
 */
export class Context {
  private readonly _context: Record<Keys, unknown>;

  /**
   * Initializes the context
   */
  constructor() {
    this._context = {
      fallback: null,
    };
  }

  //===================================METHODS=====================================

  /**
   * Get the context with a specific key
   * @param {Keys} key The key to get
   * @returns {unknown} The value of the key
   */
  public get(key: Keys): unknown {
    if (key === "fallback") {
      const _fallback = this._context.fallback;
      // Check if the value is null or undefined
      if (_fallback === null || _fallback === undefined) {
        // Use from config
        return configStore.get().fallback;
      }

      // Check if the value is a string
      return this._context.fallback;
    } else if (key in this._context) return this._context[key] as string;
  }

  /**
   * Sets the context
   * @param {string} key The key to set
   * @param {unknown} value The value to set
   */
  public set(key: Keys, value: unknown | null): void {
    this._context[key] = value;
  }

  //==================================================================================
}

export const context = new Context();
