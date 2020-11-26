import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";
import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { RepositoryQueryOptions } from "../../common/unit-of-work/types";
import { ListItem, ListItemId } from "../models/make-list-item";

export interface IListItemRepository {
  find(
    spec: Partial<ListItem>,
    options: RepositoryQueryOptions<ListItem>
  ): Promise<ListItem[]>;

  count(spec: Partial<ListItem>): Promise<number>;

  add(listItems: ListItem[]): void;

  remove(ids: ListItemId[]): void;
}

export class ListItemRepositoryHashMap implements IListItemRepository {
  repository: GenericRepositoryHashMap<ListItem>;

  constructor(repository: GenericRepositoryHashMap<ListItem>) {
    this.repository = repository;
  }

  async find(
    spec: Partial<ListItem>,
    options: RepositoryQueryOptions<ListItem>
  ) {
    return this.repository.find(spec, options);
  }

  async count(spec: Partial<ListItem>) {
    return this.repository.count(spec);
  }

  async add(listItems: ListItem[]) {
    this.repository.add(listItems);
  }

  async remove(ids: ListItemId[]) {
    this.repository.remove(ids.map((id) => ({ id })));
  }
}

export class ListItemRepositoryFileSystem implements IListItemRepository {
  repository: GenericRepositoryFileSystem<ListItem>;

  constructor(repository: GenericRepositoryFileSystem<ListItem>) {
    this.repository = repository;
  }

  async find(
    spec: Partial<ListItem>,
    options: RepositoryQueryOptions<ListItem>
  ) {
    return this.repository.find(spec, options);
  }

  async count(spec: Partial<ListItem>) {
    return this.repository.count(spec);
  }

  async add(listItems: ListItem[]) {
    this.repository.add(listItems);
  }

  async remove(ids: ListItemId[]) {
    this.repository.remove(ids.map((id) => ({ id })));
  }
}
