import { User, UserId } from "../models/make-user";
import { RepositoryQueryOptions } from "../../app/data-access/types";
import { GenericRepositoryHashMap } from "../../app/data-access/generic-repository.hash-map";
import { GenericRepositoryFileSystem } from "../../app/data-access/generic-repository.file-system";

export interface IUserRepository {
  find(
    spec: Partial<User>,
    options?: RepositoryQueryOptions<User>
  ): Promise<User[]>;

  search(
    query: string,
    keys: (keyof User)[],
    options?: RepositoryQueryOptions<User>
  ): Promise<User[]>;

  add(user: User): void;

  remove(id: UserId): void;

  update(id: UserId, partial: Partial<User>): void;
}

export class UserRepositoryHashMap implements IUserRepository {
  repository: GenericRepositoryHashMap<User>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<User>({});
  }

  async find(spec: Partial<User>, options: RepositoryQueryOptions<User>) {
    return this.repository.find(spec, options);
  }

  async search(
    query: string,
    keys: (keyof User)[],
    options?: RepositoryQueryOptions<User>
  ) {
    return this.repository.search(query, keys, options);
  }

  async add(user: User) {
    this.repository.add([user]);
  }

  async remove(id: UserId) {
    this.repository.remove([{ id }]);
  }

  async update(id: UserId, partial: Partial<User>) {
    this.repository.update({ id, ...partial });
  }
}

export class UserRepositoryFileSystem implements IUserRepository {
  repository: GenericRepositoryFileSystem<User>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<User>(filePath);
  }

  async find(spec: Partial<User>, options: RepositoryQueryOptions<User>) {
    return this.repository.find(spec, options);
  }

  async search(
    query: string,
    keys: (keyof User)[],
    options?: RepositoryQueryOptions<User>
  ) {
    return this.repository.search(query, keys, options);
  }

  async add(user: User) {
    this.repository.add([user]);
  }

  async remove(id: UserId) {
    this.repository.remove([{ id }]);
  }

  async update(id: UserId, partial: Partial<User>) {
    this.repository.update({ id, ...partial });
  }
}
