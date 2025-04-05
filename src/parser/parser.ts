/**
 * @fileoverview The parser for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType, type Token } from "src/lexer/tokens";
import { ast } from "src/ast/ast";
import { expect, incrementIndex } from "./helpers";
import {ParserError} from "src/errors/factory";
import {ERROR_MESSAGES} from "src/errors/messages";

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
      }


      else if (token.type === TokenType.PROPERTY) {
        // Expect the previous token to be a dot
        expect(tokens, index - 1, TokenType.DOT);

        // Check if the previous node is property node
        const previousNode = ast.getRecentNode();

        // Add the token to the AST with parent as the last property node;
        ast.createPropertyNode(token.value, null, previousNode);
      }

      //===================================ARRAY ACCESS===================================

      else if (token.type === TokenType.LEFT_BRACKET) {
        // Expect the next token to be a number
        expect(tokens, index + 1, TokenType.NUMBER);

        // Expect the second next token to be a right bracket
        expect(tokens, index + 2, TokenType.RIGHT_BRACKET);

        // Expect the previous token to be a property
        expect(tokens, index - 1, TokenType.PROPERTY);

        // Get the number token
        const numberToken = tokens[index + 1];

        // Check if the previous node is property node
        const previousNode = ast.getRecentNode();
        if (!previousNode || previousNode.type !== "Property") {
          throw new ParserError(ERROR_MESSAGES.PARSER.PROPERTY_NODE_REQUIRED, {
            previousNode,
            currentNode: numberToken,
            expectedNode: "Property",
            index: index + 1,
          });
        }

        // Add the token to the AST with parent as the last property node;
        ast.createArrayAccessNode(Number(numberToken.value), null, previousNode);

        // Update the index
        index += incrementIndex(TokenType.LEFT_BRACKET);
      }

      else if (token.type === TokenType.NUMBER) {
        // Expect the previous token to be a left bracket
        expect(tokens, index - 1, TokenType.LEFT_BRACKET);

        // Expect the next token to be right bracket
        expect(tokens, index + 1, TokenType.RIGHT_BRACKET);

        // Check if the previous node is property node
        const previousNode = ast.getRecentNode();
        if (!previousNode || previousNode.type !== "Property") {
          throw new ParserError(ERROR_MESSAGES.PARSER.PROPERTY_NODE_REQUIRED, {
            previousNode,
            currentNode: token,
            expectedNode: "Property",
            index: index + 1,
          });
        }

        // Add the token to the AST with parent as the last property node;
        ast.createArrayAccessNode(Number(token.value), null, previousNode);

        // Update the index
        index += incrementIndex(TokenType.NUMBER);
      }

      else if (token.type === TokenType.RIGHT_BRACKET) {
        // Expect the previous token to be a number
        expect(tokens, index - 1, TokenType.NUMBER);

        // Expect the second previous token to be a left bracket
        expect(tokens, index - 2, TokenType.LEFT_BRACKET);

        // Check if the previous node is property node
        const previousNode = ast.getRecentNode();
        if (!previousNode || previousNode.type !== "Property") {
          throw new ParserError(ERROR_MESSAGES.PARSER.PROPERTY_NODE_REQUIRED, {
            previousNode,
            currentNode: token,
            expectedNode: "Property",
            index: index + 1,
          });
        }

        // Add the token to the AST with parent as the last property node;
        ast.createArrayAccessNode(Number(token.value), null, previousNode);

        // Update the index
        index += incrementIndex(TokenType.RIGHT_BRACKET);
      }

      //===================================================================================

    };
  }
}

export const parser = new Parser();
