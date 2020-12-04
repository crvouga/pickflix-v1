import * as R from "ramda";
import { pipe } from "remeda";
import {
  RepositoryQueryOptions,
  Identifiable,
  RepositoryQuerySpec,
  IGenericRepository,
} from "./types";
import { matchSorter } from "match-sorter";

const optionsToCompartors = <T>(options?: RepositoryQueryOptions<T>) => {
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
  options?: RepositoryQueryOptions<T>
): [number, number] | [] => {
  if (options?.pagination) {
    const { pageSize, page } = options.pagination;
    const startIndex = pageSize * (Math.max(page, 1) - 1);
    const endIndex = startIndex + pageSize;
    return [startIndex, endIndex];
  }
  return [];
};

export class GenericRepositoryHashMap<T extends Identifiable>
  implements IGenericRepository<T> {
  hashMap: {
    [id: string]: T;
  };

  constructor(hashMap: { [id: string]: T }) {
    this.hashMap = hashMap;
  }

  async find(
    spec: RepositoryQuerySpec<T>,
    options?: RepositoryQueryOptions<T>
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

  async search(
    query: string,
    keys: (keyof T)[],
    options?: RepositoryQueryOptions<T>
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

  async count(spec: RepositoryQuerySpec<T>): Promise<number> {
    const found = await this.find(spec);
    return found.length;
  }

  async add(entities: T[]): Promise<T[]> {
    for (const entity of entities) {
      this.hashMap[entity.id] = entity;
    }
    return entities;
  }

  async remove(spec: Partial<T>[]): Promise<boolean> {
    for (const andSpec of spec) {
      this.hashMap = R.reject(R.whereEq(andSpec), this.hashMap);
    }
    return true;
  }

  async update({ id, ...entityInfo }: Partial<T> & Pick<T, "id">): Promise<T> {
    const entity = this.hashMap[id];
    if (!entity) {
      throw new Error("entity does not exists");
    }
    const updated = {
      ...entity,
      ...entityInfo,
    };
    this.hashMap[id] = updated;
    return updated;
  }
}
