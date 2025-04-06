/**
 * @fileoverview Error factory for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ErrorParams } from "./types";
import { BaseError } from "./base";

//=================================================================================

/**
 * Create an error class for a specific category
 * @param {string} name The name of the error class
 * @returns {typeof BaseError} The error class
 */
export function createErrorClass(name: string): typeof BaseError {
  const errorClass = {
    [name]: class extends BaseError {
      constructor(params: ErrorParams, metadata: Record<string, any>) {
        super(params, metadata);
        this.name = name;
      }
    },
  }[name];

  return errorClass;
}

//====================================ERROR CLASSES=================================

export const DataError = createErrorClass("DataError");
export const ConfigError = createErrorClass("ConfigError");
export const ParserError = createErrorClass("ParserError");
export const EvaluatorError = createErrorClass("EvaluatorError");

//==================================================================================
