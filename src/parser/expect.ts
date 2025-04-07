/**
 * @fileoverview Expectations for tokens.
 * @author Jay-Karia
 */

"use strict";

//==================================IMPORTS====================================

import { TokenType, type Token } from "src/lexer/tokens";
import { expect } from "./helpers";

//=============================================================================

/**
 * Expectation class
 * @description This class defines all the expected values before and after every token
 */
export class Expectations {
  private readonly _tokens: Token[];

  /**
   * Expectation constructor
   * @param {Token[]} tokens The tokens to check
   */
  constructor(tokens: Token[]) {
    this._tokens = tokens;
  }

  /**
   * Expectations for the dot token
   * @param {number} index The index of the token
   */
  public dot(index: number): void {
    // Expect the next token to be a property
    expect(this._tokens, index + 1, TokenType.PROPERTY);
  }

  /**
   * Expectations for the property token
   * @param {number} index The index of the token
   */
  public property(index: number): void {
    // Expect the previous token to be a dot
    expect(this._tokens, index - 1, TokenType.DOT);
  }

  /**
   * Expectations for the wildcard token
   * @param {number} index The index of the token
   */
  public wildcard(index: number): void {
    // Expect the previous token to be a left bracket
    expect(this._tokens, index - 1, TokenType.LEFT_BRACKET);

    // Expect the next token to be right bracket
    expect(this._tokens, index + 1, TokenType.RIGHT_BRACKET);
  }

  /**
   * Expectations for the slice token
   * @param {number} index The index of the token
   */
  public arraySlice(index: number): void {
    // Expect the third next token to be number
    expect(this._tokens, index + 3, TokenType.NUMBER);

    // Expect the fourth next token to be right bracket
    expect(this._tokens, index + 4, TokenType.RIGHT_BRACKET);
  }
}
