import { ErrorParams } from "./types";

export class BaseError extends Error {
  public code: string;
  public cause?: string;
  public solution?: string;

  constructor({ message, code, cause, solution }: ErrorParams) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.cause = cause;
    this.solution = solution;
  }

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
