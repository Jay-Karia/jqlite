/**
 * @fileoverview Function definitions for jqlite.
 * @author Jay-Karia
 */

"use strict";

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
export function sort(arr: unknown[]): unknown[] {
  return arr.sort();
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
