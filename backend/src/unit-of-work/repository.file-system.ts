import fs from "fs";
import { innerJoin, whereEq, ascend, prop, descend, sortWith } from "ramda";
import configuration from "../configuration";
import { Identifiable, IRepository, FindOptions } from "./types";
import { RepositoryHashMap } from "./repository.hash-map";
export class RepositoryFileSystem<T extends Identifiable>
  implements IRepository<T> {
  filename: string;
  repositoryHashMap: RepositoryHashMap<T>;

  constructor(collectionName: string) {
    this.filename = `${configuration.PATH_TO_FILE_STORE}/${collectionName}.json`;
    this.repositoryHashMap = new RepositoryHashMap<T>();
  }

  read(): { [id: string]: T } {
    try {
      const db = JSON.parse(fs.readFileSync(this.filename, "utf8"));
      this.repositoryHashMap.db = db;
      return db;
    } catch (error) {
      this.repositoryHashMap.db = {};
      return {};
    }
  }

  write() {
    const db = this.repositoryHashMap.db;
    fs.writeFileSync(this.filename, JSON.stringify(db));
  }

  async find(entityInfo: Partial<T>, options?: FindOptions<T>): Promise<T[]> {
    this.read();
    return await this.repositoryHashMap.find(entityInfo, options);
  }

  async get(entityIds: string[]): Promise<T[]> {
    this.read();
    return await this.repositoryHashMap.get(entityIds);
  }

  async count(entityInfo: Partial<T>): Promise<number> {
    this.read();
    return await this.repositoryHashMap.count(entityInfo);
  }

  async add(entities: T[]): Promise<T[]> {
    this.read();
    await this.repositoryHashMap.add(entities);
    this.write();
    return entities;
  }

  async remove(
    entityInfos: Array<Partial<T> & Pick<T, "id">>
  ): Promise<boolean> {
    this.read();
    await this.repositoryHashMap.remove(entityInfos);
    this.write();
    return true;
  }

  async update(entityInfos: Array<Partial<T> & Pick<T, "id">>): Promise<T[]> {
    this.read();
    const updatedEntities = await this.repositoryHashMap.update(entityInfos);
    this.write();
    return updatedEntities;
  }
}
