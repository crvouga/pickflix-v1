import R from 'ramda';
import {Id} from '../id/types';
import {Identifiable, IRepository} from './types';

export class RepositoryFake<T extends Identifiable> implements IRepository<T> {
  map: Map<string, T>;

  constructor() {
    this.map = new Map<string, T>();
  }

  async find(entityInfo: Partial<T>): Promise<T[]> {
    return Array.from(this.map.values()).filter(R.whereEq(entityInfo));
  }

  async count(entityInfo: Partial<T>): Promise<number> {
    const found = await this.find(entityInfo);
    return found.length;
  }

  async add(entities: T[]): Promise<T[]> {
    for (const entity of entities) {
      this.map.set(entity.id, entity);
    }
    return entities;
  }

  async remove(
    entityInfos: Array<Partial<T> & Pick<T, 'id'>>
  ): Promise<boolean> {
    for (const entityInfo of entityInfos) {
      this.map.delete(entityInfo.id);
    }
    return true;
  }

  async update(entityInfos: Array<Partial<T> & Pick<T, 'id'>>): Promise<T[]> {
    const updatedEntities = [];
    for (const {id, ...entityInfo} of entityInfos) {
      const entity = this.map.get(id);
      if (!entity) {
        throw new Error('entity does not exists');
      }
      const updatedEntity = {
        ...entity,
        ...entityInfo,
      };
      this.map.set(id, updatedEntity);
      updatedEntities.push(updatedEntity);
    }
    return updatedEntities;
  }
}
