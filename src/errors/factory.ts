import { BaseError } from "./base";
import type { ErrorParams } from "./types";

/**
 * Create an error class for a specific category
 * @param name The name of the error class
 * @returns The error class
 */
export function createErrorClass(name: string): typeof BaseError {
  const errorClass = {
    [name]: class extends BaseError {
      constructor(params: ErrorParams, metadata: Record<string, any>) {
        super(params, metadata);
        this.name = name;
      }
    },
  }[name];

  return errorClass;
}

export const DataError = createErrorClass("DataError");
export const ConfigError = createErrorClass("ConfigError");
