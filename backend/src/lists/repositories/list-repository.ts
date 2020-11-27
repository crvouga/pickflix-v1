import { GenericRepositoryFileSystem } from "../../app/data-access/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/data-access/generic-repository.hash-map";
import { RepositoryQueryOptions } from "../../app/data-access/types";
import { List, ListId } from "../models/make-list";

export interface IListRepository {
  find(
    spec: Partial<List>,
    options?: RepositoryQueryOptions<List>
  ): Promise<List[]>;

  add(list: List): void;

  remove(id: ListId): void;

  update(id: ListId, partial: Partial<List>): void;

  count(spec: Partial<List>): Promise<number>;
}

export class ListRepositoryHashMap implements IListRepository {
  repository: GenericRepositoryHashMap<List>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<List>({});
  }

  async find(spec: Partial<List>, options: RepositoryQueryOptions<List>) {
    return this.repository.find(spec, options);
  }

  async add(list: List) {
    this.repository.add([list]);
  }

  async remove(id: ListId) {
    this.repository.remove([{ id }]);
  }

  async update(id: ListId, partial: Partial<List>) {
    this.repository.update({ id, ...partial });
  }

  async count(spec: Partial<List>) {
    return this.repository.count(spec);
  }
}

export class ListRepositoryFileSystem implements IListRepository {
  repository: GenericRepositoryFileSystem<List>;

  constructor() {
    this.repository = new GenericRepositoryFileSystem<List>("lists");
  }

  async find(spec: Partial<List>, options: RepositoryQueryOptions<List>) {
    return this.repository.find(spec, options);
  }

  async add(list: List) {
    this.repository.add([list]);
  }

  async remove(id: ListId) {
    this.repository.remove([{ id }]);
  }

  async update(id: ListId, partial: Partial<List>) {
    this.repository.update({ id, ...partial });
  }

  async count(spec: Partial<List>) {
    return this.repository.count(spec);
  }
}
