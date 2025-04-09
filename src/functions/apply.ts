/**
 * @fileoverview Apply function for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS===================================

import type { ASTNode } from "src/ast/types";
import { avg, max, min, sum } from "./functions";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";

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
