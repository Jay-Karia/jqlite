/**
 * @fileoverview Base error class
 * @author Jay-Karia
 */

"use strict";

//======================================IMPORTS====================================

import type { ErrorParams } from "./types";

//=================================================================================

/**
 * Base error class
 */
export class BaseError extends Error {
  public code: string;
  public cause: string;
  public solution?: string;
  public metadata: Record<string, any>;
  public timeStamp: string = new Date().toLocaleTimeString();
  public date: Date = new Date();

  /**
   * Initializes the error class
   * @param param0 The error parameters
   */
  constructor({ message, code, cause, solution }: ErrorParams, metadata: Record<string, any>) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.cause = cause;
    this.solution = solution;
    this.metadata = metadata;
  }
}
