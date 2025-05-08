/**
 * @fileoverview Helper functions for the Parser.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { type Token, TokenType } from "src/lexer/tokens";
import type { ErrorParams } from "src/errors/types";
import type { ASTNode } from "src/ast/types";
import type { SliceType } from "src/core/types";
import { type functionCategories, functionCategoryMap, functionNames } from "../functions/types";
import { ParserError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";
import { ast } from "src/ast/ast";
import { context } from "src/core/context";

//=================================================================================

/**
 * Expects the next token to be of a certain type
 * @param {Token[]} tokens The tokens to check
 * @param {number} index The index of the token to check
 * @param {string} type The type of the token to check
 * @returns {boolean} Whether the token is valid or not
 */
export function expect(tokens: Token[], index: number, type: TokenType): boolean {
  let valid = false;

  const token = tokens[index];
  if (token) {
    if (token.type === type) {
      valid = true;
    } else {
      throw new ParserError(ERROR_MESSAGES.PARSER.UNEXPECTED_TOKEN, {
        expected: type,
        actual: token.type,
        token,
      });
    }
  }

  return valid;
}

/**
 * Expects the next token to be of any type in the given types array
 * @param {Token[]} tokens The tokens to check
 * @param {number} index The index of the token to check
 * @param {string[]} types The types of the token to check
 * @returns {boolean} Whether the token is valid or not
 */
export function expectAny(tokens: Token[], index: number, types: TokenType[]): boolean {
  let valid = false;

  const token = tokens[index];
  if (token) {
    if (types.includes(token.type)) {
      valid = true;
    } else {
      throw new ParserError(ERROR_MESSAGES.PARSER.UNEXPECTED_TOKEN, {
        expected: types,
        actual: token.type,
        token,
      });
    }
  }

  return valid;
}

/**
 * Increments the index based on the token type
 * @param {TokenType} token The token to check
 * @returns {number} The index to increment
 */
export function incrementIndex(token: TokenType): number {
  let index = 0;

  switch (token) {
    case "Dot":
    case "LeftBracket":
    case "Property":
    case "Not":
      index = 1;
      break;
    case "Number":
    case "Slice":
      index = 2;
      break;
    default:
      index = 0;
      break;
  }

  return index;
}

/**
 * Checks if the previous node is of a certain type
 * @param {Token[]} tokens - The tokens array
 * @param {number} index - The current index
 * @param {string} type - The expected type of the previous node
 * @param {ErrorParams} error - The error parameters for handling errors
 * @returns {ASTNode} The previous ASTNode if valid
 */
export function checkPreviousNode(tokens: Token[], index: number, type: TokenType, error: ErrorParams): ASTNode {
  const previousNode = ast.getRecentNode();
  if (!previousNode || previousNode.type !== type) {
    throw new ParserError(error, {
      previousNode,
      currentNode: tokens[index],
      expectedNode: type,
    });
  }

  return previousNode;
}

/**
 * Get the type of slice among three types
 * @param {Token[]} tokens The tokens fro the query
 * @param {number} index The index of the slice token
 * @returns {SliceType} The type of slice
 */
export function getSliceType(tokens: Token[], index: number): SliceType {
  const isLeftSlice = tokens[index - 1].type === TokenType.NUMBER && tokens[index - 2].type === TokenType.LEFT_BRACKET && tokens[index + 1].type === TokenType.RIGHT_BRACKET;
  const isRightSlice = tokens[index + 1].type === TokenType.NUMBER && tokens[index + 2].type === TokenType.RIGHT_BRACKET && tokens[index - 1].type === TokenType.LEFT_BRACKET;

  if (isLeftSlice) return "left";
  if (isRightSlice) return "right";

  return null;
}

/**
 * Checks if the multiple select is enabled, and throws an error if not
 * @param {Token} token The token to check
 * @param {number} index The index of the token
 * @param {ErrorParams} errorParam The error parameters
 */
export function checkMultipleSelectAndOmit(token: Token, index: number, errorParam?: ErrorParams): void {
  // Get the value from context
  const isMultipleSelect = context.get("multipleSelect") ?? false;
  const isMultipleOmit = context.get("multipleOmit") ?? false;

  // Check the values
  if (!isMultipleSelect && !isMultipleOmit) {
    throw new ParserError(errorParam ? errorParam : ERROR_MESSAGES.PARSER.MULTIPLE_FALSE, {
      token: token.value,
      index,
      multipleSelect: isMultipleSelect,
      multipleOmit: isMultipleOmit,
    });
  }
}

/**
 * Handles the multiple select
 * @param {Token} token The token to handle
 */
export function handleMultipleSelect(token: Token): void {
  // Add the values to the selected keys
  const selectedKeys = context.get("selectedKeys") ?? [];
  selectedKeys.push(token.value);
  context.set("selectedKeys", selectedKeys);
}

/**
 * Handles the multiple omit
 * @param {Token} token The token to handle
 */
export function handleMultipleOmit(token: Token): void {
  // Add the values to omitted keys
  const omittedKeys = context.get("omittedKeys") ?? [];
  omittedKeys.push(token.value);
  context.set("omittedKeys", omittedKeys);
}

/**
 * Handles the function arguments
 * @param {Token} token The token to handle
 */
export function handleFunctionArgs(token: Token): void {
  // Get the function args from context
  const functionArgs = context.get("functionArgs") ?? [];

  // Add the token value to the function args
  functionArgs.push(token.value);
  context.set("functionArgs", functionArgs);
}

/**
 * Create an AST node for the function
 */
export function handleFunctionCreation(): void {
  // Get the function name
  const functionName = context.get("functionName") as functionNames;

  // Get the function args
  const functionArgs = context.get("functionArgs") ?? [];

  // Get the function category
  const functionCategory = getFunctionCategory(functionName as functionNames);

  // Get the previous node
  const previousNode = ast.getRecentNode();

  // Check for condition
  const isCondition = context.get("isCondition") ?? false;

  // Add the token to the AST with parent as the last property node;
  if (isCondition) ast.createFunctionNode(functionName, functionArgs, functionCategory, previousNode);
  else ast.createFunctionNode(functionName, functionArgs, functionCategory);

  // Reset the context
  context.set("isFunction", false);
}

/**
 * Checks if the function name is valid
 * @param {string} functionName The function name to check
 * @returns {functionNames} The function name
 */
export function checkFunctionName(functionName: string): functionNames {
  // Get valid function names
  const validFunctionNames = Object.values(functionNames);

  // Check if the function name is valid
  if (!validFunctionNames.includes(functionName as functionNames)) {
    throw new ParserError(ERROR_MESSAGES.PARSER.INVALID_FUNCTION_NAME, {
      functionName,
      validFunctionNames,
    });
  }

  return functionName as functionNames;
}

/**
 * Checks if the function is valid
 * @param {string} functionName The function name to check
 * @returns {functionCategories} The function category
 */
export function getFunctionCategory(functionName: functionNames): functionCategories {
  // Get the function category
  const functionCategory = functionCategoryMap[functionName as functionNames];
  return functionCategory;
}

/**
 * Checks if the brackets are matching
 * @param {Token} token The token to check
 * @param {number} index The index of the token
 * @param {number} openBracket The number of open brackets
 */
export function handleBracketMismatch(token: Token, index: number, openBracket: number): void {
  // CLosing bracket
  if (openBracket > 0) {
    throw new ParserError(ERROR_MESSAGES.PARSER.BRACKET_MISMATCH, {
      token: token.value,
      index,
      openBracket,
      expected: "]",
    });
  }
  // Opening bracket
  else if (openBracket < 0) {
    throw new ParserError(ERROR_MESSAGES.PARSER.BRACKET_MISMATCH, {
      token: token.value,
      index,
      openBracket,
      expected: "[",
    });
  }
}

/**
 * Checks if the parenthesis are matching
 * @param {Token} token The token to check
 * @param {number} index The index of the token
 * @param {number} openParen The number of open parenthesis
 */
export function handleParenthesisMismatch(token: Token, index: number, openParen: number): void {
  // Closing parenthesis
  if (openParen > 0) {
    throw new ParserError(ERROR_MESSAGES.PARSER.PARENTHESIS_MISMATCH, {
      token: token.value,
      index,
      openParen,
      expected: ")",
    });
  }
  // Opening parenthesis
  else if (openParen < 0) {
    throw new ParserError(ERROR_MESSAGES.PARSER.PARENTHESIS_MISMATCH, {
      token: token.value,
      index,
      openParen,
      expected: "(",
    });
  }
}
