import { ERROR_DOCS_BASE_URL } from "./constants/index";
import { type Error } from "./types/error";

// All the errors related to configuration
const CONFIG_ERRORS = {
  ALIAS: {
    EXISTS: {
      message: "Alias already exists",
      code: "A101",
      cause: "Tried to allocate an alias that already exists",
      solution: "Use a different alias name",
    } as Error,
    NOT_FOUND: {
      message: "Alias not found",
      code: "A102",
      cause: "Tried to remove an alias that does not exist",
      solution: "Check if the alias exists before removing it",
    } as Error,
    EMPTY: {
      message: "Alias is empty",
      code: "A103",
      cause: "Tried to add an empty alias",
      solution: "Use a non-empty alias name with more than 0 characters",
    } as Error,
    EMPTY_ARRAY: {
      message: "No aliases",
      code: "A104",
      cause: "Tried to remove an alias from an empty array",
      solution: "Add aliases before removing them",
    } as Error,
  },
  PATH: {
    EXISTS: {
      message: "Path already exists",
      code: "A105",
      cause: "Tried to allocate a path that already exists",
      solution: "Use a different path",
    } as Error,
    EMPTY: {
      message: "Path is empty",
      code: "A106",
      cause: "Tried to add an empty path",
      solution: "Use a non-empty path with more than 0 characters",
    } as Error,
  },
  FUZZY: {
    INVALID_DISTANCE: {
      message: "Invalid fuzzy distance",
      code: "A107",
      cause: "Fuzzy distance must be a non-negative number",
      solution: "Use a non-negative number for fuzzy distance",
    } as Error,
    INVALID_LIMIT: {
      message: "Invalid fuzzy limit",
      code: "A108",
      cause: "Fuzzy limit must be a non-negative number",
      solution: "Use a non-negative number for fuzzy limit",
    } as Error,
  },
  FALLBACK: {
    VALUE_REQUIRED: {
      message: "Fallback value required",
      code: "A109",
      cause: "Tried to set a fallback strategy without a value",
      solution: "Set a value for the fallback strategy",
    } as Error,
    VALUE_NOT_REQUIRED: {
      message: "Fallback value not required",
      code: "A110",
      cause: "Tried to set a fallback strategy with a value",
      solution: "Value is only required for defaul fallback strategy",
    } as Error,
  },
};

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

export { CONFIG_ERRORS };
