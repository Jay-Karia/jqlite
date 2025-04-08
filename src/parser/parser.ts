/**
 * @fileoverview The parser for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType, type Token } from "src/lexer/tokens";
import { ast } from "src/ast/ast";
import { incrementIndex } from "./helpers";
import { context } from "src/core/context";
import { Expectations } from "./expect";

//=================================================================================

/**
 * Parser class
 * @description This class is responsible for parsing the tokens into an AST.
 */
export class Parser {
  /**
   * Parse the tokens into an AST
   * @param {Token[]} tokens The tokens of the query
   */
  public parse(tokens: Token[]): void {
    // Set the expect class
    const expectations = new Expectations(tokens);

    // Iterating over tokens
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];

      //=======================================ROOT=========================================

      if (token.type === TokenType.ROOT) ast.createRootNode();
      //=======================================DOT==========================================
      else if (token.type === TokenType.DOT) {
        // Expectations for the token
        expectations.dot(index);

        // Get the property token
        const propertyToken = tokens[index + 1];

        // Add the token to the AST
        ast.createPropertyNode(propertyToken.value);

        // Update the index
        index += incrementIndex(TokenType.DOT);
      }

      //===================================PROPERTY==========================================
      else if (token.type === TokenType.PROPERTY) {
        // Expectations for the token
        expectations.property(index);

        // Get the previous node
        const previousNode = ast.getRecentNode();

        // Add the token to the AST with parent as the last property node;
        ast.createPropertyNode(token.value, null, previousNode);
      }

      //===================================LEFT BRACKET=======================================
      else if (token.type === TokenType.LEFT_BRACKET) {
        // Expectations for the token
        expectations.leftBracket(index);
      }

      //================================RIGHT BRACKET==========================================
      else if (token.type === TokenType.RIGHT_BRACKET) {
        // Expectations for the token
        expectations.rightBracket(index);
      }

      //====================================NUMBER=============================================
      else if (token.type === TokenType.NUMBER) {
        // Expectations for the token
        expectations.number(index);

        // Check for array slice
        const isArraySlice = tokens[index + 1].type === TokenType.SLICE;
        if (isArraySlice) {
          index = this.parseArraySlice(tokens, index + 1, expectations);
          continue;
        };

        // Get the previous node
        const previous = ast.getRecentNode();

        // Add the token to AST
        ast.createArrayAccessNode(Number(token.value), null, previous);
      }

      //=================================ARRAY SLICE===========================================

      else if (token.type === TokenType.SLICE) {
        index = this.parseArraySlice(tokens, index, expectations);
      }

      //===================================WILDCARD============================================
      else if (token.type === TokenType.WILDCARD) {
        this.parseWildcard(index, expectations);
        index += incrementIndex(TokenType.WILDCARD);
      }

      //===================================FALLBACK============================================
      else if (token.type === TokenType.FALL_MARK) {
        // Expectations for the token
        expectations.fallMark(index);

        // Get the fallback token
        const fallbackToken = tokens[index + 1];

        // Update the context of query
        const fallback = fallbackToken.value;
        context.set("fallback", fallback);

        // Add the token to the AST with parent as the last property node;
        ast.createFallbackNode(fallbackToken.value);
      }

      //========================================================================================
    }
  }

  //========================================INTERNALS============================================

  /**
   * Parse the array slice token
   * @param {Token[]} tokens The tokens of the query
   * @param {number} index The index of the token
   * @param {Expectations} expectations The expectations for the token
   */
  private parseArraySlice(
    tokens: Token[],
    index: number,
    expectations: Expectations
  ): number {
    // Expectations for the token
    expectations.arraySlice(index);

    // Get the slice token
    const startRange = tokens[index - 1].value;
    const endRange = tokens[index + 1].value;

    // Add the token to the AST
    ast.createArraySliceNode(
      Number(startRange),
      Number(endRange),
      null,
      ast.getRecentNode()
    );

    return index + incrementIndex(TokenType.SLICE);
  }

  /**
   * Parse the wildcard token
   * @param {number} index The index of the token
   * @param {Expectations} expectations The expectations object
   */
  private parseWildcard(index: number, expectations: Expectations): void {
    // Expect the previous token to be a left bracket
    expectations.wildcard(index);

    // Get the previous node
    const previousNode = ast.getRecentNode();

    // Add the token to the AST with parent as the last property node;
    ast.createWildcardNode(null, previousNode);
  }

  //==================================================================================================
}

export const parser = new Parser();
