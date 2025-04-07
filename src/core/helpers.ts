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
  metadata: object,
): Record<string, unknown> {
  if (value === null || value === undefined) {
    // Check for fallback
    if (fallback) return { "__fallback__": fallback };

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
  property: string,
  type: NodeType,
  expectedLength: number
): number {
  // Check whether the index is defined
  if (index === undefined) {
    throw new EvaluatorError(
      ERROR_MESSAGES.EVALUATOR.ERR_ARRAY_INDEX_NOT_DEFINED,
      {
        property,
        type,
      }
    );
  }

  // Check the index bounds
  if (index < 0 || index >= expectedLength) {
    throw new EvaluatorError(
      ERROR_MESSAGES.EVALUATOR.ARRAY_INDEX_OUT_OF_BOUNDS,
      {
        property,
        index,
        type,
      }
    );
  }

  return index;
}
