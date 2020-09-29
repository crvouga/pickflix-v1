import { denormalize, normalize, NormalizedSchema, schema } from "normalizr";

export interface IById<T> {
  [id: string]: T;
}

export const normalizeData = <E extends string, T>(
  data: T[] | T,
  schema: schema.Array<schema.Entity<T>> | schema.Entity<T>
): NormalizedSchema<
  {
    [k in E]: IById<T>;
  },
  number[]
> => {
  return normalize(data, schema);
};

export const denormalizeData = <Entities, T>(
  normalizedData: IById<T>,
  normalizedDataSchema: schema.Entity<T>,
  enitites: Entities
): T => {
  return denormalize(normalizedData, normalizedDataSchema, enitites);
};
