import * as R from "remeda";

import {
  GenericRepositoryQueryOptions,
  GenericRepositoryQuerySpec,
  Identifiable,
  IGenericRepository,
} from "./types";
import { matchSorter } from "match-sorter";

const whereEq = <T>(spec: T, obj: T) => {
  return Object.entries(spec).reduce(
    (isWhereEq, [specKey, specValue]) =>
      //@ts-ignore
      isWhereEq && R.equals(obj[specKey], specValue),
    true,
  );
};

const optionsToCompartors = <T>(options?: GenericRepositoryQueryOptions<T>) => {
  const comparators: ((a: T, b: T) => number)[] = [];
  if (options?.orderBy) {
    for (const [key, direction] of options.orderBy) {
      switch (direction) {
        case "ascend":
          //@ts-ignore
          comparators.push((a, b) => a[key] - b[key]);
          break;
        case "descend":
          //@ts-ignore
          comparators.push((a, b) => b[key] - a[key]);
          break;
      }
    }
  }
  return comparators;
};

const optionsToIndexRange = <T>(
  options?: GenericRepositoryQueryOptions<T>,
): [number, number] | [] => {
  if (options?.pagination) {
    const { pageSize, page } = options.pagination;
    const startIndex = pageSize * (Math.max(page, 1) - 1);
    const endIndex = startIndex + pageSize;
    return [startIndex, endIndex];
  }
  return [];
};

export class GenericRepositoryHashMap<I, T extends Identifiable<I>>
  implements IGenericRepository<I, T> {
  hashMap: {
    [id: string]: T;
  };

  constructor(hashMap: { [id: string]: T }) {
    this.hashMap = hashMap;
  }

  async find(
    spec: GenericRepositoryQuerySpec<T>,
    options?: GenericRepositoryQueryOptions<T>,
  ): Promise<T[]> {
    return R.pipe(
      this.hashMap,
      (hashMap) => Object.values(hashMap),
      (rows) =>
        rows.filter((row) =>
          spec.some((partialSpec) => whereEq(partialSpec, row))
        ),
      (rows) =>
        optionsToCompartors(options).reduce(
          (sorted, compartor) => R.sort(sorted, compartor),
          rows,
        ),
      (rows) => rows.slice(...optionsToIndexRange(options)),
    );
  }

  async search<K extends keyof T>(
    query: string,
    keys: K[],
    options?: GenericRepositoryQueryOptions<T>,
  ): Promise<T[]> {
    return R.pipe(
      this.hashMap,
      (hashMap) => Object.values(hashMap),
      (rows) =>
        matchSorter(rows, query, { keys: keys.map((key) => key.toString()) }),
      (rows) =>
        optionsToCompartors(options).reduce(
          (sorted, compartor) => R.sort(sorted, compartor),
          rows,
        ),
      (rows) => rows.slice(...optionsToIndexRange(options)),
    );
  }

  async count(spec: GenericRepositoryQuerySpec<T>): Promise<number> {
    const found = await this.find(spec);
    return found.length;
  }

  async add(entities: T[]) {
    for (const entity of entities) {
      this.hashMap[String(entity.id)] = entity;
    }
  }

  async remove(specs: Partial<T>[]) {
    const omitKeys = Object.keys(this.hashMap).filter((id) =>
      specs.some((spec) => whereEq(spec, this.hashMap[id]))
    );

    this.hashMap = R.omit(this.hashMap, omitKeys);
  }

  async update(id: I, partial: Partial<T>) {
    const entity = this.hashMap[String(id)];
    if (!entity) {
      throw new Error("entity does not exists");
    }
    const updated = {
      ...entity,
      ...partial,
    };
    this.hashMap[String(id)] = updated;
  }
}
