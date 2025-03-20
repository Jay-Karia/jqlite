export function parseJson(data: string): any {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing JSON data", error);
    return null;
  }
}
