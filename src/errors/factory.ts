import { BaseError } from "./base";
import { ErrorParams } from "./types";

/**
 * Create an error class for a specific category
 * @param name The name of the error class
 * @returns The error class
 */
export function createErrorClass(name: string) {
  const errorClass = {
    [name]: class extends BaseError {
      constructor(params: ErrorParams, metadata?: Record<string, any>) {
        super(params);
        this.name = name;
        this.metadata = metadata || {};
      }
    },
  }[name];

  return errorClass;
}

export const DataError = createErrorClass("DataError");
export const ConfigError = createErrorClass("ConfigError");
