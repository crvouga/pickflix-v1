export const capitalize = (string: string) =>
  (string[0] || "").toUpperCase() +
  string.substring(0, string.length - 1).toLowerCase();
