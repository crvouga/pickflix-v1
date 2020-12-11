import fs from "fs";
import configuration from "../../configuration";
import { GenericRepositoryHashMap } from "./generic-repository.hash-map";
import {
  Identifiable,
  IGenericRepository,
  GenericRepositoryQueryOptions,
  GenericRepositoryQuerySpec,
} from "./types";

export class GenericRepositoryFileSystem<I, T extends Identifiable<I>>
  implements IGenericRepository<I, T> {
  filePath: string;
  repositoryHashMap: GenericRepositoryHashMap<I, T>;

  constructor(filePath: string) {
    this.repositoryHashMap = new GenericRepositoryHashMap<I, T>({});
    this.filePath = filePath;
  }

  read(): { [id: string]: T } {
    try {
      const hashMap = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      this.repositoryHashMap.hashMap = hashMap;
      return hashMap;
    } catch (error) {
      this.repositoryHashMap.hashMap = {};
      return {};
    }
  }

  write() {
    const hashMap = this.repositoryHashMap.hashMap;
    fs.writeFileSync(this.filePath, JSON.stringify(hashMap));
  }

  async find(
    spec: GenericRepositoryQuerySpec<T>,
    options?: GenericRepositoryQueryOptions<T>
  ): Promise<T[]> {
    this.read();
    return await this.repositoryHashMap.find(spec, options);
  }

  async search(
    query: string,
    keys: (keyof T)[],
    options?: GenericRepositoryQueryOptions<T>
  ): Promise<T[]> {
    this.read();
    return await this.repositoryHashMap.search(query, keys, options);
  }

  async count(spec: GenericRepositoryQuerySpec<T>): Promise<number> {
    this.read();
    return await this.repositoryHashMap.count(spec);
  }

  async add(entities: T[]) {
    this.read();
    await this.repositoryHashMap.add(entities);
    this.write();
  }

  async remove(spec: GenericRepositoryQuerySpec<T>) {
    this.read();
    await this.repositoryHashMap.remove(spec);
    this.write();
  }

  async update(id: I, partial: Partial<T>) {
    this.read();
    await this.repositoryHashMap.update(id, partial);
    this.write();
  }
}
