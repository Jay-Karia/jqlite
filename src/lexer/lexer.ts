/**
 * @fileoverview Lexer for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { type Token, TokenType } from "./tokens";
import { countSkippable, getEoqToken, getTokenType, hasNextToken, isAlphanumeric, isDigit, readAlphanumeric, readFallbackValue, readNumber } from "./helpers";

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
  private isDeclaration: boolean;
  private isFunction: boolean;
  private functionDeclared: boolean;
  private isCondition: boolean;

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
    this.isDeclaration = false;
    this.isFunction = false;
    this.functionDeclared = false;
    this.isCondition = false;
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

    // Reset the variables
    this.input = "";
    this.position = 0;
    this.character = "";
    this.isEoq = false;
    this.isFallback = false;
    this.ignoreWhitespace = false;
    this.isDeclaration = false;
    this.isFunction = false;
    this.functionDeclared = false;
    this.isCondition = false;

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

    // Read the function name
    if (this.isDeclaration) {
      tokenType = TokenType.FUNCTION;
      this.isDeclaration = false;
      this.functionDeclared = true;
    }

    // Set the function declaration
    if (this.character === "#") {
      this.isDeclaration = true;
    }

    // Negative numbers
    if (this.character === "-") {
      if (isDigit(this.peek())) {
        this.character = `-${readNumber(this.input, this.position + 1)}`;
        this.position += this.character.length - 1;
        tokenType = TokenType.NUMBER;
      }
    }

    // Read the whole word or number
    if (isAlphanumeric(this.character)) {
      const word = readAlphanumeric(this.input, this.position);
      this.character = word;
      this.position += word.length - 1;

      // Check the token type
      if (this.isFunction) tokenType = TokenType.ARGUMENT;
      else if (this.functionDeclared) tokenType = TokenType.FUNCTION;
      else if (isDigit(this.character)) tokenType = TokenType.NUMBER;
      else tokenType = TokenType.PROPERTY;
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

    // Check for condition
    if (this.character === "?" && this.peek() === "(") {
      this.isCondition = true;
    }

    // Check for comparison operators
    if (this.character === ">" && this.peek() === "=") {
      this.character = ">=";
      this.shift();
      tokenType = TokenType.GREATER_THAN_EQUAL;
    }
    else if (this.character === "<" && this.peek() === "=") {
      this.character = "<=";
      this.shift();
      tokenType = TokenType.LESS_THAN_EQUAL;
    }
    else if (this.character === "=" && this.peek() === "=") {
      this.character = "==";
      this.shift();
      tokenType = TokenType.EQUALS;
    }
    else if (this.character === "!" && this.peek() === "=") {
      this.character = "!=";
      this.shift();
      tokenType = TokenType.NOT_EQUALS;
    }

    // Get the token type and return the token.
    if (tokenType === TokenType.UNKNOWN) tokenType = getTokenType(this.character);
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
