import { isNullOrUndefined } from "util";

export const castPositiveNumber = (anything: any) => {
  const number = Number(anything);
  if (number > 0) {
    return number;
  }
  throw new Error("invalid positive number");
};

export const castArray = <T>(array: any) => {
  if (Array.isArray(array)) {
    return array as T[];
  }
  throw new Error("invalid array");
};

export const removeNullOrUndefinedEntries = <T>(obj: T) => {
  const acc: Partial<T> = {};
  for (const key in obj) {
    if (!isNullOrUndefined(obj[key])) {
      acc[key] = obj[key];
    }
  }
  return acc;
};

export type Opaque<T, U extends string> = T & { readonly __TYPE__: U };
