import { GenericRepositoryFileSystem } from "../../app/persistence/generic-repository/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/persistence/generic-repository/generic-repository.hash-map";
import { GenericRepositoryQueryOptions } from "../../app/persistence/generic-repository/types";
import { ListItemId } from "../models";
import { ListItem } from "../models/make-list-item";

export interface IListItemRepository {
  find(
    spec: Partial<ListItem>[],
    options?: GenericRepositoryQueryOptions<ListItem>
  ): Promise<ListItem[]>;

  count(spec: Partial<ListItem>[]): Promise<number>;

  add(listItems: ListItem[]): void;

  remove(id: ListItemId): void;

  removeWhere(specs: Partial<ListItem>[]): void;
}

export class ListItemRepositoryHashMap implements IListItemRepository {
  repository: GenericRepositoryHashMap<ListItemId, ListItem>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<ListItemId, ListItem>({});
  }

  async find(
    spec: Partial<ListItem>[],
    options: GenericRepositoryQueryOptions<ListItem>
  ) {
    return await this.repository.find(spec, options);
  }

  async count(spec: Partial<ListItem>[]) {
    return this.repository.count(spec);
  }

  async add(listItems: ListItem[]) {
    await this.repository.add(listItems);
  }

  async remove(id: ListItemId) {
    await this.repository.remove([{ id }]);
  }

  async removeWhere(specs: Partial<ListItem>[]) {
    await this.repository.remove(specs);
  }
}

export class ListItemRepositoryFileSystem implements IListItemRepository {
  repository: GenericRepositoryFileSystem<ListItemId, ListItem>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<ListItemId, ListItem>(
      filePath
    );
  }

  async find(
    spec: Partial<ListItem>[],
    options: GenericRepositoryQueryOptions<ListItem>
  ) {
    return await this.repository.find(spec, options);
  }

  async count(spec: Partial<ListItem>[]) {
    return this.repository.count(spec);
  }

  async add(listItems: ListItem[]) {
    await this.repository.add(listItems);
  }

  async remove(id: ListItemId) {
    await this.repository.remove([{ id }]);
  }

  async removeWhere(specs: Partial<ListItem>[]) {
    await this.repository.remove(specs);
  }
}
