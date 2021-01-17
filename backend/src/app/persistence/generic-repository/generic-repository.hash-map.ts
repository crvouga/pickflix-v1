import * as R from "ramda";
import { pipe } from "remeda";
import {
  GenericRepositoryQueryOptions,
  Identifiable,
  GenericRepositoryQuerySpec,
  IGenericRepository,
} from "./types";
import { matchSorter } from "match-sorter";

const optionsToCompartors = <T>(options?: GenericRepositoryQueryOptions<T>) => {
  const comparators: ((a: T, b: T) => number)[] = [];
  if (options?.orderBy) {
    for (const [key, direction] of options.orderBy) {
      switch (direction) {
        case "ascend":
          comparators.push(R.ascend<T>((_) => _[key]));
          break;
        case "descend":
          comparators.push(R.descend<T>((_) => _[key]));
          break;
      }
    }
  }
  return comparators;
};

const optionsToIndexRange = <T>(
  options?: GenericRepositoryQueryOptions<T>
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
    options?: GenericRepositoryQueryOptions<T>
  ): Promise<T[]> {
    return pipe(
      this.hashMap,
      (hashMap) => Object.values(hashMap),
      (rows) =>
        rows.filter((row) =>
          spec.some((partialSpec) => R.whereEq(partialSpec, row))
        ),
      (rows) => R.sortWith(optionsToCompartors(options), rows),
      (rows) => rows.slice(...optionsToIndexRange(options))
    );
  }

  async search<K extends keyof T>(
    query: string,
    keys: K[],
    options?: GenericRepositoryQueryOptions<T>
  ): Promise<T[]> {
    return pipe(
      this.hashMap,
      (hashMap) => Object.values(hashMap),
      (rows) =>
        matchSorter(rows, query, { keys: keys.map((key) => key.toString()) }),
      (rows) => R.sortWith(optionsToCompartors(options), rows),
      (rows) => rows.slice(...optionsToIndexRange(options))
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

  async remove(spec: Partial<T>[]) {
    for (const andSpec of spec) {
      this.hashMap = R.reject(R.whereEq(andSpec), this.hashMap);
    }
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
