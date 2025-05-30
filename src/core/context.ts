/**
 * @fileoverview Context for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=======================================IMPORTS===================================

import type { Keys, TContext } from "./types";
import { configStore } from "src/config/store";

//===================================================================================

/**
 * Context class
 * @description This class is responsible for managing the context of the query.
 */
export class Context {
  private readonly _context: TContext;

  /**
   * Initializes the context
   */
  constructor() {
    this._context = {
      fallback: null,
      multipleSelect: false,
      selectedKeys: [],
      multipleOmit: false,
      omittedKeys: [],
      sliceType: null,
      isFunction: false,
      functionCategory: null,
      functionArgs: [],
      functionName: null,
      isComparison: false,
      comparisonOperator: null,
      isCondition: false,
      isArrayAccess: false,
      openBracket: 0,
      openParen: 0,
      conditionBracketPosition: 0
    };
  }

  //===================================METHODS=====================================

  /**
   * Get the context with a specific key
   * @param {Keys} key The key to get
   * @returns {unknown} The value of the key
   */
  public get<K extends Keys>(key: K): TContext[K] {
    // Check if the key is fallback
    if (key === "fallback") {
      const _fallback = this._context.fallback;
      // Check if the value is null or undefined
      if (_fallback === null || _fallback === undefined) {
        // Use from config
        return configStore.get().fallback as TContext[K];
      }

      // Check if the value is a string
      return this._context.fallback as TContext[K];
    }
    return this._context[key];
  }

  /**
   * Sets the context
   * @param {string} key The key to set
   * @param {TContext[K]} value The value to set
   */
  public set<K extends Keys>(key: K, value: TContext[K]): void {
    if (key in this._context) this._context[key] = value;
  }

  /**
   * Reset the context to default
   */
  public reset(): void {
    this._context.fallback = null;
    this._context.multipleSelect = false;
    this._context.selectedKeys = [];
    this._context.multipleOmit = false;
    this._context.omittedKeys = [];
    this._context.sliceType = null;
    this._context.isFunction = false;
    this._context.functionCategory = null;
    this._context.functionArgs = [];
    this._context.functionName = null;
    this._context.isComparison = false;
    this._context.comparisonOperator = null;
    this._context.isCondition = false;
    this._context.isArrayAccess = false;
    this._context.openBracket = 0;
    this._context.openParen = 0;
    this._context.conditionBracketPosition = 0;
  }

  //==================================================================================
}

export const context = new Context();
