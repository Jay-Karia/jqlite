/**
 * @fileoverview Helper functions for lexer.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType } from "./tokens";

//=================================================================================

/**
 * Check if there is a next token in the input string.
 * @param {string} input The input query string.
 * @param {string} position The current position in the input string.
 * @returns Whether the current character is a letter.
 */
export function hasNextToken(input: string, position: number): boolean {
  return position < input.length;
}

/**
 * Get the type of the token based on the character.
 * @param {string} char The current character in the input string.
 * @description This function returns the type of the token based on the character.
 * @returns {TokenType} The type of the token.
 */
export function getTokenType(char: string): string {
  switch (char) {
    case "$":
      return TokenType.ROOT;
    case ".":
      return TokenType.DOT;
    case "[":
      return TokenType.LEFT_BRACKET;
    case "]":
      return TokenType.RIGHT_BRACKET;
    default:
      if (isNaN(Number(char))) {
        return TokenType.PROPERTY;
      } else {
        return TokenType.NUMBER;
      }
  }
}
