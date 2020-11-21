import * as R from "ramda";
import { pipe } from "remeda";
import { FindOptions, Identifiable, IRepository } from "./types";
import { matchSorter } from "match-sorter";

const optionsToCompartors = <T>(options?: FindOptions<T>) => {
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
  options?: FindOptions<T>
): [number, number] | [] => {
  if (options?.pagination) {
    const { pageSize, page } = options.pagination;
    const startIndex = pageSize * (Math.max(page, 1) - 1);
    const endIndex = startIndex + pageSize;
    return [startIndex, endIndex];
  }
  return [];
};

export class RepositoryHashMap<T extends Identifiable>
  implements IRepository<T> {
  db: {
    [id: string]: T;
  };

  constructor() {
    this.db = {};
  }

  async find(entityInfo: Partial<T>, options?: FindOptions<T>): Promise<T[]> {
    return pipe(
      this.db,
      (db) => Object.values(db),
      (rows) => rows.filter(R.whereEq(entityInfo)),
      (rows) => R.sortWith(optionsToCompartors(options), rows),
      (rows) => rows.slice(...optionsToIndexRange(options))
    );
  }

  async search(
    query: string,
    keys: (keyof T)[],
    options?: FindOptions<T>
  ): Promise<T[]> {
    return pipe(
      this.db,
      (db) => Object.values(db),
      (rows) =>
        matchSorter(rows, query, { keys: keys.map((key) => key.toString()) }),
      (rows) => R.sortWith(optionsToCompartors(options), rows),
      (rows) => rows.slice(...optionsToIndexRange(options))
    );
  }

  async count(entityInfo: Partial<T>): Promise<number> {
    const found = await this.find(entityInfo);
    return found.length;
  }

  async add(entities: T[]): Promise<T[]> {
    for (const entity of entities) {
      this.db[entity.id] = entity;
    }
    return entities;
  }

  async remove(entityInfos: Partial<T>[]): Promise<boolean> {
    for (const entityInfo of entityInfos) {
      this.db = R.reject(R.whereEq(entityInfo), this.db);
    }
    return true;
  }

  async update({ id, ...entityInfo }: Partial<T> & Pick<T, "id">): Promise<T> {
    const entity = this.db[id];
    if (!entity) {
      throw new Error("entity does not exists");
    }
    const updated = {
      ...entity,
      ...entityInfo,
    };
    this.db[id] = updated;
    return updated;
  }
}
