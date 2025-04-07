/**
 * @fileoverview Helper functions for lexer.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { type Token, TokenType } from "./tokens";

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
 * Check if the current character is a valid token.
 * @param {string} char The current character in the input string.
 * @returns {number} Whether the current character is a valid token.
 */
export function countSkippable(char: string, position: number): number {
  let count = 0;
  while (hasNextToken(char, position) && isSkippable(char[position])) {
    count++;
    position++;
  }

  return count;
}

//=====================================CHECKERS===================================

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
 * Check whether the current character is a whitespace.
 * @param {string} char The current character in the input string.
 * @returns {boolean} Whether the current character is a letter or a digit.
 */
export function isSkippable(char: string): boolean {
  return /\s/.test(char);
}

//====================================READERS=====================================

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
 * Read the whole word or number.
 * @param {string} character The current character to read.
 * @param {string} input The input query.
 * @param {string} position The current position of the character
 * @returns {string} The whole word.
 */
export function readAlphanumeric(
  character: string,
  input: string,
  position: number
): string {
  let word = "";

  // Read the whole word
  if (isAlpha(character)) {
    while (hasNextToken(input, position) && isAlpha(input[position])) {
      word += input[position];
      position++;
    }
  }

  // Read the whole number
  if (isDigit(character)) {
    while (hasNextToken(input, position) && isDigit(input[position])) {
      word += input[position];
      position++;
    }
  }
  return word;
}

export function readFallbackValue(
  input: string,
  position: number
): string {
  // Reads the input string from first ' to last '
  let word = "";

  while (hasNextToken(input, position)) {
    word += input[position];
    position++;
  }
  return word;
}

//====================================TOKENS=====================================

/**
 * Get the type of the token based on the character.
 * @param {string} char The current character in the input string.
 * @returns {TokenType} The type of the token.
 */
export function getTokenType(char: string): TokenType {
  switch (char) {
    case "$":
      return TokenType.ROOT;
    case ".":
      return TokenType.DOT;
    case "[":
      return TokenType.LEFT_BRACKET;
    case "]":
      return TokenType.RIGHT_BRACKET;
    case "??":
      return TokenType.FALL_MARK;
    case " ":
    case "\t":
    case "\n":
      return TokenType.WHITESPACE;
    default:
      if (isAlpha(char)) return TokenType.PROPERTY;
      else if (isDigit(char)) return TokenType.NUMBER;
      else return TokenType.UNKNOWN;
  }
}

/**
 * Get the end of query token.
 * @param {string} position The current position in the input string.
 * @returns {Token} The end of query token.
 */
export function getEoqToken(position: number): Token {
  const token: Token = {
    type: TokenType.EOQ,
    value: "",
    position: position,
    length: 0,
  };

  return token;
}

//===============================================================================
