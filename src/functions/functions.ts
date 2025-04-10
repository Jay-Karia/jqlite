/**
 * @fileoverview Function definitions for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=====================================IMPORTS===================================

import type { SortArgs } from "./types";

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
    if ((a == null) && (b == null)) return 0;

    // One is null/undefined
    if (a == null) return -1;
    if (b == null) return 1;

    // Compare based on types
    if (typeof a === 'number' && typeof b === 'number') {
      compareResult = a - b;
    } else if (typeof a === 'string' && typeof b === 'string') {
      compareResult = a.localeCompare(b);
    } else if (typeof a === 'boolean' && typeof b === 'boolean') {
      compareResult = a === b ? 0 : a ? 1 : -1;
    } else {
      // Convert to string for comparison when types don't match
      compareResult = String(a).localeCompare(String(b));
    }

    // Apply sort direction
    return type === 'asc' ? compareResult : -compareResult;
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

//=================================================================================
