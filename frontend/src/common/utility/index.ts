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
