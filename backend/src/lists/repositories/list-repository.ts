import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { RepositoryQueryOptions } from "../../common/unit-of-work/types";
import { List, ListId } from "../models/make-list";

export interface IListRepository {
  find(
    spec: Partial<List>,
    options: RepositoryQueryOptions<List>
  ): Promise<List[]>;

  add(list: List): void;

  remove(id: ListId): void;

  update(id: ListId, partial: Partial<List>): void;

  count(spec: Partial<List>): Promise<number>;
}

export class ListRepositoryHashMap implements IListRepository {
  repository: GenericRepositoryHashMap<List>;

  constructor(repository: GenericRepositoryHashMap<List>) {
    this.repository = repository;
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
