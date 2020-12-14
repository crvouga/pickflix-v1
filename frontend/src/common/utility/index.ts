export * from "./event-emitter";
export * from "./react-query";
export * from "./string";
export * from "./ui";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const omitFalsyValues = (object: { [key: string]: any }) => {
  return Object.entries(object).reduce(
    (object, [key, value]) =>
      Boolean(value) ? { ...object, [key]: value } : object,
    {}
  );
};

export const ensureArray = <T>(x: T | T[]) => (Array.isArray(x) ? x : [x]);

export const removeKey = (key: string, object: { [key: string]: any }) => {
  const { [key]: _, ...restOfObject } = object;
  return restOfObject;
};

export const addKey = (key: string, object: { [key: string]: any }) => {
  return {
    [key]: key,
    ...object,
  };
};

export const toggleKey = (key: string, object: { [key: string]: any }) => {
  if (key in object) {
    return removeKey(key, object);
  } else {
    return addKey(key, object);
  }
};

const serializeKeys = <T>(object: T) =>
  JSON.stringify(Object.keys(object).sort());

export const isEqualKeys = <T, U>(objectA: T, objectB: U) =>
  serializeKeys(objectA) === serializeKeys(objectB);

export const mapObject = <T, U>(
  f: (x: T) => U,
  x: { [index: string]: T }
): { [index: string]: U } => {
  const y: { [index: string]: U } = {};
  for (const key in x) {
    y[key] = f(x[key]);
  }
  return y;
};
