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

/**
 * Check if the current character is a valid identifier.
 * @param {string} char The current character in the input string.
 * @returns {boolean} Whether the current character is a valid identifier.
 */
export function isAlphanumeric(char: string): boolean {
  return isAlpha(char) || isDigit(char);
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
export function readAlphanumeric(input: string, position: number): string {
  let identifier = "";

  // Continue reading as long as we have valid identifier characters
  while (
    hasNextToken(input, position) &&
    (isAlpha(input[position]) ||
     isDigit(input[position]) ||
     input[position] === '_'  || // Allow underscore in identifiers
     input[position] === '-'  // Allow hyphen in identifiers
    )
  ) {
    identifier += input[position];
    position++;
  }

  return identifier;
}

/**
 * Read the fallback value from the input string.
 * @param {string} input The input string.
 * @param {number} position The position of the character.
 * @returns The fallback value.
 */
export function readFallbackValue(input: string, position: number): string {
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
    case "*":
      return TokenType.WILDCARD;
    case ":":
      return TokenType.SLICE;
    case "!":
      return TokenType.NOT;
    case ",":
      return TokenType.COMMA;
    case "(":
      return TokenType.LEFT_PARENTHESIS;
    case ")":
      return TokenType.RIGHT_PARENTHESIS;
    case "#":
      return TokenType.DECLARATION;
    case " ":
    case "\t":
    case "\n":
      return TokenType.WHITESPACE;
    default:
      if (isDigit(char)) return TokenType.NUMBER;
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
