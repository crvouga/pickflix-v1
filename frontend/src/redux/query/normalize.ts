import { denormalize, normalize, NormalizedSchema, schema } from "normalizr";

export { schema };

export const normalizeData = <E extends string, T>(
  data: T | T[],
  schema: schema.Array<schema.Entity<T>> | schema.Entity<T>
): NormalizedSchema<
  {
    [k in E]: { [id: string]: T };
  },
  number[]
> => {
  return normalize(data, schema);
};

export const denormalizeData = <Entities, T>(
  normalizedData: T | { [id: string]: T },
  normalizedDataSchema: schema.Entity<T>,
  enitites: Entities
): T => {
  return denormalize(normalizedData, normalizedDataSchema, enitites);
};
