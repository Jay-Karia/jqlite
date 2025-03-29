/**
 * @fileoverview Helper functions for lexer.
 * @author Jay-Karia
 */

"use strict";

/**
 * Check if there is a next token in the input string.
 * @param {string} input The input query string.
 * @param {string} position The current position in the input string.
 * @returns Whether the current character is a letter.
 */
export function hasNextToken(input: string, position: number): boolean {
  return position < input.length;
}
