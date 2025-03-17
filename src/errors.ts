import { ERROR_DOCS_BASE_URL } from "./constants/index";

/**
 * The base error class
 */
export class JQLiteError extends Error {
  public code: string;
  public documentation: string;
  public solution?: string;

  /**
   * The main error class
   * @param message The error message
   * @param code The error code
   * @param cause The error cause
   * @param solution The error solution
   */
  constructor(message: string, code: string, cause: string, solution?: string) {
    super(message);
    this.name = "JQLiteError";
    this.code = code;
    this.cause = cause;
    this.documentation = `${ERROR_DOCS_BASE_URL}/core#${code.toLowerCase()}`;
    this.solution = solution;
  }
}

// Common error params type
type ErrorParams = {
  message: string;
  code: string;
  cause: string;
  solution?: string;
};

/**
 * Factory function to create specialized error classes
 */
function createErrorClass(name: string, section: string) {
  // Using a named class to ensure proper stack traces
  const errorClass = {
    [name]: class extends JQLiteError {
      constructor(params: ErrorParams) {
        super(params.message, params.code, params.cause, params.solution);
        this.name = name;
        this.documentation = `${ERROR_DOCS_BASE_URL}/${section}#${params.code.toLowerCase()}`;
      }
    },
  }[name];

  return errorClass;
}

// Create and export specialized error classes
export const ConfigError = createErrorClass("ConfigError", "config");
export const DataError = createErrorClass("DataError", "data");
export const CacheError = createErrorClass("CacheError", "cache");
export const EventError = createErrorClass("EventError", "events");
