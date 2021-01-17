import { User, UserId } from "../models/make-user";
import { GenericRepositoryQueryOptions } from "../../app/persistence/generic-repository/types";
import { GenericRepositoryHashMap } from "../../app/persistence/generic-repository/generic-repository.hash-map";
import { GenericRepositoryFileSystem } from "../../app/persistence/generic-repository/generic-repository.file-system";

type UserSpec = Partial<User>[];

export interface IUserRepository {
  find(
    spec: UserSpec,
    options?: GenericRepositoryQueryOptions<User>
  ): Promise<User[]>;

  search(
    query: string,
    keys: ("username" | "displayName")[],
    options?: GenericRepositoryQueryOptions<User>
  ): Promise<User[]>;

  add(user: User): void;

  remove(id: UserId): void;

  update(id: UserId, partial: Partial<User>): void;
}

export class UserRepositoryHashMap implements IUserRepository {
  repository: GenericRepositoryHashMap<UserId, User>;

  constructor() {
    this.repository = new GenericRepositoryHashMap<UserId, User>({});
  }

  async find(spec: UserSpec, options: GenericRepositoryQueryOptions<User>) {
    return this.repository.find(spec, options);
  }

  async search(
    query: string,
    keys: ("username" | "displayName")[],
    options?: GenericRepositoryQueryOptions<User>
  ) {
    return this.repository.search<"username" | "displayName">(
      query,
      keys,
      options
    );
  }

  async add(user: User) {
    this.repository.add([user]);
  }

  async remove(id: UserId) {
    this.repository.remove([{ id }]);
  }

  async update(id: UserId, partial: Partial<User>) {
    this.repository.update(id, partial);
  }
}

export class UserRepositoryFileSystem implements IUserRepository {
  repository: GenericRepositoryFileSystem<UserId, User>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<UserId, User>(filePath);
  }

  async find(spec: UserSpec, options: GenericRepositoryQueryOptions<User>) {
    return this.repository.find(spec, options);
  }

  async search(
    query: string,
    keys: (keyof User)[],
    options?: GenericRepositoryQueryOptions<User>
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
    this.repository.update(id, partial);
  }
}
