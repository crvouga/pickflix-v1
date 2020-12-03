import { isNullOrUndefined } from "util";

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
