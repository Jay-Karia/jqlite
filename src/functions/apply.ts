/**
 * @fileoverview Apply function for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS===================================

import type { ASTNode } from "src/ast/types";
import { avg, max, min, sum, count, sort, unique, reverse, contains, substring, upper, lower, strLength, equals } from "./functions";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";
import {checkContainsArguments, checkEqualsArguments, checkSortArguments, checkSubstringArguments} from "./arguments";

//===============================================================================

/**
 * Applies a function to the data based on the AST node.
 * @param {ASTNode} node The AST node containing the function to apply
 * @param {number[]} data The data to which the function will be applied
 * @returns {unknown} The result of applying the function
 */
export function applyNumericArrayFunction(node: ASTNode, data: number[]): unknown {
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
    default:
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_FUNCTION_APPLY, {
        functionName,
      });
  }
}

/**
 * Applies a function to the data based on the AST node.
 * @param {ASTNode} node The AST node containing the function to apply
 * @param {unknown[]} data The data to which the function will be applied
 * @returns {unknown} The result of applying the function
 */
export function applyArrayFunction(node: ASTNode, data: unknown[]): unknown {
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
    default:
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_FUNCTION_APPLY, {
        functionName,
      });
  }
}

/**
 * Applies a function to the data based on the AST node.
 * @param {ASTNode} node The AST node containing the function to apply
 * @param {string} data The data to which the function will be applied
 * @returns {unknown} The result of applying the function
 */
export function applyStringFunction(node: ASTNode, data: string): unknown {
  // Get the function name
  const functionName = node.functionName;

  // Apply the function
  switch (functionName) {
    case "contains":
      return contains(data, checkContainsArguments(node));
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
    default:
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_FUNCTION_APPLY, {
        functionName,
      });
  }
}
