import {
  whereEq,
  innerJoin,
  ascend,
  descend,
  sortWith,
  filter,
  reject,
} from "ramda";
import { Identifiable, IRepository, FindOptions } from "./types";

export class RepositoryHashMap<T extends Identifiable>
  implements IRepository<T> {
  db: { [id: string]: T };

  constructor() {
    this.db = {};
  }

  async find(entityInfo: Partial<T>, options?: FindOptions<T>): Promise<T[]> {
    const comparators =
      options?.orderBy?.map(([key, direction]) =>
        direction === "ascend"
          ? ascend<T>((entity) => entity[key])
          : descend<T>((entity) => entity[key])
      ) || [];

    return sortWith(
      comparators,
      Object.values(this.db).filter(whereEq(entityInfo))
    );
  }

  async get(entityIds: string[]): Promise<T[]> {
    return innerJoin(
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
      this.db = reject(whereEq(entityInfo), this.db);
    }
    return true;
  }

  async update(entityInfos: Array<Partial<T> & Pick<T, "id">>): Promise<T[]> {
    const updatedEntities = [];
    for (const { id, ...entityInfo } of entityInfos) {
      const entity = this.db[id];
      if (!entity) {
        throw new Error("entity does not exists");
      }
      const updatedEntity = {
        ...entity,
        ...entityInfo,
      };
      this.db[id] = updatedEntity;
      updatedEntities.push(updatedEntity);
    }
    return updatedEntities;
  }
}
