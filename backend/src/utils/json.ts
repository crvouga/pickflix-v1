import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";

export type Json = string & { _: "Json" };

export const castJson = (json: any): Json => {
  try {
    JSON.parse(json);
    return json;
  } catch (error) {
    throw new Error("failed to cast json");
  }
};

export const serializeJson = <T>(obj: T): Json => {
  // NOTE: does not sort arrays of objects but does sort arrays of strings and numbers
  return castJson(stringify(sortKeysRecursive(obj)));
};
