import { User, UserId } from "../models/make-user";
import { RepositoryQueryOptions } from "../../common/unit-of-work/types";
import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";

export interface IUserRepository {
  find(
    spec: Partial<User>,
    options: RepositoryQueryOptions<User>
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

  constructor(repository: GenericRepositoryHashMap<User>) {
    this.repository = repository;
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

  constructor(repository: GenericRepositoryFileSystem<User>) {
    this.repository = repository;
  }

  async find(partial: Partial<User>, options: RepositoryQueryOptions<User>) {
    return this.repository.find(partial, options);
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
