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
export function expect(
  tokens: Token[],
  index: number,
  type: TokenType
): boolean {
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
export function expectAny(
  tokens: Token[],
  index: number,
  types: TokenType[]
): boolean {
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
    case "Wildcard":
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
export function checkPreviousNode(
  tokens: Token[],
  index: number,
  type: TokenType,
  error: ErrorParams
): ASTNode {
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
  const isLeftSlice =
    tokens[index - 1].type === TokenType.NUMBER &&
    tokens[index - 2].type === TokenType.LEFT_BRACKET &&
    tokens[index + 1].type === TokenType.RIGHT_BRACKET;
  const isRightSlice =
    tokens[index + 1].type === TokenType.NUMBER &&
    tokens[index + 2].type === TokenType.RIGHT_BRACKET &&
    tokens[index - 1].type === TokenType.LEFT_BRACKET;

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
export function checkMultipleSelectAndOmit(
  token: Token,
  index: number,
  errorParam?: ErrorParams
): void {
  // Get the value from context
  const isMultipleSelect = context.get("multipleSelect") ?? false;
  const isMultipleOmit = context.get("multipleOmit") ?? false;

  // Check the values
  if (!isMultipleSelect && !isMultipleOmit) {
    throw new ParserError(
      errorParam ? errorParam : ERROR_MESSAGES.PARSER.MULTIPLE_FALSE,
      {
        token: token.value,
        index,
        multipleSelect: isMultipleSelect,
        multipleOmit: isMultipleOmit,
      }
    );
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
