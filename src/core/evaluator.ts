/**
 * @fileoverview Query evaluator
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS======================================

import type { ASTNode } from "src/ast/types";
import type { ArrayAccessNode, ArraySliceNode, ComparisonNode, ConditionNode, ContextNode, FunctionNode, LogicalNode, MultipleOmitNode, MultipleSelectNode, OmitNode, PropertyNode, WildcardNode } from "src/ast/nodes";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";
import { checkArray, checkData, checkFunction, checkIndex, checkNumericArray, checkProperty, checkSliceRange, checkValue, containsObjects, evaluateChildren, extractUniqueKeys, fillArray, getPropertyName, isRecord } from "./helpers";
import { context } from "./context";
import { ast } from "src/ast/ast";
import { applyArrayFunction, applyBooleanFunction, applyNumericArrayFunction, applyStringFunction } from "src/functions/apply";
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
  private _saveContextData: boolean;
  private _savedContextData: unknown | null;

  //===================================CONSTRUCTOR==================================

  /**
   * Initializes the evaluator
   */
  constructor() {
    this._current = null;
    this._fallback = null;
    this._saveContextData = false;
    this._savedContextData = null;
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
        this.evaluateProperty(node as PropertyNode);
        break;
      case "ArrayAccess":
        this.evaluateArrayAccess(node as ArrayAccessNode);
        break;
      case "Wildcard":
        this.evaluateWildCard(node as WildcardNode);
        break;
      case "ArraySlice":
        this.evaluateArraySlice(node as ArraySliceNode);
        break;
      case "Omit":
        this.evaluateOmit(node as OmitNode);
        break;
      case "MultipleSelect":
        this.evaluateMultipleSelect(node as MultipleSelectNode);
        break;
      case "MultipleOmit":
        this.evaluateMultipleOmit(node as MultipleOmitNode);
        break;
      case "Comparison":
        this.evaluateComparison(node as ComparisonNode);
        break;
      case "Condition":
        this.evaluateCondition(node as ConditionNode);
        break;
      case "Context":
        this.evaluateContext(node as ContextNode);
        break;
      case "Logical":
        this.evaluateLogicGate(node as LogicalNode);
        break;
      case "Function": {
        // Get function category
        const category = checkFunction(node.functionName, node.functionCategory);

        // Check function arguments
        checkNumberOfArgs(node as FunctionNode);

        // Evaluate the functions based on the category
        switch (category) {
          case "numericArray":
            this.numericArrayFunction(node as FunctionNode);
            break;
          case "array":
            this.arrayFunction(node as FunctionNode);
            break;
          case "string":
            this.stringFunction(node as FunctionNode);
            break;
          case "boolean":
            this.booleanFunction(node as FunctionNode);
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
  private evaluateProperty(node: PropertyNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Check if the property exists
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
  private evaluateArrayAccess(node: ArrayAccessNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property node
    const propertyNode = node.parent;
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
    let value = this._current[index] as Record<string, unknown> | string | null;

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
  private evaluateWildCard(node: WildcardNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property node
    const propertyNode = node.parent;
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
    let value: Record<string, unknown> | string | null = fillArray(this._current, keys);

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
  private evaluateArraySlice(node: ArraySliceNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property node
    const propertyNode = node.parent;
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
  private evaluateOmit(node: OmitNode): void {
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
    let result: Record<string, unknown> | string | null = { ...this._current };
    delete result[propertyName];

    // Check if the value is not undefined
    result = checkValue(result, this._fallback, ERROR_MESSAGES.EVALUATOR.ERR_NOT, {
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
  private evaluateMultipleSelect(node: MultipleSelectNode): void {
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
  private evaluateMultipleOmit(node: MultipleOmitNode): void {
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

    // Delete the key
    let result: Record<string, unknown> | string | null = { ...this._current };
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
  private evaluateComparison(node: ComparisonNode): void {
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

    // Get the value
    const value = node.comparisonValue;

    // Compare the values
    let result: boolean | null = null;
    switch (operator) {
      case "==":
        result = this._current === value;
        break;
      case "!=":
        result = this._current != value;
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
    }

    // Update the current value
    this._current = result;
  }

  /**
   * Evaluates the condition node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateCondition(node: ConditionNode): void {
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

    // Check for OR node in children
    const orNode = children.find(child => child.type === "Logical" && child.logicalOperator === "OR");
    if (orNode) this._saveContextData = true;

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the context node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateContext(node: ContextNode): void {
    // Check for saved context data
    if (this._saveContextData && this._savedContextData) this._current = this._savedContextData;

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

    // Backup the current value
    const current = this._current;

    // Result for array format
    const result: unknown[] = [];

    // Result for object format
    const keys: string[] = extractUniqueKeys(this._current);
    let objResult: Record<string, unknown> = {};

    // Get the data format from config
    const format = configStore.get().conditionFormat;

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

    // Save the data is required
    if (this._saveContextData) this._savedContextData = current;
    this._current = format === "array" ? result : objResult;
  }

  /**
   * Evaluates the logic gate node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateLogicGate(node: LogicalNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the logical operator
    const operator = node.logicalOperator;
    if (!operator) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_LOGICAL_OPERATOR, {
        type: node.type,
      });
    }

    switch (operator) {
      case "AND": {
        // Check for children
        const children = node.children;
        if (!children || children.length === 0) {
          throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_CONDITION, {
            type: node.type,
          });
        }

        // Update the current value
        this.evaluateContext(children[0] as ContextNode);
        break;
      }
      case "OR": {
        // Check for children
        const children = node.children;
        if (!children || children.length === 0) {
          throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_CONDITION, {
            type: node.type,
          });
        }

        // Check for array
        if (!Array.isArray(this._current)) {
          throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
            type: node.type,
          });
        }

        // Backup the current value
        const current = this._current;

        // Concat the two arrays
        this.evaluateContext(children[0] as ContextNode);
        this._current = this._current.concat(current);
        break;
      }
      default:
        throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_LOGICAL_OPERATOR, {
          type: node.type,
          operator,
        });
    }
  }

  //==================================FUNCTIONS=====================================

  /**
   * Evaluates the numeric array function
   * @param {ASTNode} node The AST node to evaluate
   */
  private numericArrayFunction(node: FunctionNode): void {
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
  private arrayFunction(node: FunctionNode): void {
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

    // Apply the function
    this._current = applyArrayFunction(node, this._current);

    // Evaluate children if any
    evaluateChildren(node);
  }

  /**
   * Evaluates the string function
   * @param {ASTNode} node The AST node to evaluate
   */
  private stringFunction(node: FunctionNode): void {
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

  /**
   * Evaluates the boolean function
   * @param {ASTNode} node The AST node to evaluate
   */
  private booleanFunction(node: FunctionNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Get the property name
    const propertyName = getPropertyName(ast.getHighestParent(node));

    // Check if the data is a boolean
    if (typeof this._current !== "boolean") {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_A_BOOLEAN, {
        type: node.type,
        property: propertyName,
      });
    }

    // Apply the function
    this._current = applyBooleanFunction(node, this._current);

    // Evaluate children if any
    evaluateChildren(node);
  }

  //================================================================================
}

export const evaluator = new Evaluator();
