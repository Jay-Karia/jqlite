/**
 * @fileoverview Query evaluator
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS======================================

import type { ASTNode } from "src/ast/types";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";
import { checkArray, checkData, checkFunction, checkIndex, checkNumericArray, checkProperty, checkSliceRange, checkValue, containsObjects, evaluateChildren, extractUniqueKeys, fillArray, getPropertyName, isRecord } from "./helpers";
import { context } from "./context";
import { ast } from "src/ast/ast";
import { applyArrayFunction, applyNumericArrayFunction, applyStringFunction } from "src/functions/apply";
import { checkNumberOfArgs } from "src/functions/arguments";
import { configStore } from "src/config/store";

//===================================================================================

/**
 * Evaluator class
 * @description This class is responsible for evaluating the query.
 */
export class Evaluator {
  //===================================PROPERTIES===================================

  public _current: unknown;
  public _fallback: string | null;

  //===================================CONSTRUCTOR==================================

  /**
   * Initializes the evaluator
   */
  constructor() {
    this._current = null;
    this._fallback = null;
  }

  //===================================METHODS=====================================

  /**
   * Evaluates the query
   */
  public evaluate(node: ASTNode): void {
    // Update the fallback property
    this._fallback = context.get("fallback");

    // Check the node type
    switch (node.type) {
      case "Root":
        // Check if the node has children
        if (node.children && node.children.length > 0) {
          // Iterate over the children
          for (const child of node.children) {
            // Evaluate the child node
            this.evaluate(child);
          }
        }
        break;
      case "Property":
        this.evaluateProperty(node);
        break;
      case "ArrayAccess":
        this.evaluateArrayAccess(node);
        break;
      case "Wildcard":
        this.evaluateWildCard(node);
        break;
      case "ArraySlice":
        this.evaluateArraySlice(node);
        break;
      case "Omit":
        this.evaluateOmit(node);
        break;
      case "MultipleSelect":
        this.evaluateMultipleSelect(node);
        break;
      case "MultipleOmit":
        this.evaluateMultipleOmit(node);
        break;
      case "Comparison":
        this.evaluateComparison(node);
        break;
      case "Condition":
        this.evaluateCondition(node);
        break;
      case "Context":
        this.evaluateContext(node);
        break;
      case "Function": {
        // Get function category
        const category = checkFunction(node.functionName, node.functionCategory);

        // Check function arguments
        checkNumberOfArgs(node);

        // Evaluate the functions based on the category
        switch (category) {
          case "numericArray":
            this.numericArrayFunction(node);
            break;
          case "array":
            this.arrayFunction(node);
            break;
          case "string":
            this.stringFunction(node);
            break;
        }
        break;
      }
    }
  }

  /**
   * Get the result of the evaluation
   * @returns {unknown} The result of the evaluation
   */
  public getResult(): unknown | null {
    return this._current;
  }

  /**
   * Set the JSON data in memory
   * @param {unknown | null} data The JSON data to be stored in memory
   */
  public setData(data: unknown | null): void {
    this._current = data;
  }

  //===================================EVALUATIONS===================================

  /**
   * Evaluates the property node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateProperty(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Check if the property exists in the node
    const propertyName = checkProperty(node.propertyName, node.type);

    // Get the value
    let value;
    if (isRecord(this._current)) value = this._current[propertyName];

    value = checkValue(value as Record<string, unknown> | null, this._fallback, ERROR_MESSAGES.EVALUATOR.PROPERTY_NOT_FOUND, {
      propertyName,
    });

    // Update the current value
    this._current = value;

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the array access node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateArrayAccess(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property node
    const propertyNode = ast.getHighestParent(node);
    const property: string | string[] | undefined = getPropertyName(propertyNode);

    // Check if the current value is an array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property,
      });
    }

    // Check if the index is valid
    const index = checkIndex(node.index, property, node.type, this._current.length);

    // Get the value
    let value = this._current[index] as Record<string, unknown> | null;

    // Check if the value is not  undefined
    value = checkValue(value, this._fallback, ERROR_MESSAGES.EVALUATOR.ARRAY_VALUE_NOT_FOUND, {
      type: node.type,
      index,
      property,
    });

    // Update the current value
    this._current = value;

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the wildcard node
   * @param {ASTNode} node The AST Node to evaluate
   */
  private evaluateWildCard(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property node
    const propertyNode = ast.getHighestParent(node);
    const property: string | string[] | undefined = getPropertyName(propertyNode);

    // Check the current data is an array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property,
      });
    }

    // Check if the property is an array of objects
    if (!containsObjects(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NO_OBJECTS, {
        type: node.type,
        property,
      });
    }

    // Get all the unique keys and fill the values
    const keys: string[] = extractUniqueKeys(this._current);
    let value: Record<string, unknown> | null = fillArray(this._current, keys);

    // Check if the value is not undefined
    value = checkValue(value, this._fallback, ERROR_MESSAGES.EVALUATOR.ERR_WILDCARD, {
      type: node.type,
      property,
    });

    // Update the current value
    this._current = value;

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the array slice node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateArraySlice(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property node
    const propertyNode = ast.getHighestParent(node);
    const property: string | string[] | undefined = getPropertyName(propertyNode);

    // Check if the current value is an array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property,
        sliceRange: node.sliceRange,
      });
    }

    // Check for valid slice range
    node.sliceRange = checkSliceRange(node.sliceRange, this._current.length);

    // Get the sliced value
    let value = this._current.slice(node.sliceRange.start, node.sliceRange.end) as unknown;
    value = checkArray(value, this._fallback, {
      sliceRange: node.sliceRange,
      property,
    });

    // Update the current value
    this._current = value;

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the not node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateOmit(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Check the children of the node
    if (!node.children || node.children.length === 0 || node.children[0].type !== "Property") {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_EMIT_PROPERTY, {
        type: node.type,
      });
    }

    // Get the property name
    const propertyName = checkProperty(node.children[0].propertyName, node.type);

    // Check if the current value is an object
    if (!isRecord(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NO_OBJECTS, {
        type: node.type,
        property: propertyName,
      });
    }

    // Remove the key from the current data
    delete this._current[propertyName];

    // Check if the value is not undefined
    const result = checkValue(this._current, this._fallback, ERROR_MESSAGES.EVALUATOR.ERR_NOT, {
      type: node.type,
      property: propertyName,
    });

    // Update the current value
    this._current = result;
  }

  /**
   * Evaluates the multiple select node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateMultipleSelect(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Check if the current value is an object
    if (!isRecord(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NO_OBJECTS, {
        type: node.type,
      });
    }

    // Get the keys
    const keys = node.selectedKeys;
    if (!keys || keys.length === 0) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_NO_KEYS, {
        type: node.type,
      });
    }

    // Get the value
    let value: Record<string, unknown> = {};
    for (const key of keys) {
      value[key] = this._current[key];

      // Check if the key is not found
      if (value[key] === undefined) {
        throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.PROPERTY_NOT_FOUND, {
          type: node.type,
          key,
        });
      }
    }

    // Check if the value is not undefined
    value = checkValue(value, this._fallback, ERROR_MESSAGES.EVALUATOR.ERR_MULTIPLE_SELECT, {
      type: node.type,
      keys,
    }) as Record<string, unknown>;

    // Update the current value
    this._current = value;

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the multiple omit node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateMultipleOmit(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Check if the current value is an object
    if (!isRecord(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NO_OBJECTS, {
        type: node.type,
      });
    }

    // Get the keys
    const keys = node.omittedKeys;
    if (!keys || keys.length === 0) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_NO_KEYS, {
        type: node.type,
      });
    }

    let result: Record<string, unknown> | null = { ...this._current };
    for (const key of keys) {
      delete result[key];
    }

    // Check if the value is not undefined
    result = checkValue(result, this._fallback, ERROR_MESSAGES.EVALUATOR.ERR_NOT, {
      type: node.type,
      keys,
    });

    // Update the current value
    this._current = result;

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the comparison node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateComparison(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Check if the current value is a number
    if (typeof this._current !== "number") {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_A_NUMBER, {
        type: node.type,
      });
    }

    // Get the operator
    const operator = node.comparisonOperator;
    if (!operator) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_COMPARISON_OPERATOR, {
        type: node.type,
      });
    }

    // Get the value
    const value = node.comparisonValue;
    if (value === undefined) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_COMPARISON_VALUE, {
        type: node.type,
      });
    }

    // Compare the values
    let result: boolean;
    switch (operator) {
      case "==":
        result = this._current == value;
        break;
      case "===":
        result = this._current === value;
        break;
      case "!=":
        result = this._current != value;
        break;
      case "!==":
        result = this._current !== value;
        break;
      case "<":
        result = this._current < value;
        break;
      case "<=":
        result = this._current <= value;
        break;
      case ">":
        result = this._current > value;
        break;
      case ">=":
        result = this._current >= value;
        break;
      default:
        throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_COMPARISON_OPERATOR, {
          type: node.type,
          operator,
        });
    }

    // Update the current value
    this._current = result;
  }

  /**
   * Evaluates the condition node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateCondition(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property name
    const propertyNode = ast.getHighestParent(node);
    const property: string | string[] | undefined = getPropertyName(propertyNode);

    // Check if the current value is an array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property,
      });
    }

    // Check the children
    const children = node.children;
    if (!children || children.length === 0) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_CONDITION, {
        type: node.type,
      });
    }

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the context node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateContext(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property name
    const propertyNode = ast.getHighestParent(node);
    const property: string | string[] | undefined = getPropertyName(propertyNode);

    // Check if the current value is an array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property,
      });
    }

    // Get the children
    const children = node.children;
    if (!children || children.length === 0) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_CONDITION, {
        type: node.type,
      });
    }

    // Result for array format
    const result: unknown[] = [];

    // Result for object format
    const keys: string[] = extractUniqueKeys(this._current);
    let objResult: Record<string, unknown> = {};

    // Get the data format from config
    const format = configStore.get().arrayConditionFormat;

    // Iterate over all the values in array
    this._current.forEach(elem => {
      // Evaluate the children for every element
      this.setData(elem);
      this.evaluate(children[0]);

      if (this._current === true) {
        result.push(elem);
        // Filter for object format
        if (format === "object") {
          objResult = fillArray(result, keys);
        }
      }
    });

    this._current = format === "array" ? result : objResult;
  }

  //==================================FUNCTIONS=====================================

  /**
   * Evaluates the numeric array function
   * @param {ASTNode} node The AST node to evaluate
   */
  private numericArrayFunction(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property name
    const propertyName = getPropertyName(ast.getHighestParent(node));

    // Check if the data is a numeric array
    const result: number[] = checkNumericArray(this._current, propertyName);

    // Apply the function
    this._current = applyNumericArrayFunction(node, result);

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the array function
   * @param {ASTNode} node The AST node to evaluate
   */
  private arrayFunction(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property name
    const propertyName = getPropertyName(ast.getHighestParent(node));

    // Check if the data is an array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property: propertyName,
      });
    }

    // Check if the data is an array of non primitives
    if (containsObjects(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_ARRAY_OF_NON_PRIMITIVES, {
        type: node.type,
        property: propertyName,
      });
    }

    // Apply the function
    this._current = applyArrayFunction(node, this._current);

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the string function
   * @param {ASTNode} node The AST node to evaluate
   */
  private stringFunction(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property name
    const propertyName = getPropertyName(ast.getHighestParent(node));

    // Check if the data is a string
    if (typeof this._current !== "string") {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_A_STRING, {
        type: node.type,
        property: propertyName,
      });
    }

    // Apply the function
    this._current = applyStringFunction(node, this._current);

    // Evaluate children if any
    evaluateChildren(node);
  }

  //================================================================================
}

export const evaluator = new Evaluator();
