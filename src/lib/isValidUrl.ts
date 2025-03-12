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
