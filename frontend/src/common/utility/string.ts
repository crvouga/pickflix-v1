export const pluralize = (number: number, word: string) =>
  `${number} ${word}${number === 1 ? "" : "s"}`;

export const nameToInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substr(0, 2);

export const capitalize = (string: string) =>
  (string[0] || "").toUpperCase() +
  string.substring(1, string.length).toLowerCase();

export const capitalizeWords = (string: string) => {
  return string.split(" ").map(capitalize).join(" ");
};
