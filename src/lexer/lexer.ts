/**
 * @fileoverview Lexer for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { type Token, TokenType } from "./tokens";
import {
  countSkippable,
  getEoqToken,
  getTokenType,
  hasNextToken,
  isAlpha,
  isDigit,
  readAlphanumeric,
  readFallbackValue,
} from "./helpers";

//=================================================================================

/**
 * Lexer class
 * @description This class is responsible for tokenizing the input string.
 */
export class Lexer {
  //====================================PROPERTIES===================================

  private input: string;
  private position: number;
  private character: string;
  private isEoq: boolean;
  private isFallback: boolean;
  private ignoreWhitespace: boolean;

  //====================================CONSTRUCTOR==================================

  /**
   * Lexer constructor
   */
  constructor() {
    this.input = "";
    this.position = 0;
    this.character = "";
    this.isEoq = false;
    this.isFallback = false;
    this.ignoreWhitespace = false;
  }

  //====================================TOKENIZATION==================================

  /**
   * Tokenizes the input string
   * @param {string} input The input string to tokenize
   * @returns {Token[]} The tokens
   */
  public tokenize(input: string): Token[] {
    // Get the input string
    this.input = input;
    const tokens = new Array<Token>();

    // Iterate through the input string
    while (hasNextToken(this.input, this.position)) {
      this.character = this.input[this.position];

      // Get the token and it's type
      const token: Token = this.getToken();
      tokens.push(token);

      // Update the position
      this.position++;
    }

    // Check for EOQ
    if (!this.isEoq) {
      tokens.push(getEoqToken(this.position));
      this.isEoq = true;
    }

    return tokens;
  }

  /**
   * Get the current token in the input string.
   * @description Returns the token of the current character.
   * @returns {Token} The token of the current character
   */
  public getToken(): Token {
    let tokenType: TokenType = TokenType.UNKNOWN;

    // Ignore whitespace
    if (this.ignoreWhitespace) {
      this.position += countSkippable(this.input, this.position);
      this.character = this.input[this.position];
    }

    // Check for end of query.
    if (!hasNextToken(this.input, this.position)) {
      this.isEoq = true;
      return getEoqToken(this.position);
    }

    // Read the whole word or number
    if (isAlpha(this.character) || isDigit(this.character)) {
      const word = readAlphanumeric(this.character, this.input, this.position);
      this.character = word;
      this.position += word.length - 1;
    }

    // Read the fallback value
    if (this.isFallback) {
      this.shift();
      const word = readFallbackValue(this.input, this.position);
      this.character = word;
      this.position += word.length - 1;
      tokenType = TokenType.FALLBACK;
      this.isFallback = false;
    }

    // Check for fallback
    if (this.character === "?" && this.peek() === "?") {
      this.shift();
      this.character = "??";
      this.isFallback = true;
    }

    // Ignore whitespace if left parenthesis is found
    if (this.character === "(") {
      this.ignoreWhitespace = true;
    }

    // Stop ignoring whitespace if right parenthesis is found
    if (this.character === ")") {
      this.ignoreWhitespace = false;
    }

    // Get the token type and return the token.
    if (tokenType === TokenType.UNKNOWN)
      tokenType = getTokenType(this.character);
    const token: Token = {
      type: tokenType,
      value: this.character,
      position: this.position,
      length: this.character.length,
    };

    return token;
  }

  //=======================================UTILS=====================================

  /**
   * See the next character in the input string
   * @description Returns the next character in the input string without moving the position.
   * @returns {string} The next character
   */
  public peek(): string {
    // Check for end of query.
    if (!hasNextToken(this.input, this.position)) return "";

    return this.input[this.position + 1];
  }

  /**
   * Get the next character in the input string.
   * @description Moves the position to the next character in the input string.
   * @returns {string} The next character in the input string
   */
  public next(): string {
    // Check for end of query.
    if (!hasNextToken(this.input, this.position)) return "";

    this.character = this.input[this.position + 1];
    this.position++;
    return this.character;
  }

  /**
   * Shift the position to the next character in the input string.
   */
  public shift(): void {
    if (!hasNextToken(this.input, this.position)) return;
    this.position++;
  }

  /**
   * Checks the token against the given types
   * @param {Token} token - The token to be checked
   * @param {string[]} types - The types to be checked against
   * @returns {boolean} True if the token is of the given type, false otherwise
   */
  public match(token: Token, types: string[]): boolean {
    let valid = false;

    // Check if the token is of the given type
    types.forEach(type => {
      if (token.type === type) valid = true;
    });

    return valid;
  }

  //=================================================================================
}

export const lexer = new Lexer();
