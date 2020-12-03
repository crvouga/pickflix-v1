import { GenericRepositoryFileSystem } from "../../app/data-access/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/data-access/generic-repository.hash-map";
import { RepositoryQueryOptions } from "../../app/data-access/types";
import { ListItemId } from "../models";
import { ListItem } from "../models/make-list-item";

type ListItemSpec = Partial<ListItem>[];

export interface IListItemRepository {
  find(
    spec: ListItemSpec,
    options?: RepositoryQueryOptions<ListItem>
  ): Promise<ListItem[]>;

  count(spec: ListItemSpec): Promise<number>;

  add(listItems: ListItem[]): void;

  remove(id: ListItemId): void;

  removeWhere(specs: ListItemSpec): void;
}

export class ListItemRepositoryHashMap implements IListItemRepository {
  repository: GenericRepositoryHashMap<ListItem>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<ListItem>({});
  }

  async find(spec: ListItemSpec, options: RepositoryQueryOptions<ListItem>) {
    return this.repository.find(spec, options);
  }

  async count(spec: ListItemSpec) {
    return this.repository.count(spec);
  }

  async add(listItems: ListItem[]) {
    this.repository.add(listItems);
  }

  async remove(id: ListItemId) {
    this.repository.remove([{ id }]);
  }

  async removeWhere(specs: ListItemSpec) {
    this.repository.remove(specs);
  }
}

export class ListItemRepositoryFileSystem implements IListItemRepository {
  repository: GenericRepositoryFileSystem<ListItem>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<ListItem>(filePath);
  }

  async find(spec: ListItemSpec, options: RepositoryQueryOptions<ListItem>) {
    return this.repository.find(spec, options);
  }

  async count(spec: ListItemSpec) {
    return this.repository.count(spec);
  }

  async add(listItems: ListItem[]) {
    this.repository.add(listItems);
  }

  async remove(id: ListItemId) {
    this.repository.remove([{ id }]);
  }

  async removeWhere(specs: ListItemSpec) {
    this.repository.remove(specs);
  }
}
