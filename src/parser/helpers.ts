/**
 * @fileoverview Helper functions for the Parser.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { Token } from "src/lexer/tokens";
import { ParserError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";

//=================================================================================

/**
 * Expects the next token to be of a certain type
 * @param {Token[]} tokens The tokens to check
 * @param {number} index The index of the token to check
 * @param {string} type The type of the token to check
 * @returns {boolean} Whether the token is valid or not
 */
export function expect(tokens: Token[], index: number, type: string): boolean {
  let valid = false;

  const nextToken = tokens[index];
  if (nextToken) {
    if (nextToken.type === type) {
      valid = true;
    } else {
      throw new ParserError(ERROR_MESSAGES.PARSER.UNEXPECTED_TOKEN, {
        expected: type,
        actual: nextToken.type,
        token: nextToken,
        index: index + 1,
      });
    }
  }

  return valid;
}

/**
 * Increments the index based on the token type
 * @param token The token to check
 * @returns The index to increment
 */
export function incrementIndex(token: string): number {
  let index = 0;

  switch (token) {
    case "Dot":
      index = 1;
      break;
    case "LeftBracket":
      index = 2;
      break;
    case "Number":
      index = 2;
      break;
    default:
      index = 0;
      break;
  }

  return index;
}
