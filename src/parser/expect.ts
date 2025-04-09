/**
 * @fileoverview Expectations for tokens.
 * @author Jay-Karia
 */

"use strict";

//==================================IMPORTS====================================

import { TokenType, type Token } from "src/lexer/tokens";
import { expect, expectAny } from "./helpers";
import {context} from "src/core/context";

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
    // Expect the next token to be a property or not or left parenthesis
    expectAny(this._tokens, index + 1, [
      TokenType.PROPERTY,
      TokenType.NOT,
      TokenType.LEFT_PARENTHESIS,
    ]);
  }

  /**
   * Expectations for the property token
   * @param {number} index The index of the token
   */
  public property(index: number): void {
    // Expect the previous token to be a dot or not or left parenthesis or comma
    expectAny(this._tokens, index - 1, [
      TokenType.DOT,
      TokenType.NOT,
      TokenType.LEFT_PARENTHESIS,
      TokenType.COMMA,
    ]);
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
    // Get the slice type from context
    const sliceType = context.get("sliceType");

    // Left Slice
    if (sliceType === "left") {
      // Expect the previous token to be number
      expect(this._tokens, index - 1, TokenType.NUMBER);

      // Expect the second previous token to be left bracket
      expect(this._tokens, index - 2, TokenType.LEFT_BRACKET);

      // Expect the next token to be right bracket
      expect(this._tokens, index + 1, TokenType.RIGHT_BRACKET);
    } else if (sliceType === "right") {
      // Expect the next token to be number
      expect(this._tokens, index + 1, TokenType.NUMBER);

      // Expect the second next token to be right bracket
      expect(this._tokens, index + 2, TokenType.RIGHT_BRACKET);

      // Expect the previous token to be left bracket
      expect(this._tokens, index - 1, TokenType.LEFT_BRACKET);
    } else {
      // Expect the next token to be number
      expect(this._tokens, index + 1, TokenType.NUMBER);

      // Expect the previous toke to be number
      expect(this._tokens, index - 1, TokenType.NUMBER);

      // Expect the second previous token to be left bracket
      expect(this._tokens, index - 2, TokenType.LEFT_BRACKET);

      // Expect the second next token to be right bracket
      expect(this._tokens, index + 2, TokenType.RIGHT_BRACKET);
    }
  }

  /**
   * Expectations for the left bracket token
   * @param {number} index The index of the token
   */
  public leftBracket(index: number): void {
    // Expect the next token to be number or wildcard or slice
    expectAny(this._tokens, index + 1, [
      TokenType.NUMBER,
      TokenType.WILDCARD,
      TokenType.SLICE,
    ]);
  }

  /**
   * Expectations for the right bracket token
   * @param {number} index The index of the token
   */
  public rightBracket(index: number): void {
    // Expect the previous token to be number or wildcard
    expectAny(this._tokens, index - 1, [TokenType.NUMBER, TokenType.WILDCARD]);
  }

  /**
   * Expectations for the number token
   * @param {number} index The index of the token
   */
  public number(index: number): void {
    // Expect the previous token to be left bracket or slice
    expectAny(this._tokens, index - 1, [
      TokenType.LEFT_BRACKET,
      TokenType.SLICE,
    ]);

    // Expect the next token to be slice or right bracket
    expectAny(this._tokens, index + 1, [
      TokenType.RIGHT_BRACKET,
      TokenType.SLICE,
    ]);
  }

  /**
   * Expectations for the fall mark token
   * @param {number} index The index of the token
   */
  public fallMark(index: number): void {
    // Expect the second next token to be a fallback
    expect(this._tokens, index + 1, TokenType.FALLBACK);
  }

  /**
   * Expectations for the not token
   * @param {number} index The index of the token
   */
  public not(index: number): void {
    // Expect the next token to be property or left parenthesis
    expectAny(this._tokens, index + 1, [
      TokenType.PROPERTY,
      TokenType.LEFT_PARENTHESIS,
    ]);

    // Expect the previous token to be dot
    expect(this._tokens, index - 1, TokenType.DOT);
  }

  /**
   * Expectations for the left parenthesis token
   * @param {number} index The index of the token
   */
  public leftParenthesis(index: number): void {
    // Expect the previous token to be dot or not
    expectAny(this._tokens, index - 1, [TokenType.DOT, TokenType.NOT]);

    // Expect the next token to be property
    expect(this._tokens, index + 1, TokenType.PROPERTY);
  }

  /**
   * Expectations for the right parenthesis token
   * @param {number} index The index of the token
   */
  public rightParenthesis(index: number): void {
    // Expect the previous token to be property
    expect(this._tokens, index - 1, TokenType.PROPERTY);
  }

  /**
   * Expectations for the comma token
   * @param {number} index The index of the token
   */
  public comma(index: number): void {
    // Expect the previous token to be property
    expect(this._tokens, index - 1, TokenType.PROPERTY);

    // Expect the next token to be property
    expect(this._tokens, index + 1, TokenType.PROPERTY);
  }
}
