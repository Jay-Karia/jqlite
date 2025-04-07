/**
 * @fileoverview The parser for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType, type Token } from "src/lexer/tokens";
import { ast } from "src/ast/ast";
import { expect, expectAny, incrementIndex } from "./helpers";
import { context } from "src/core/context";

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
    // Iterating over tokens
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];

      //=======================================ROOT========================================

      if (token.type === TokenType.ROOT) ast.createRootNode();
      //=====================================PROPERTY=====================================
      else if (token.type === TokenType.DOT) {
        // Expect the next token to be a property
        expect(tokens, index + 1, TokenType.PROPERTY);

        // Get the property token
        const propertyToken = tokens[index + 1];

        // Add the token to the AST
        ast.createPropertyNode(propertyToken.value);

        // Update the index
        index += incrementIndex(TokenType.DOT);
      } else if (token.type === TokenType.PROPERTY) {
        // Expect the previous token to be a dot
        expect(tokens, index - 1, TokenType.DOT);

        // Get the previous node
        const previousNode = ast.getRecentNode();

        // Add the token to the AST with parent as the last property node;
        ast.createPropertyNode(token.value, null, previousNode);
      }

      //===================================LEFT BRACKET===================================
      else if (token.type === TokenType.LEFT_BRACKET) {
        // Expect the next token to be a number or wildcard
        expectAny(tokens, index + 1, [TokenType.NUMBER, TokenType.WILDCARD]);

        // Expect the second next token to be a right bracket
        expect(tokens, index + 2, TokenType.RIGHT_BRACKET);

        // Check for the next token type
        const nextTokenType = tokens[index + 1].type;

        //------------------------------------NUMBER---------------------------------------

        if (nextTokenType === TokenType.NUMBER) {
          // Get the number token
          const numberToken = tokens[index + 1];

          // Get the previous node
          const previousNode = ast.getRecentNode();

          // Add the token to the AST with parent as the last property node;
          ast.createArrayAccessNode(
            Number(numberToken.value),
            null,
            previousNode
          );
        }

        //------------------------------------WILDCARD---------------------------------------
        else if (nextTokenType === TokenType.WILDCARD) {
          // Get the previous node
          const previousNode = ast.getRecentNode();

          // Add the token to the AST with parent as the last property node;
          ast.createWildcardNode(null, previousNode);
        }

        //------------------------------------------------------------------------------------

        // Update the index
        index += incrementIndex(TokenType.LEFT_BRACKET);
      }

      //===================================NUMBER========================================
      else if (token.type === TokenType.NUMBER) {
        // Expect the previous token to be a left bracket
        expect(tokens, index - 1, TokenType.LEFT_BRACKET);

        // Expect the next token to be right bracket
        expect(tokens, index + 1, TokenType.RIGHT_BRACKET);

        // Get the previous node
        const previousNode = ast.getRecentNode();

        // Add the token to the AST with parent as the last property node;
        ast.createArrayAccessNode(Number(token.value), null, previousNode);

        // Update the index
        index += incrementIndex(TokenType.NUMBER);
      }

      //===================================RIGHT BRACKET==================================
      else if (token.type === TokenType.RIGHT_BRACKET) {
        // Expect the previous token to be a number or wildcard
        expectAny(tokens, index - 1, [TokenType.NUMBER, TokenType.WILDCARD]);

        // Expect the second previous token to be a left bracket
        expect(tokens, index - 2, TokenType.LEFT_BRACKET);

        // Get the previous node
        const previousNode = ast.getRecentNode();

        // Add the token to the AST with parent as the last property node;
        ast.createArrayAccessNode(Number(token.value), null, previousNode);
      }

      //===================================WILDCARD======================================
      else if (token.type === TokenType.WILDCARD) {
        // Expect the previous token to be a left bracket
        expect(tokens, index - 1, TokenType.LEFT_BRACKET);

        // Expect the next token to be right bracket
        expect(tokens, index + 1, TokenType.RIGHT_BRACKET);

        // Get the previous node
        const previousNode = ast.getRecentNode();

        // Add the token to the AST with parent as the last property node;
        ast.createWildcardNode(null, previousNode);

        // Update the index
        index += incrementIndex(TokenType.WILDCARD);
      }

      //===================================FALLBACK========================================
      else if (token.type === TokenType.FALL_MARK) {
        // Expect the second next token to be a fallback
        expect(tokens, index + 1, TokenType.FALLBACK);

        // Get the fallback token
        const fallbackToken = tokens[index + 1];

        // Update the context of query
        const fallback = fallbackToken.value;
        context.set("fallback", fallback);

        // Add the token to the AST with parent as the last property node;
        ast.createFallbackNode(fallbackToken.value);
      }

      //===================================================================================
    }
  }
}

export const parser = new Parser();
