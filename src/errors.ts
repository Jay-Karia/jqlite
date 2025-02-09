const CONFIG_ERRORS = {
  ALIAS_EXISTS: {
    message: "Alias already exists",
    code: "C101",
    cause: "Tried to allocate an alias that already exists",
  },
  PATH_EXISTS: {
    message: "Path already exists",
    code: "C102",
    cause: "Tried to allocate a path that already exists",
  },
  ALIAS_NOT_FOUND: {
    message: "Alias not found",
    code: "C103",
    cause: "Tried to remove an alias that does not exist",
  },
  EMPTY_ALIAS: {
    message: "Alias is empty",
    code: "C104",
    cause: "Tried to add an empty alias",
  },
  EMPTY_PATH: {
    message: "Path is empty",
    code: "C105",
    cause: "Tried to add an empty path",
  },
  NO_ALIASES: {
    message: "No aliases",
    code: "C106",
    cause: "Tried to remove an alias from an empty array",
  },
}

export class ConfigError extends Error {
  private code: string;
  constructor({ message, code, cause }: { message: string, code: string, cause: string }) {
    super(message);
    this.name = "ConfigError";
    this.cause = cause;
    this.code = code;
  }
}

export {CONFIG_ERRORS}