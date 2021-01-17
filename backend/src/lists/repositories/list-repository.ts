import { GenericRepositoryFileSystem } from "../../app/persistence/repository/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/persistence/repository/generic-repository.hash-map";
import { GenericRepositoryQueryOptions } from "../../app/persistence/repository/types";
import { List, ListId } from "../models/make-list";

export interface IListRepository {
  find(
    spec: Partial<List>[],
    options?: GenericRepositoryQueryOptions<List>
  ): Promise<List[]>;

  add(list: List): void;

  remove(id: ListId): void;

  update(id: ListId, partial: Partial<List>): void;

  count(spec: Partial<List>): Promise<number>;
}

export class ListRepositoryHashMap implements IListRepository {
  repository: GenericRepositoryHashMap<ListId, List>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<ListId, List>({});
  }
  async find(
    spec: Partial<List>[],
    options: GenericRepositoryQueryOptions<List>
  ) {
    return await this.repository.find(spec, options);
  }

  async add(list: List) {
    await this.repository.add([list]);
  }

  async remove(id: ListId) {
    await this.repository.remove([{ id }]);
  }

  async update(id: ListId, partial: Partial<List>) {
    await this.repository.update(id, partial);
  }

  async count(spec: Partial<List>) {
    return await this.repository.count([spec]);
  }
}

export class ListRepositoryFileSystem implements IListRepository {
  repository: GenericRepositoryFileSystem<ListId, List>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<ListId, List>(filePath);
  }

  async find(
    spec: Partial<List>[],
    options: GenericRepositoryQueryOptions<List>
  ) {
    return await this.repository.find(spec, options);
  }

  async add(list: List) {
    await this.repository.add([list]);
  }

  async remove(id: ListId) {
    await this.repository.remove([{ id }]);
  }

  async update(id: ListId, partial: Partial<List>) {
    await this.repository.update(id, partial);
  }

  async count(spec: Partial<List>) {
    return await this.repository.count([spec]);
  }
}
