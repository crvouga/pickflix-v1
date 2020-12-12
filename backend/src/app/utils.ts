import { isNullOrUndefined } from "util";
import pPipe from "p-pipe";

export const pipePromise = pPipe;

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

export type Link = string & { _: "Link" };

export const castLink = (link: string): Link => {
  try {
    new URL(link);
    return link as Link;
  } catch (error) {
    throw new Error("failed to cast link");
  }
};

export type Timestamp = number & { _: "Timestamp" };

export const castTimestamp = (_timestamp: any) => {
  const timestamp = Number(_timestamp);
  // SOURCE: https://stackoverflow.com/questions/12422918/how-to-validate-timestamp-in-javascript
  if (new Date(timestamp).getTime() > 0) {
    return timestamp as Timestamp;
  }
  throw new Error("Failed to cast timestamp");
};
export const makeTimestamp = () => {
  return castTimestamp(Date.now());
};
