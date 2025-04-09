/**
 * @fileoverview Function definitions for jqlite.
 * @author Jay-Karia
 */

"use strict";

//=====================================FUNCTIONS===================================

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

//=================================================================================
