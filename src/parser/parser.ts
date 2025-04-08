/**
 * @fileoverview The parser for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType, type Token } from "src/lexer/tokens";
import { ast } from "src/ast/ast";
import {
  checkMultipleSelectAndOmit,
  getSliceType,
  handleMultipleOmit,
  handleMultipleSelect,
  incrementIndex,
} from "./helpers";
import { context } from "src/core/context";
import { Expectations } from "./expect";
import { ParserError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";

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
      }

      //===================================PROPERTY==========================================
      else if (token.type === TokenType.PROPERTY) {
        // Expectations for the token
        expectations.property(index);

        // Check for multiple select/omit
        const isMultipleSelect = context.get("multipleSelect") ?? false;
        const isMultipleOmit = context.get("multipleOmit") ?? false;

        // Add the selected keys to context
        if (isMultipleSelect) handleMultipleSelect(token);
        // Add the omitted keys to context
        else if (isMultipleOmit) handleMultipleOmit(token);
        // Add the token to the AST
        else ast.createPropertyNode(token.value);
      }

      //=========================================NOT============================================
      else if (token.type === TokenType.NOT) {
        // Expectations for the token
        expectations.not(index);

        // Check for multiple omit
        const isMultipleOmit =
          tokens[index + 1].type === TokenType.LEFT_PARENTHESIS;

        // Only update the context
        if (isMultipleOmit) {
          context.set("multipleOmit", true);
          continue;
        }

        // Add the token to the AST
        const not = ast.createOmitNode();

        // Get the next property token
        const propertyToken = tokens[index + 1];

        // Add the property token to the AST
        ast.createPropertyNode(propertyToken.value, null, not);

        // Increment the index
        index += incrementIndex(TokenType.NOT);
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
        }

        // Get the previous node
        const previous = ast.getRecentNode();

        // Add the token to AST
        ast.createArrayAccessNode(Number(token.value), null, previous);
      }

      //================================LEFT PARENTHESIS=======================================
      else if (token.type === TokenType.LEFT_PARENTHESIS) {
        // Expectations for the token
        expectations.leftParenthesis(index);

        // Update the context
        const isMultipleOmit = context.get("multipleOmit") ?? false;
        if (!isMultipleOmit) context.set("multipleSelect", true);
      }

      //===============================RIGHT PARENTHESIS=======================================
      else if (token.type === TokenType.RIGHT_PARENTHESIS) {
        // Expectations for the token
        expectations.rightParenthesis(index);

        // Throw an error if multiple select/omit is off
        checkMultipleSelectAndOmit(token, index);

        // Check for selected keys and add it to AST
        const selectedKeys = context.get("selectedKeys");
        if (selectedKeys.length > 0) ast.createMultipleSelectNode(selectedKeys);

        // Check for omitted keys and add it to AST
        const omittedKeys = context.get("omittedKeys");
        if (omittedKeys.length > 0) ast.createMultipleOmitNode(omittedKeys);

        // Update the context
        context.set("multipleSelect", false);
        context.set("selectedKeys", []);
        context.set("multipleOmit", false);
        context.set("omittedKeys", []);
      }

      //======================================COMMA============================================
      else if (token.type === TokenType.COMMA) {
        // Expectations for the token
        expectations.comma(index);

        // Throw an error if multiple select/omit is off
        checkMultipleSelectAndOmit(token, index);
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

      //========================================EOQ=============================================
      else if (token.type === TokenType.EOQ) {
        // Check if multiple select/omit is still on
        const isMultipleSelect = context.get("multipleSelect") ?? false;
        const isMultipleOmit = context.get("multipleOmit") ?? false;
        if (isMultipleSelect || isMultipleOmit) {
          throw new ParserError(ERROR_MESSAGES.PARSER.MULTIPLE_TRUE, {
            token: token.value,
            index: index,
            multipleSelect: isMultipleSelect,
            expected: ")",
          });
        }
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
    // Check the slice type
    const sliceType = getSliceType(tokens, index);

    // Expectations for the token
    expectations.arraySlice(index, sliceType);

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
