/**
 * Check if a URL is valid
 * @param url The URL to check
 * @returns Whether the URL is valid or not
 */
function isValidUrl(url: string | undefined): boolean {
  if (url === undefined) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export { isValidUrl };
