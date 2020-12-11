import { PaginationOptions } from "../../pagination";

export interface Identifiable<T> {
  id: T;
}

export type OrderByOptions<T> = [keyof T, "ascend" | "descend"][];

export type GenericRepositoryQueryOptions<T> = {
  orderBy?: OrderByOptions<T>;
  pagination?: PaginationOptions;
};

export type GenericRepositoryQuerySpec<T> = Partial<T>[];

export interface IGenericRepository<I, T extends Identifiable<I>> {
  find: (
    spec: GenericRepositoryQuerySpec<T>,
    options?: GenericRepositoryQueryOptions<T>
  ) => Promise<T[]>;

  count: (spec: GenericRepositoryQuerySpec<T>) => Promise<number>;

  search: (
    query: string,
    keys: (keyof T)[],
    options?: GenericRepositoryQueryOptions<T>
  ) => Promise<T[]>;

  add: (entities: T[]) => void;

  remove: (spec: GenericRepositoryQuerySpec<T>) => void;

  update: (id: I, entity: T) => void;
}
