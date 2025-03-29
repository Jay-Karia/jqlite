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
 * Check if the current character is a letter.
 * @param {string} char The current character in the input string.
 * @returns {boolean} Whether the current character is a letter.
 */
export function isAlpha(char: string): boolean {
  return /^[a-zA-Z]+$/.test(char);
}

/**
 * Check if the current character is a letter or a digit.
 * @param {string} char The current character in the input string.
 * @returns {boolean} Whether the current character is a digit.
 */
export function isDigit(char: string): boolean {
  return /^\d+$/.test(char);
}

/**
 * Read the whole word from the input string.
 * @param {string} input The input string.
 * @param {number} position The current position in the input string.
 * @returns {string} The whole word.
 */
export function readWord(input: string, position: number): string {
  let word = "";
  while (hasNextToken(input, position) && isAlpha(input[position])) {
    word += input[position];
    position++;
  }
  return word;
}

/**
 * Read the whole number from the input string.
 * @param {string} input The input string.
 * @param {number} position The current position in the input string.
 * @returns {string} The whole number.
 */
export function readNumber(input: string, position: number): string {
  let number = "";
  while (hasNextToken(input, position) && isDigit(input[position])) {
    number += input[position];
    position++;
  }
  return number;
}

/**
 * Get the type of the token based on the character.
 * @param {string} char The current character in the input string.
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
      if (isAlpha(char)) return TokenType.PROPERTY;
      else if (isDigit(char)) return TokenType.NUMBER;
      else return TokenType.UNKNOWN;
  }
}
