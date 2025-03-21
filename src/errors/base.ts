import { ErrorParams } from "./types";

/**
 * Base error class
 */
export class BaseError extends Error {
  public code: string;
  public cause?: string;
  public solution?: string;

  /**
   * Initializes the error class
   * @param param0 The error parameters
   */
  constructor({ message, code, cause, solution }: ErrorParams) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.cause = cause;
    this.solution = solution;
  }

  /**
   * Get the error as a JSON object
   * @returns The error as a JSON object
   */
  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      cause: this.cause,
      solution: this.solution,
    };
  }
}
