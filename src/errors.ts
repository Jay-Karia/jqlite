import { ERROR_DOCS_BASE_URL } from "./constants/index";

// All the errors related to configuration
const CONFIG_ERRORS = {
  ALIAS: {
    EXISTS: {
      message: "Alias already exists",
      code: "A101",
      cause: "Tried to allocate an alias that already exists",
    },
    NOT_FOUND: {
      message: "Alias not found",
      code: "A102",
      cause: "Tried to remove an alias that does not exist",
    },
    EMPTY: {
      message: "Alias is empty",
      code: "A103",
      cause: "Tried to add an empty alias",
    },
    NULL_ARRAY: {
      message: "No aliases",
      code: "A104",
      cause: "Tried to remove an alias from an empty array",
    },
    DUPLICATE: {
      message: "Duplicate alias found",
      code: "A110",
      cause: "Multiple aliases with same name",
    },
  },
  PATH: {
    EXISTS: {
      message: "Path already exists",
      code: "A105",
      cause: "Tried to allocate a path that already exists",
    },
    EMPTY: {
      message: "Path is empty",
      code: "A106",
      cause: "Tried to add an empty path",
    },
    DUPLICATE: {
      message: "Duplicate path found",
      code: "A109",
      cause: "Multiple aliases with same path",
    },
  },
  FUZZY: {
    INVALID_DISTANCE: {
      message: "Invalid fuzzy distance",
      code: "A107",
      cause: "Fuzzy distance must be a non-negative number",
    },
    INVALID_LIMIT: {
      message: "Invalid fuzzy limit",
      code: "A108",
      cause: "Fuzzy limit must be a non-negative number",
    },
  },
};

/**
 * The base error class
 */
export class JQLiteError extends Error {
  protected code: string;
  protected documentation: string;
  constructor(message: string, code: string, cause: string) {
    super(message);
    this.name = "JQLiteError";
    this.code = code;
    this.cause = cause;
    this.documentation = `${ERROR_DOCS_BASE_URL}/core#${code.toLowerCase()}`;
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
  }: {
    message: string;
    code: string;
    cause: string;
  }) {
    super(message, code, cause);
    this.name = "ConfigError";
    this.documentation = `${ERROR_DOCS_BASE_URL}/config#${code.toLowerCase()}`;
  }
}

export { CONFIG_ERRORS };
