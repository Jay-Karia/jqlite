/**
 * @fileoverview Function definitions for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS===================================

import type { SortArgs, SubstringArgs } from "./types";
import { ERROR_MESSAGES } from "src/errors/messages";
import { EvaluatorError } from "src/errors/factory";
import { checkQuotes } from "./arguments";

//==================================NUMERIC ARRAY=============================

/**
 * Get the maximum number from an array of numbers.
 * @param {number[]} nums The numbers to be compared.
 * @returns {number} The maximum number.
 */
export function max(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  return Math.max(...nums);
}

export function min(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  return Math.min(...nums);
}

/**
 * Get the sum of an array of numbers.
 * @param {number[]} nums The numbers to be summed.
 * @returns {number} The sum of the numbers.
 */
export function sum(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  return nums.reduce((acc, num) => acc + num, 0);
}

/**
 * Get the average of an array of numbers.
 * @param {number[]} nums The numbers to be averaged.
 * @returns {number} The average of the numbers.
 */
export function avg(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  return sum(nums) / nums.length;
}

//=======================================ARRAY=====================================

/**
 * Get the count of an array.
 * @param {unknown[]} arr The array to be counted.
 * @returns {number} The count of the array.
 */
export function count(arr: unknown[]): number {
  return arr.length;
}

/**
 * Get the unique values of an array.
 * @param {unknown[]} arr The array to be filtered.
 * @param {SortArgs} type The sorting type (asc or desc).
 * @returns {unknown[]} The unique values of the array.
 */
export function sort(arr: unknown[], type: SortArgs): unknown[] {
  if (!Array.isArray(arr) || arr.length === 0) {
    return arr;
  }

  // Create a copy to avoid mutating the original array
  return [...arr].sort((a, b) => {
    let compareResult: number;

    // Both null/undefined
    if (a == null && b == null) return 0;

    // One is null/undefined
    if (a == null) return -1;
    if (b == null) return 1;

    // Compare based on types
    if (typeof a === "number" && typeof b === "number") {
      compareResult = a - b;
    } else if (typeof a === "string" && typeof b === "string") {
      compareResult = a.localeCompare(b);
    } else if (typeof a === "boolean" && typeof b === "boolean") {
      compareResult = a === b ? 0 : a ? 1 : -1;
    } else {
      // Convert to string for comparison when types don't match
      compareResult = String(a).localeCompare(String(b));
    }

    // Apply sort direction
    return type === "asc" ? compareResult : -compareResult;
  });
}

/**
 * Reverse the order of an array.
 * @param {unknown[]} arr The array to be reversed.
 * @returns {unknown[]} The reversed array.
 */
export function reverse(arr: unknown[]): unknown[] {
  return arr.reverse();
}

/**
 * Get the unique values of an array.
 * @param {unknown[]} arr The array to be filtered.
 * @returns {unknown[]} The unique values of the array.
 */
export function unique(arr: unknown[]): unknown[] {
  return Array.from(new Set(arr));
}

//=======================================STRING====================================

/**
 * Get the length of a string.
 * @param {string} str The string to be measured.
 * @returns {number} The length of the string.
 */
export function strLength(str: string): number {
  return str.length;
}

/**
 * Get a substring of a string.
 * @param {string} str The string to be sliced.
 * @param {SubstringArgs} args The arguments for the substring function.
 * @returns {string} The substring.
 */
export function substring(str: string, args: SubstringArgs): string {
  const { start, end } = args;
  if (start < 0 || end < 0 || start > str.length || end > str.length) {
    throw new EvaluatorError(ERROR_MESSAGES.EVALUATOR.INVALID_ARGUMENTS, {
      start,
      end,
      stringLength: str.length,
    });
  }
  return str.slice(start, end);
}

/**
 * Check if a string contains another string.
 * @param {string} str The string to be checked.
 * @param {string} substring The substring to check for.
 * @returns {boolean} True if the string contains the substring, false otherwise.
 */
export function contains(str: string, substring: string): boolean {
  // Check for single and double quotes
  substring = checkQuotes(substring);

  return str.includes(substring);
}

/**
 * Convert a string to uppercase.
 * @param {string} str The string to be converted.
 * @returns {string} The uppercase string.
 */
export function upper(str: string): string {
  return str.toUpperCase();
}

/**
 * Convert a string to lowercase.
 * @param {string} str The string to be converted.
 * @returns {string} The lowercase string.
 */
export function lower(str: string): string {
  return str.toLowerCase();
}

/**
 * Check if two strings are equal.
 * @param {string} str1 The first string.
 * @param {string} str2 The second string.
 * @returns {boolean} True if the strings are equal, false otherwise.
 */
export function equals(str1: string, str2: string): boolean {
  // Check for single and double quotes
  str2 = checkQuotes(str2);

  return str1 === str2;
}

//======================================BOOLEAN====================================

/**
 * Check if a boolean value is true.
 * @param {boolean} data The boolean value to check.
 * @returns {boolean} True if the value is true, false otherwise.
 */
export function isTrue(data: boolean): boolean {
  return data === true;
}

/**
 * Check if a boolean value is false.
 * @param {boolean} data The boolean value to check.
 * @returns {boolean} True if the value is false, false otherwise.
 */
export function isFalse(data: boolean): boolean {
  return data === false;
}

//=================================================================================
