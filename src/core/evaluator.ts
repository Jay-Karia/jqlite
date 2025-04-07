/**
 * @fileoverview Query evaluator
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS======================================

import type { ASTNode } from "src/ast/types";
import { EvaluatorError } from "src/errors/factory";
import { ERROR_MESSAGES } from "src/errors/messages";

//===================================================================================

/**
 * Evaluator class
 * @description This class is responsible for evaluating the query.
 */
export class Evaluator {
  //===================================PROPERTIES===================================

  private _current: Record<string, unknown> | null;
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
        // Evaluate the property node
        this.evaluateProperty(node);

        // Check if the node has children
        if (node.children && node.children.length > 0) {
          // Iterate over the children
          for (const child of node.children) {
            // Evaluate the child node
            this.evaluate(child);
          }
        }
        break;
      case "ArrayAccess":
        // Evaluate the array access node
        this.evaluateArrayAccess(node);
        break;
    }
  }

  /**
   * Get the result of the evaluation
   * @returns {unknown} The result of the evaluation
   */
  public getResult(): Record<string, unknown> | object | null {
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
    if (!this._data || !this._current) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_DATA, {
        memoryData: this._data,
      });
    }

    // Check if the property exists in the node
    const propertyName = node.propertyName;
    if (!propertyName) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.PROPERTY_NOT_FOUND, {
        propertyName,
        type: node.type,
      });
    }

    // Get the value
    const value = this._current[propertyName] as Record<string, unknown>;
    if (value === undefined) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.PROPERTY_NOT_FOUND, {
        propertyName,
        type: node.type,
      });
    }

    // Update the current value
    this._current = value;
  }

  /**
   * Evaluates the array access node
   * @param {ASTNode} node The AST node to evaluate
   */
  public evaluateArrayAccess(node: ASTNode): void {
    // Check if the data is not null
    if (!this._data || !this._current) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.EMPTY_DATA, {
        memoryData: this._data,
      });
    }

    // Check if the current value is an array
    const parentProperty = node.parent?.propertyName;
    if (!parentProperty) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.PROPERTY_NOT_FOUND, {
        propertyName: parentProperty,
        type: node.type,
      });
    }
    if (!Array.isArray(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NOT_AN_ARRAY, {
        propertyName: parentProperty,
        type: node.type,
      });
    }

    // Check if the index is valid
    const index = node.index;
    if (index === undefined) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ERR_ARRAY_INDEX_NOT_DEFINED, {
        propertyName: parentProperty,
        type: node.type,
      });
    }
    if (index < 0 || index >= this._current.length) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ARRAY_INDEX_OUT_OF_BOUNDS, {
        propertyName: parentProperty,
        index,
        type: node.type,
      });
    }

    // Get the value
    const value = this._current[index] as Record<string, unknown>;
    if (value === undefined) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.ARRAY_VALUE_NOT_FOUND, {
        propertyName: parentProperty,
        type: node.type,
        index,
      });
    }

    // Update the current value
    this._current = value;

  }
}

export const evaluator = new Evaluator();
