import * as R from "ramda";
import { pipe } from "remeda";
import { FindOptions, Identifiable, IRepository } from "./types";

export class RepositoryHashMap<T extends Identifiable>
  implements IRepository<T> {
  db: {
    [id: string]: T;
  };

  constructor() {
    this.db = {};
  }

  async find(entityInfo: Partial<T>, options?: FindOptions<T>): Promise<T[]> {
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

    let startIndex: number | undefined = undefined;
    let endIndex: number | undefined = undefined;

    if (options?.pagination) {
      const { pageSize, pageNumber } = options.pagination;
      startIndex = pageSize * (Math.max(pageNumber, 1) - 1);
      endIndex = startIndex + pageSize;
    }

    return pipe(
      this.db,
      (db) => Object.values(db),
      (rows) => rows.filter(R.whereEq(entityInfo)),
      (rows) => R.sortWith(comparators, rows),
      (rows) => rows.slice(startIndex, endIndex)
    );
  }

  async get(entityIds: string[]): Promise<T[]> {
    return R.innerJoin(
      (value, entityId) => value.id === entityId,
      Object.values(this.db),
      entityIds
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
