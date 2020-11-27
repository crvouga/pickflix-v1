import { isNullOrUndefined } from "util";

export const removeNullOrUndefinedEntries = (obj: { [key: string]: any }) => {
  return Object.keys(obj).reduce(
    (acc, k) => (isNullOrUndefined(obj[k]) ? acc : { ...acc, [k]: obj[k] }),
    {}
  );
};

export type Opaque<T, U extends string> = T & { readonly __TYPE__: U };
