/**
 * @fileoverview Function arguments for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS===================================

import type { ASTNode } from "src/ast/types";
import { functionArgsNumber, sortArgs, type SubstringArgs, type SortArgs } from "./types";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";
import {configStore} from "src/config/store";

//===============================================================================

/**
 * Checks the number of arguments for a function based on the AST node.
 * @param {ASTNode} node The AST node containing the function to check
 * @throws {EvaluatorError} If the number of arguments is incorrect
 */
export function checkNumberOfArgs(node: ASTNode): void {
  // Get the function name
  const functionName = node.functionName;
  if (!functionName) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_FUNCTION_NAME, {
      functionName,
      type: node.type,
    });
  }

  // Get expected and actual number of arguments
  const expectedArgs = functionArgsNumber[functionName];
  const actualArgs = node.functionArgs;
  const actualArgsCount = actualArgs?.length || 0;

  // Check if the actual count is in the list of expected counts
  if (!expectedArgs.includes(actualArgsCount)) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_NUMBER_OF_ARGS, {
      functionName,
      type: node.type,
      expectedArgs,
      actualArgs: actualArgsCount,
    });
  }
}

/**
 * Checks the arguments for the sort function based on the AST node.
 * @param {ASTNode} node The AST node containing the function to check
 * @returns {SortArgs} The sort arguments
 * @throws {EvaluatorError} If the arguments are incorrect
 */
export function checkSortArguments(node: ASTNode): SortArgs {
  // Get the function arguments
  const functionArgs = node.functionArgs;
  let args: SortArgs = "asc";

  // Check if the function arguments are valid
  if (functionArgs && functionArgs.length > 0) {
    if (functionArgs[0] === "asc" || functionArgs[0] === "desc") {
      args = functionArgs[0];
    } else {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_ARGUMENTS, {
        functionName: node.functionName,
        type: node.type,
        arguments: functionArgs,
        expectedArguments: sortArgs,
      });
    }
  }
  return args;
}

/**
 * Checks the arguments for the contains function based on the AST node.
 * @param {ASTNode} node The AST node containing the function to check
 * @returns {string} The substring argument
 * @throws {EvaluatorError} If the arguments are incorrect
 */
export function checkContainsArguments(node: ASTNode): string {
  // Get the function arguments
  const functionArgs = node.functionArgs;

  // Check if the function arguments are valid
  if (functionArgs && functionArgs.length > 0) {
    return functionArgs[0];
  } else {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_ARGUMENTS, {
      functionName: node.functionName,
      type: node.type,
      arguments: functionArgs,
    });
  }
}

/**
 * Checks the arguments for the substring function based on the AST node.
 * @param {ASTNode} node The AST node containing the function to check
 * @returns {SubstringArgs} The substring arguments
 */
export function checkSubstringArguments(node: ASTNode): SubstringArgs {
  // Get the function arguments
  const functionArgs = node.functionArgs;

  // Check if the function arguments are valid
  if (!functionArgs || functionArgs.length === 0) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_ARGUMENTS, {
      functionName: node.functionName,
      type: node.type,
      arguments: functionArgs,
    });
  }

  // Get the start index
  const start = parseInt(functionArgs[0], 10);
  if (isNaN(start)) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_ARGUMENTS, {
      functionName: node.functionName,
      type: node.type,
      arguments: functionArgs,
      reason: "Start index must be a valid number",
    });
  }

  // Check for end index
  if (functionArgs.length <= 1) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_ARGUMENTS, {
      functionName: node.functionName,
      type: node.type,
      arguments: functionArgs,
      reason: "End index is required",
    });
  }

  // Get the end index
  const end = parseInt(functionArgs[1], 10);
  if (isNaN(end)) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_ARGUMENTS, {
      functionName: node.functionName,
      type: node.type,
      arguments: functionArgs,
      reason: "End index must be a valid number",
    });
  }

  return { start, end };
}

/**
 * Checks the arguments for the equals function based on the AST node.
 * @param {ASTNode} node The AST node containing the function to check
 * @returns {string} The argument to compare with
 * @throws {EvaluatorError} If the arguments are incorrect
 */
export function checkEqualsArguments(node: ASTNode): string {
  // Get the function arguments
  const functionArgs = node.functionArgs;

  // Check if the function arguments are valid
  if (functionArgs && functionArgs.length > 0) {
    return functionArgs[0];
  } else {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_ARGUMENTS, {
      functionName: node.functionName,
      type: node.type,
      arguments: functionArgs,
    });
  }
}

/**
 * Checks if a string is enclosed in quotes and removes them.
 * @param {string} str The string to be checked
 * @returns {string} The string without quotes
 */
export function checkQuotes(str: string): string {
  // Check for single and double quotes
  if ((str.startsWith("'") && str.endsWith("'")) || (str.startsWith('"') && str.endsWith('"'))) {
    return str.slice(1, -1);
  } else {
    // Check for the config option
    const quotedArguments = configStore.get().quotedArguments;

    // If the config option is set to true, throw an error
    if (quotedArguments) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NO_QUOTES, {
        propertyValue: str,
        quotedArguments
      });
    }

    return str;
  }
}
