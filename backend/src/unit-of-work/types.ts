import {
  IAutoListRepository,
  IListItemRepository,
  IListRepository,
} from "../lists/repositories/types";
import {
  IReviewRepository,
  IReviewVoteRepository,
} from "../reviews/repositories/types";
import {
  ICredentialRepository,
  IUserRepository,
} from "../users/repositories/types";

export interface IUnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;

  Lists: IListRepository;
  AutoLists: IAutoListRepository;
  ListItems: IListItemRepository;
  Users: IUserRepository;
  Reviews: IReviewRepository;
  ReviewVotes: IReviewVoteRepository;
  Credentials: ICredentialRepository;
}

export interface Identifiable {
  id: string;
}

type OrderByDirection = "ascend" | "descend";

type OrderBy<T> = [keyof T, OrderByDirection][];

export type FindOptions<T> = {
  orderBy?: OrderBy<T>;
};

export interface IRepository<T extends Identifiable> {
  find: (_: Partial<T>, options?: FindOptions<T>) => Promise<T[]>;
  get: (_: string[]) => Promise<T[]>;
  add: (_: T[]) => Promise<T[]>;
  remove: (_: Partial<T>[]) => Promise<boolean>;
  update: (_: Partial<T> & Pick<T, "id">) => Promise<T>;
  count: (_: Partial<T>) => Promise<number>;
}
