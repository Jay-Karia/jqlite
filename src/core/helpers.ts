/**
 * @fileoverview Helper functions for core.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS======================================

import type { NodeType } from "src/ast/types";
import type { ErrorParams } from "src/errors/types";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";

//===================================================================================

/**
 * Check if the data contains objects
 * @param {unknown[]} data The data to be checked
 * @returns {boolean} Whether the data contains objects or not
 */
export function containsObjects(data: unknown[]): boolean {
  return data.some(item => typeof item === "object" && item !== null);
}

/**
 * Extracts all the unique keys from the data
 * @param {unknown} data The data from which the unique keys are extracted
 * @returns {string[]} An array containing all teh unique keys
 */
export function extractUniqueKeys(data: unknown[]): string[] {
  // Collect all unique keys from all objects
  const keys = new Set<string>();
  data.forEach(obj => {
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      Object.keys(obj).forEach(key => keys.add(key));
    }
  });

  // Convert the Set to an array and return it
  return Array.from(keys);
}

/**
 * Type guard to check if a value is a Record<string, unknown>
 * @param {unknown} value The value to check
 * @returns True if the value is a plain object
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Fills an array with the values of the specified keys from the data
 * @param {unknown[]} data The data to be filled
 * @param {string[]} keys The keys to be used for filling the array
 * @returns {Record<string, unknown>} The filled array
 */
export function fillArray(
  data: unknown[],
  keys: string[]
): Record<string, unknown> {
  // Initialize result object with empty arrays
  const result: Record<string, any[]> = {};
  keys.forEach(key => {
    result[key] = [];
  });

  // Fill the array with actual values
  data.forEach(item => {
    if (item && isRecord(item) && !Array.isArray(item)) {
      // Iterate over the keys
      keys.forEach((key: string) => {
        // Check if the key exists in the item
        if (key in item) {
          // If it does, add it to the result object
          result[key] = result[key] || [];
          result[key].push(item[key]);
        }
      });
    }
  });

  return result;
}

//=======================================CHECKERS====================================

/**
 * Check if the data is not null or undefined
 * @param {Record<string, unknown> | null} data The data to be checked
 * @returns {Record<string, unknown>} The data if it is not null or undefined
 */
export function checkData(
  data: Record<string, unknown> | null
): Record<string, unknown> {
  if (data === null || data === undefined) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_DATA, {
      data: data,
    });
  }

  return data;
}

/**
 * Check if the property name is not null or undefined
 * @param {string | undefined} property The property name to be checked
 * @param {NodeType} type The AST node to be checked
 * @returns {string} The property name if it is not null or undefined
 */
export function checkProperty(
  property: string | undefined,
  type: NodeType
): string {
  if (!property) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.PROPERTY_NOT_FOUND, {
      property,
      type: type,
    });
  }

  return property;
}

/**
 * Check if the value is not null or undefined
 * @param {Record<string, unknown>} value The value to be checked
 * @param {string | null} fallback The fallback value to be used if the value is null or undefined
 * @param {ErrorParams} errorParam The error parameters
 * @param {object} metadata The metadata to be passed to the error
 */
export function checkValue(
  value: Record<string, unknown> | null,
  fallback: string | null,
  errorParam: ErrorParams,
  metadata: object
): Record<string, unknown> | null {
  if (value === undefined) {
    // Check for fallback
    if (fallback) return { __fallback__: fallback };

    throw new EvaluatorError(errorParam, metadata);
  }

  return value;
}

/**
 * Check if the index is valid
 * @param {number} index The index to be checked
 * @param {string} property The property name
 * @param {NodeType} type The node type
 * @param {number} expectedLength The expected length of the array
 * @returns {number} The index if it is valid
 */
export function checkIndex(
  index: number | undefined,
  type: NodeType,
  expectedLength: number
): number {
  // Check whether the index is defined
  if (index === undefined) {
    throw new EvaluatorError(
      ERROR_MESSAGES.EVALUATOR.ERR_ARRAY_INDEX_NOT_DEFINED,
      {
        type,
      }
    );
  }

  // Check the index bounds
  if (index < 0 || index >= expectedLength) {
    throw new EvaluatorError(
      ERROR_MESSAGES.EVALUATOR.ARRAY_INDEX_OUT_OF_BOUNDS,
      {
        index,
        type,
      }
    );
  }

  return index;
}

//===================================================================================
