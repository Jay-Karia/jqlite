/**
 * @fileoverview Query evaluator
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS======================================

import type { ASTNode } from "src/ast/types";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";
import {
  checkArray,
  checkData,
  checkIndex,
  checkProperty,
  checkSliceRange,
  checkValue,
  containsObjects,
  evaluateChildren,
  extractUniqueKeys,
  fillArray,
  isRecord,
} from "./helpers";
import { context } from "./context";
import { ast } from "src/ast/ast";

//===================================================================================

/**
 * Evaluator class
 * @description This class is responsible for evaluating the query.
 */
export class Evaluator {
  //===================================PROPERTIES===================================

  public _current: Record<string, unknown> | unknown | null;
  private _data: Record<string, unknown> | null;

  //===================================CONSTRUCTOR==================================

  /**
   * Initializes the evaluator
   */
  constructor() {
    this._current = null;
    this._data = null;
  }

  //===================================METHODS=====================================

  /**
   * Evaluates the query
   */
  public evaluate(node: ASTNode): void {
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
    }
  }

  /**
   * Get the result of the evaluation
   * @returns {unknown} The result of the evaluation
   */
  public getResult(): Record<string, unknown> | unknown | null {
    return this._current;
  }

  /**
   * Set the JSON data in memory
   * @param {Record<string, unknown> | null} data The JSON data to be stored in memory
   */
  public setData(data: Record<string, unknown> | null): void {
    this._data = data;
    this._current = data;
  }

  //===================================INTERNALS===================================

  /**
   * Evaluates the property node
   * @param {ASTNode} node The AST node to evaluate
   */
  private evaluateProperty(node: ASTNode): void {
    // Check if the data is not null
    this._current = checkData(this._current);

    // Check if the property exists in the node
    const propertyName = checkProperty(node.propertyName, node.type);

    // Get the fallback value
    const fallback = context.get("fallback") as string;

    // Get the value
    let value;
    if (isRecord(this._current)) value = this._current[propertyName];

    value = checkValue(
      value as Record<string, unknown> | null,
      fallback,
      ERROR_MESSAGES.EVALUATOR.PROPERTY_NOT_FOUND,
      {
        propertyName,
      }
    );

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
    const propertyName = checkProperty(propertyNode?.propertyName, "Property");

    // Check if the current value is an array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property: propertyName,
      });
    }

    // Check if the index is valid
    const index = checkIndex(
      node.index,
      propertyName,
      node.type,
      this._current.length
    );

    // Get the fallback value
    const fallback = context.get("fallback") as string;

    // Get the value
    let value = this._current[index] as Record<string, unknown> | null;

    // Check if the value is not  undefined
    value = checkValue(
      value,
      fallback,
      ERROR_MESSAGES.EVALUATOR.ARRAY_VALUE_NOT_FOUND,
      {
        type: node.type,
        index,
        property: propertyName,
      }
    );

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
    const propertyName = checkProperty(propertyNode?.propertyName, "Property");

    // Get the parent property is array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property: propertyName,
      });
    }

    // Get the fallback value
    const fallback = context.get("fallback") as string;

    // Check if the property is an array of objects
    if (!containsObjects(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NO_OBJECTS, {
        type: node.type,
        property: propertyName,
      });
    }

    // Get all the unique keys and fill the values
    const keys: string[] = extractUniqueKeys(this._current);
    let value: Record<string, unknown> | null = fillArray(this._current, keys);

    // Check if the value is not undefined
    value = checkValue(value, fallback, ERROR_MESSAGES.EVALUATOR.ERR_WILDCARD, {
      type: node.type,
      property: propertyName,
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
    const propertyName = checkProperty(propertyNode?.propertyName, "Property");

    // Check if the current value is an array
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        type: node.type,
        property: propertyName,
        sliceRange: node.sliceRange,
      });
    }

    // Check for valid slice range
    node.sliceRange = checkSliceRange(node.sliceRange, this._current.length);

    // Get the fallback value
    const fallback = context.get("fallback") as string;

    // Get the sliced value
    let value = this._current.slice(
      node.sliceRange.start,
      node.sliceRange.end
    ) as unknown;
    value = checkArray(value, fallback, {
      sliceRange: node.sliceRange,
      property: propertyName,
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

    // Get the fallback value
    const fallback = context.get("fallback") as string;

    // Remove the key from the current data
    delete this._current[propertyName];

    // Check if the value is not undefined
    const result = checkValue(
      this._current,
      fallback,
      ERROR_MESSAGES.EVALUATOR.ERR_NOT,
      {
        type: node.type,
        property: propertyName,
      }
    );

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
    let value: unknown[] = [];
    for (const key of keys) {
      const propertyName = checkProperty(key, node.type);
      if (propertyName in this._current) {
        value.push(this._current[propertyName]);
      }
    }

    // Get the fallback value
    const fallback = context.get("fallback") as string;

    // Check if the value is not undefined
    value = checkArray(value, fallback, {
      type: node.type,
      keys,
    }) as unknown[];

    // Update the current value
    this._current = value;

    // Evaluate children if any
    evaluateChildren(node);
  }
}

export const evaluator = new Evaluator();
