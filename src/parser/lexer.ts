/**
 * @fileoverview Lexer for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType, type Token } from "./tokens";
import {
  getTokenType,
  hasNextToken,
  isAlpha,
  isDigit,
  readNumber,
  readWord,
} from "./helpers";

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
   * Get the current token in the input string.
   * @description Returns the token of the current character.
   * @returns {Token} The token of the current character
   */
  public getToken(): Token {
    // Check for end of query.
    if (!hasNextToken(this.input, this.position))
      return {
        type: TokenType.EOQ,
        value: "",
        position: this.position,
        length: 0,
      };

    // TODO: Skip Whitespace

    // Read the whole word
    if (isAlpha(this.character)) {
      const word = readWord(this.input, this.position);
      this.character = word;
      this.position += word.length - 1;
    }
    // Read the whole
    if (isDigit(this.character)) {
      const number = readNumber(this.input, this.position);
      this.character = number;
      this.position += number.length - 1;
    }

    const tokenType = getTokenType(this.character);

    const token: Token = {
      type: tokenType,
      value: this.character,
      position: this.position,
      length: this.character.length,
    };
    return token;
  }

  // skipWhitespace -> skip whitespace characters
}

export const lexer = new Lexer();
