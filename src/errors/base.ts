import type { ErrorParams } from "./types";

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
  constructor(
    { message, code, cause, solution }: ErrorParams,
    metadata: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.cause = cause;
    this.solution = solution;
    this.metadata = metadata;
  }

  /**
   * Get the error as a JSON object
   * @returns The error as a JSON object
   */
  public toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      cause: this.cause,
      solution: this.solution,
      metadata: this.metadata,
    };
  }
}
