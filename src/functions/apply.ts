/**
 * @fileoverview Apply function for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS===================================

import type { FunctionNode } from "src/ast/nodes";
import { avg, max, min, sum, count, sort, unique, reverse, contains, substring, upper, lower, strLength, equals, isTrue, isFalse } from "./functions";
import { checkEqualsArguments, checkSortArguments, checkSubstringArguments } from "./arguments";

//===============================================================================

/**
 * Applies a function to the data based on the AST node.
 * @param {FunctionNode} node The AST node containing the function to apply
 * @param {number[]} data The data to which the function will be applied
 * @returns {unknown} The result of applying the function
 */
export function applyNumericArrayFunction(node: FunctionNode, data: number[]): unknown {
  // Get the function name
  const functionName = node.functionName;

  // Apply the function
  switch (functionName) {
    case "max":
      return max(data);
    case "min":
      return min(data);
    case "sum":
      return sum(data);
    case "avg":
      return avg(data);
  }
}

/**
 * Applies a function to the data based on the AST node.
 * @param {FunctionNode} node The AST node containing the function to apply
 * @param {unknown[]} data The data to which the function will be applied
 * @returns {unknown} The result of applying the function
 */
export function applyArrayFunction(node: FunctionNode, data: unknown[]): unknown {
  // Get the function name
  const functionName = node.functionName;

  // Apply the function
  switch (functionName) {
    case "count":
      return count(data);
    case "sort":
      return sort(data, checkSortArguments(node));
    case "reverse":
      return reverse(data);
    case "unique":
      return unique(data);
  }
}

/**
 * Applies a function to the data based on the AST node.
 * @param {FunctionNode} node The AST node containing the function to apply
 * @param {string} data The data to which the function will be applied
 * @returns {unknown} The result of applying the function
 */
export function applyStringFunction(node: FunctionNode, data: string): unknown {
  // Get the function name
  const functionName = node.functionName;

  // Apply the function
  switch (functionName) {
    case "contains":
      return contains(data, node.functionArgs[0]);
    case "substring":
      return substring(data, checkSubstringArguments(node));
    case "length":
      return strLength(data);
    case "upper":
      return upper(data);
    case "lower":
      return lower(data);
    case "equals":
      return equals(data, checkEqualsArguments(node));
  }
}

/**
 * Applies a boolean function to the data based on the AST node.
 * @param {FunctionNode} node The AST node containing the function to apply
 * @param {boolean} data The data to which the function will be applied
 * @returns {unknown} The result of applying the function
 */
export function applyBooleanFunction(node: FunctionNode, data: boolean): unknown {
  // Get the function name
  const functionName = node.functionName;

  // Apply the function
  switch (functionName) {
    case "isTrue":
      return isTrue(data);
    case "isFalse":
      return isFalse(data);
  }
}
