import { ERROR_DOCS_BASE_URL } from "./constants/index";

/**
 * The base error class
 */
export class JQLiteError extends Error {
  protected code: string;
  protected documentation: string;
  protected solution?: string;

  constructor(message: string, code: string, cause: string, solution?: string) {
    super(message);
    this.name = "JQLiteError";
    this.code = code;
    this.cause = cause;
    this.documentation = `${ERROR_DOCS_BASE_URL}/core#${code.toLowerCase()}`;
    this.solution = solution;
  }
}

/**
 * The error class for configuration errors
 */
export class ConfigError extends JQLiteError {
  constructor({
    message,
    code,
    cause,
    solution,
  }: {
    message: string;
    code: string;
    cause: string;
    solution?: string;
  }) {
    super(message, code, cause, solution);
    this.name = "ConfigError";
    this.documentation = `${ERROR_DOCS_BASE_URL}/config#${code.toLowerCase()}`;
  }
}

/**
 * The error class for data errors
 */
export class DataError extends JQLiteError {
  constructor({
    message,
    code,
    cause,
    solution,
  }: {
    message: string;
    code: string;
    cause: string;
    solution?: string;
  }) {
    super(message, code, cause, solution);
    this.name = "DataError";
    this.documentation = `${ERROR_DOCS_BASE_URL}/data#${code.toLowerCase()}`;
  }
}
