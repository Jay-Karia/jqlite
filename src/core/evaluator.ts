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
  checkData,
  checkIndex,
  checkProperty,
  checkValue,
  containsObjects,
  extractUniqueKeys,
  fillArray,
} from "./helpers";
import { context } from "./context";
import {ast} from "src/ast/ast";

//===================================================================================

/**
 * Evaluator class
 * @description This class is responsible for evaluating the query.
 */
export class Evaluator {
  //===================================PROPERTIES===================================

  public _current: Record<string, unknown> | null;
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

        // Check if the node has children
        if (node.children && node.children.length > 0) {
          // Iterate over the children
          for (const child of node.children) this.evaluate(child);
        }
        break;
      case "ArrayAccess":
        this.evaluateArrayAccess(node);
        // Check if the node has children
        if (node.children && node.children.length > 0) {
          // Iterate over the children
          for (const child of node.children) this.evaluate(child);
        }
        break;
      case "Wildcard":
        this.evaluateWildCard(node);
        // Check if the node has children
        if (node.children && node.children.length > 0) {
          // Iterate over the children
          for (const child of node.children) this.evaluate(child);
        }
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
    this._current = checkData(this._current);

    // Check if the property exists in the node
    const propertyName = checkProperty(node.propertyName, node.type);

    // Get the fallback value
    const fallback = context.get("fallback") as string;

    // Get the value
    let value = this._current[propertyName] as Record<string, unknown> | null;

    // Check if the value is not undefined
    value = checkValue(
      value,
      fallback,
      ERROR_MESSAGES.EVALUATOR.PROPERTY_NOT_FOUND,
      {
        propertyName,
      }
    );

    // Update the current value
    this._current = value;
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
        property: propertyName
      });
    }

    // Check if the index is valid
    const index = checkIndex(node.index, propertyName, node.type, this._current.length);

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
  }

  /**
   * Evaluates the wildcard node
   * @param node The AST Node to evaluate
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
        property: propertyName
      });
    }

    // Get the fallback value
    const fallback = context.get("fallback") as string;

    // Check if the property is an array of objects
    if (!containsObjects(this._current)) {
      throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.NO_OBJECTS, {
        type: node.type,
        property: propertyName
      });
    }

    // Get all the unique keys and fill the values
    const keys: string[] = extractUniqueKeys(this._current);
    let value: Record<string, unknown> | null = fillArray(this._current, keys);

    // Check if the value is not undefined
    value = checkValue(value, fallback, ERROR_MESSAGES.EVALUATOR.ERR_WILDCARD, {
      type: node.type,
      property: propertyName
    });

    // Update the current value
    this._current = value;
  }
}

export const evaluator = new Evaluator();
