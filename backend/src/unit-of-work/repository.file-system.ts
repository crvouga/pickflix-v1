import fs from 'fs';
import {innerJoin, whereEq} from 'ramda';
import configuration from '../configuration';
import {Identifiable, IRepository} from './types';

const DIR = configuration.storeDirectoryName;

export class RepositoryFileSystem<T extends Identifiable>
  implements IRepository<T> {
  filename: string;

  constructor(collectionName: string) {
    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR);
    }
    this.filename = `${DIR}/${collectionName}.json`;
  }

  read(): {[id: string]: T} {
    try {
      return JSON.parse(fs.readFileSync(this.filename, 'utf8'));
    } catch (error) {
      return {};
    }
  }

  write(data: {[id: string]: T}) {
    fs.writeFileSync(this.filename, JSON.stringify(data));
  }

  async find(entityInfo: Partial<T>): Promise<T[]> {
    const db = this.read();
    return Object.values(db).filter(whereEq(entityInfo));
  }

  async get(entityIds: string[]): Promise<T[]> {
    const db = this.read();
    return innerJoin(
      (value, entityId) => value.id === entityId,
      Object.values(db),
      entityIds
    );
  }

  async count(entityInfo: Partial<T>): Promise<number> {
    const found = await this.find(entityInfo);
    return found.length;
  }

  async add(entities: T[]): Promise<T[]> {
    const db = this.read();
    for (const entity of entities) {
      db[entity.id] = entity;
    }
    this.write(db);
    return entities;
  }

  async remove(
    entityInfos: Array<Partial<T> & Pick<T, 'id'>>
  ): Promise<boolean> {
    const db = this.read();
    for (const entityInfo of entityInfos) {
      delete db[entityInfo.id];
    }
    this.write(db);
    return true;
  }

  async update(entityInfos: Array<Partial<T> & Pick<T, 'id'>>): Promise<T[]> {
    const db = this.read();
    const updatedEntities = [];
    for (const {id, ...entityInfo} of entityInfos) {
      const entity = db[id];
      if (!entity) {
        throw new Error('entity does not exists');
      }
      const updatedEntity = {
        ...entity,
        ...entityInfo,
      };
      db[id] = updatedEntity;
      updatedEntities.push(updatedEntity);
    }
    this.write(db);
    return updatedEntities;
  }
}
