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

  public get(key: Keys): unknown {
    if (key === "fallback") {
      // Check if the value is null or undefined
      if (
        this._context.fallback === null ||
        this._context.fallback === undefined
      ) {
        return configStore.get().fallback;
      }

      // Check if the value is a string
      if (typeof this._context.fallback === "string") {
        return this._context.fallback;
      }

      return null;
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

  public setFallback(value: string | null | undefined): void {
    // Check if the value is null or undefined
    if (value === null || value === undefined) {
      this._context.fallback = null;
      return;
    }

    // Check if the value is a string
    this._context.fallback = value;
    return;
  }

  //==================================================================================
}

export const context = new Context();
