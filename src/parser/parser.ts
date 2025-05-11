/**
 * @fileoverview The parser for jqlite.
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import { TokenType, type Token } from "src/lexer/tokens";
import type { functionNames } from "../functions/types";
import { ast } from "src/ast/ast";
import { checkFunctionName, checkMultipleSelectAndOmit, checkNodeParent, getFunctionCategory, getSliceType, handleBracketMismatch, handleFunctionArgs, handleFunctionCreation, handleMultipleOmit, handleMultipleSelect, handleParenthesisMismatch, incrementIndex } from "./helpers";
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

        // Check for condition
        const isCondition = context.get("isCondition") ?? false;

        // Check for multiple select/omit
        const isMultipleSelect = context.get("multipleSelect") ?? false;
        const isMultipleOmit = context.get("multipleOmit") ?? false;

        // Add the selected keys to context
        if (isMultipleSelect) handleMultipleSelect(token);
        // Add the omitted keys to context
        else if (isMultipleOmit) handleMultipleOmit(token);
        // Add the token to the AST
        else {
          // Add the children to previous node
          if (isCondition) {
            const previousNode = ast.getRecentNode();
            ast.createPropertyNode(token.value, null, previousNode);
          } else {
            // Add the token to the AST with parent as the last property node;
            ast.createPropertyNode(token.value);
          }
        }
      }

      //=========================================NOT============================================
      else if (token.type === TokenType.NOT) {
        // Expectations for the token
        expectations.not(index);

        // Check for multiple omit
        const isMultipleOmit = tokens[index + 1].type === TokenType.LEFT_PARENTHESIS;

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
        // Check for condition
        const isCondition = tokens[index + 1].type === TokenType.CONDITION_MARK;

        // Check for condition start
        const isConditionStart = tokens[index - 1].type === TokenType.CONDITION_MARK && tokens[index - 2].type !== TokenType.LEFT_BRACKET;

        // Check for nested condition
        const isContextCondition = context.get("isCondition") ?? false;
        if (isContextCondition && isConditionStart) {
          throw new ParserError(ERROR_MESSAGES.PARSER.ERR_NESTED_CONDITIONS, {
            token: token.value,
            index: index,
          });
        }

        // Update the context
        if (isCondition) context.set("isCondition", true);

        // Expectations for the token
        expectations.leftBracket(index);

        // Get the number of opened brackets
        const openBracket = context.get("openBracket") ?? 0;

        // Create the condition node
        if (isCondition) {
          ast.createConditionNode();
          context.set("conditionBracketPosition", openBracket + 1);
        };

        // Update the context
        context.set("openBracket", openBracket + 1);
      }

      //================================RIGHT BRACKET==========================================
      else if (token.type === TokenType.RIGHT_BRACKET) {
        // Expectations for the token
        expectations.rightBracket(index);

        // Check for condition
        const isCondition = context.get("isCondition") ?? false;

        // Get the number of opened brackets
        const openBracket = context.get("openBracket") ?? 0;

        // Get the position of condition bracket
        const conditionBracketPosition = context.get("conditionBracketPosition");

        // Reset the condition context when required
        if (isCondition && (openBracket === conditionBracketPosition)) context.set("isCondition", false);

        // Update the context
        context.set("openBracket", openBracket - 1);
      }

      //====================================NUMBER=============================================
      else if (token.type === TokenType.NUMBER) {
        // Expectations for the token
        expectations.number(index);

        // Check for comparison
        const isComparison = context.get("isComparison") ?? false;
        if (isComparison) {
          this.parseComparison(tokens, index);
          continue;
        }

        // Check for array slice
        const isArraySlice = tokens[index + 1].type === TokenType.SLICE || tokens[index - 1].type ===TokenType.SLICE;
        if (isArraySlice) continue;

        // Get the previous node if condition
        const previousNode = ast.getRecentNode();

        // Add the token to AST
        ast.createArrayAccessNode(Number(token.value), checkNodeParent(previousNode));

        // Update the context
        context.set("isArrayAccess", true);
      }

      //================================LEFT PARENTHESIS=======================================
      else if (token.type === TokenType.LEFT_PARENTHESIS) {
        // Expectations for the token
        expectations.leftParenthesis(index);

        // Update the context
        const openParen = context.get("openParen") ?? 0;
        context.set("openParen", openParen + 1);

        // Check for function declaration
        const isFunction = context.get("isFunction") ?? false;
        if (isFunction) continue;

        // Check for condition start
        const isConditionStart = tokens[index - 1].type === TokenType.CONDITION_MARK || tokens[index + 1].type !== TokenType.PROPERTY;

        // Update the context for multiple select/omit
        const isMultipleOmit = context.get("multipleOmit") ?? false;
        if (!isMultipleOmit && !isConditionStart) context.set("multipleSelect", true);
      }

      //===============================RIGHT PARENTHESIS=======================================
      else if (token.type === TokenType.RIGHT_PARENTHESIS) {
        // Expectations for the token
        expectations.rightParenthesis(index);

        // Check for function call
        const isFunction = context.get("isFunction") ?? false;

        // Check for condition
        const isCondition = context.get("isCondition") ?? false;

        // Get previous node if condition is on
        const previousNode = isCondition ? ast.getRecentNode() : null;

        // Throw an error if multiple select/omit is off and not function
        if (!isFunction && !isCondition) checkMultipleSelectAndOmit(token, index);

        // Check for selected keys and add it to AST
        const selectedKeys = context.get("selectedKeys");
        if (selectedKeys.length > 0) ast.createMultipleSelectNode(selectedKeys, previousNode);

        // Check for omitted keys and add it to AST
        const omittedKeys = context.get("omittedKeys");
        if (omittedKeys.length > 0) ast.createMultipleOmitNode(omittedKeys, previousNode);

        // Update the function context and create the node
        if (isFunction) handleFunctionCreation();
        // Update the context if not function
        else {
          context.set("multipleSelect", false);
          context.set("selectedKeys", []);
          context.set("multipleOmit", false);
          context.set("omittedKeys", []);
        }

        // Update the context
        const openParen = context.get("openParen") ?? 0;
        context.set("openParen", openParen - 1);
      }

      //======================================COMMA============================================
      else if (token.type === TokenType.COMMA) {
        // Expectations for the token
        expectations.comma(index);

        // Check for function and condition
        const ifFunction = context.get("isFunction") ?? false;
        if (ifFunction) continue;

        // Throw an error if multiple select/omit is off
        checkMultipleSelectAndOmit(token, index, ERROR_MESSAGES.PARSER.MULTIPLE_SELECT_COMMA);
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

      //=====================================DECLARATION========================================
      else if (token.type === TokenType.DECLARATION) {
        // Expectations for the token
        expectations.declaration(index);

        // Update the context of query
        context.set("isFunction", true);
      }

      //======================================ARGUMENT==========================================
      else if (token.type === TokenType.ARGUMENT) {
        // Expectations for the token
        expectations.argument(index);

        // Check for function
        const isFunction = context.get("isFunction") ?? false;

        // Handle function arguments
        if (isFunction) handleFunctionArgs(token);
      }

      //======================================FUNCTION==========================================
      else if (token.type === TokenType.FUNCTION) {
        // Expectations for the token
        expectations.function(index);

        // Reset the previous function args in context
        context.set("functionArgs", []);

        // Get the function name token
        const functionName = token.value;

        // Check the function name
        const validFunctionName: functionNames = checkFunctionName(functionName);

        // Get function category
        const functionCategory = getFunctionCategory(validFunctionName);
        context.set("functionCategory", functionCategory);

        // Set the function name in context
        context.set("functionName", validFunctionName);
      }

      //======================================COMPARISON========================================
      else if (token.type === TokenType.LESS_THAN || token.type === TokenType.GREATER_THAN || token.type === TokenType.EQUALS || token.type === TokenType.NOT_EQUALS || token.type === TokenType.GREATER_THAN_EQUAL || token.type === TokenType.LESS_THAN_EQUAL) {
        // Expectations for the token
        expectations.comparison(index);

        // Set the context
        context.set("isComparison", true);

        // Get the comparison operator
        const comparisonOperator = token.type === TokenType.LESS_THAN ? "<" : token.type === TokenType.GREATER_THAN ? ">" : token.type === TokenType.EQUALS ? "==" : token.type === TokenType.NOT_EQUALS ? "!=" : token.type === TokenType.GREATER_THAN_EQUAL ? ">=" : token.type === TokenType.LESS_THAN_EQUAL ? "<=" : null;

        // Set the comparison operator in context
        context.set("comparisonOperator", comparisonOperator);
      }

      //===================================CONDITION MARK=======================================
      else if (token.type === TokenType.CONDITION_MARK) {
        // Expectations for the token
        expectations.conditionMark(index);
      }

      //======================================CONTEXT===========================================
      else if (token.type === TokenType.CONTEXT) {
        // Expectations for the token
        expectations.context(index);

        // Get the previous node
        const previousNode = ast.getRecentNode();

        // Create the AST node
        ast.createContextNode(previousNode);
      }

      //========================================AND=============================================
      else if (token.type === TokenType.AND) {
        // Expectations for the token
        expectations.logicGate(index);

        // Get the condition node
        const conditionNode = ast.getConditionNode();

        // Create the AST node
        ast.createLogicalNode("AND", conditionNode);
      }

      //=========================================OR=============================================
      else if (token.type === TokenType.OR) {
        // Expectations for the token
        expectations.logicGate(index);

        // Get the condition node
        const conditionNode = ast.getConditionNode();

        // Create the AST node
        ast.createLogicalNode("OR", conditionNode);
      }

      //======================================UNKNOWN===========================================
      else if (token.type === TokenType.UNKNOWN) {
        throw new ParserError(ERROR_MESSAGES.PARSER.UNKNOWN_TOKEN, {
          token: token.value
        });
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
            multipleOmit: isMultipleOmit,
            expected: ")",
          });
        }

        // Check for number of open brackets and parentheses
        const openBracket = context.get("openBracket") ?? 0;
        const openParen = context.get("openParen") ?? 0;

        // Handle the mismatch
        handleBracketMismatch(token, index, openBracket);
        handleParenthesisMismatch(token, index, openParen);
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
  private parseArraySlice(tokens: Token[], index: number, expectations: Expectations): number {
    // Set the slice type in context
    context.set("sliceType", getSliceType(tokens, index));

    // Expectations for the token
    expectations.arraySlice(index);

    // Get the slice token
    const startRange = tokens[index - 1].value;
    const endRange = tokens[index + 1].value;

    // Get the previous node
    const previousNode = ast.getRecentNode();

    // Add the token to the AST
    ast.createArraySliceNode(Number(startRange), Number(endRange), checkNodeParent(previousNode));

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

    // Add the token to the AST
    ast.createWildcardNode(checkNodeParent(previousNode));
  }

  /**
   * Parse the comparison token
   * @param {Token[]} tokens The tokens of the query
   * @param {number} index The index of the token
   * @returns {number} The new index
   */
  private parseComparison(tokens: Token[], index: number): void {
    // Get the comparison operator
    const comparisonOperator = context.get("comparisonOperator") as string;
    
    // Get the number
    const number = tokens[index].value;

    // Check for condition
    const isCondition = context.get("isCondition") ?? false;

    // Get the recent node
    const recentNode = ast.getRecentNode();

    // Create the AST node with parent
    if (isCondition) ast.createComparisonNode(comparisonOperator, Number(number), recentNode);

    // Create the AST node without parent
    else ast.createComparisonNode(comparisonOperator, Number(number));

    // Reset the context
    context.set("isComparison", false);
    context.set("comparisonOperator", null);
  }

  //==================================================================================================
}

export const parser = new Parser();
