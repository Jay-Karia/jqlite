import {BaseError} from "./base";
import {ErrorParams} from "./types";

export function createErrorClass(name: string) {
  const errorClass = {
    [name]: class extends BaseError {
      constructor(params: ErrorParams) {
        super(params);
        this.name = name;
      }
    },
  }[name];

  return errorClass;
}

export const DataError = createErrorClass("DataError");
