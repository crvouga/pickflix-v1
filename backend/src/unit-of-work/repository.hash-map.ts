import { whereEq, innerJoin } from "ramda";
import { Identifiable, IRepository } from "./types";

export class RepositoryHashMap<T extends Identifiable>
  implements IRepository<T> {
  db: { [id: string]: T };

  constructor() {
    this.db = {};
  }

  async find(entityInfo: Partial<T>): Promise<T[]> {
    return Object.values(this.db).filter(whereEq(entityInfo));
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

  async remove(
    entityInfos: Array<Partial<T> & Pick<T, "id">>
  ): Promise<boolean> {
    for (const entityInfo of entityInfos) {
      delete this.db[entityInfo.id];
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
