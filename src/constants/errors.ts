import { type Error } from "../types/error";

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
      solution: "Value is only required for default fallback strategy",
    } as Error,
    INFER_RULES_REQUIRED: {
      message: "Rules are required for infer strategy",
      code: "A111",
      cause: "Missing infer rules key from fallback object",
      solution: "Add infer rules",
    } as Error,
    INFER_RULES_NOT_REQUIRED: {
      message: "Rules are not required for strategies except infer",
      code: "A112",
      cause: "Additional infer rules key from fallback object",
      solution: "Remove infer rules",
    } as Error,
  },
  DATA_CACHE: {
    LIMIT_NOT_REQUIRED: {
      message: "Limit is not required",
      code: "A113",
      cause: "Tried to set a limit for data cache of none strategy",
      solution: "Remove the limit key from data cache",
    } as Error,
    AUTO_SAVE_NOT_REQUIRED: {
      message: "Auto save is not required",
      code: "A116",
      cause: "Tried to set auto save for data cache of none strategy",
      solution: "Remove the auto save key from data cache",
    } as Error,
    INVALID_EXPIRATION: {
      message: "Invalid expiration",
      code: "A117",
      cause: "Tried to set an expiration less than or equal to 0",
      solution: "Set an expiration greater than 0",
    } as Error,
  },
};

// All the errors related to data
const DATA_ERRORS = {
  INVALID_JSON: {
    message: "Invalid JSON",
    code: "D101",
    cause: "Tried to parse an invalid JSON",
    solution: "Check if the JSON is valid",
  } as Error,
  INVALID_PATH: {
    message: "Invalid path",
    code: "D102",
    cause: "Tried to read from an invalid path",
    solution: "Check if the path exists",
  } as Error,
  JSON_FILE_NOT_FOUND: {
    message: "Not a JSON file",
    code: "D103",
    cause: "Tried to read from a file which is not JSON",
    solution: "Check if the file has JSON content",
  } as Error,
  INVALID_URL: {
    message: "Invalid JSON URL",
    code: "D104",
    cause:
      "Tried to read from an invalid URL or from an url that does not return JSON",
    solution: "Check if the URL exists and has JSON content",
  } as Error,
};

// All the errors related to cache
const CACHE_ERRORS = {
  LIMIT_EXCEEDED: {
    message: "Cache limit exceeded",
    code: "C101",
    cause: "Tried to set a cache value when the cache limit is reached",
    solution: "Clear the cache before setting a new value",
  } as Error,
  KEY_NOT_FOUND: {
    message: "Key not found",
    code: "C102",
    cause: "Tried to remove a key that does not exist in the cache",
    solution: "Check if the key exists before removing it",
  } as Error,
};

// All the errors related to events
const EVENT_ERRORS = {
  EVENT_NOT_FOUND: {
    message: "Event not found",
    code: "E101",
    cause: "Tried to remove an event that does not exist",
    solution: "Check if the event exists before removing it",
  } as Error,
  INVALID_EVENT: {
    message: "Invalid event",
    code: "E102",
    cause: "Tried to add an invalid event",
    solution: "Use a valid event name",
  },
};

export { CONFIG_ERRORS, DATA_ERRORS, CACHE_ERRORS, EVENT_ERRORS };
