/**
 * @fileoverview Lexer for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType, type Token } from "./tokens";
import { hasNextToken } from "./helpers";

//=================================================================================

/**
 * Lexer class
 * @description This class is responsible for tokenizing the input string.
 */
export class Lexer {
  private input: string;
  private position: number;
  private character: string;

  /**
   * Lexer constructor
   */
  constructor() {
    this.input = "";
    this.position = 0;
    this.character = "";
  }

  /**
   * Tokenizes the input string
   * @param {string} input The input string to tokenize
   * @returns {Token[]} The tokens
   */
  public tokenize(input: string): Token[] {
    this.input = input;

    const tokens = new Array<Token>();

    while (hasNextToken(this.input, this.position)) {
      // Update the current character
      this.character = this.input[this.position];

      // Get the token of current character
      const token: Token = this.getToken();
      tokens.push(token);

      // Change the position
      this.position++;
    }

    console.log(tokens);

    return tokens;
  }

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
   * Get the current character in the input string.
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
   * Get the current token in the input string.
   * @description Returns the token of the current character.
   * @returns {Token} The token of the current character
   */
  public getToken(): Token {
    // Check for end of query.
    if (!hasNextToken(this.input, this.position))
      return { type: TokenType.EOQ, value: "", position: this.position };

    const token: Token = {
      type: TokenType.ROOT,
      value: this.character,
      position: this.position,
    };
    return token;
  }

  // skipWhitespace -> skip whitespace characters
  // nextToken -> get the next token and push to tokens
  // isLetter, isDigit -> helpers
}

export const lexer = new Lexer();
