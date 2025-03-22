/**
 * Creates an error handler for tryOperation
 * @param handler Function to handle errors
 * @returns Error handler object
 */
export function onError<E>(handler: (error: unknown) => E) {
  return { handler };
}

/**
 * Executes an operation that might throw with controlled error handling
 * @param operation Function to execute
 * @param errorHandler Error handler created with onError()
 * @returns Result of operation or error handler
 */
export function tryOperation<T, E>(
  operation: () => T,
  errorHandler: ReturnType<typeof onError<E>>
): T | E {
  try {
    return operation();
  } catch (error) {
    return errorHandler.handler(error);
  }
}
