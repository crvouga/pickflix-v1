import {ILikeRepository} from '../likes/repositories/types';
import {
  IAutoListRepository,
  IListItemRepository,
  IListRepository,
} from '../lists/repositories/types';
import {IUserRepository} from '../users/repositories/types';

export interface IUnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;

  Lists: IListRepository;
  ListItems: IListItemRepository;
  Users: IUserRepository;
  Likes: ILikeRepository;
  AutoLists: IAutoListRepository;
}

export interface Identifiable {
  id: string;
}

export interface IRepository<T extends Identifiable> {
  find: (_: Partial<T>) => Promise<T[]>;
  add: (_: T[]) => Promise<T[]>;
  remove: (_: Array<Partial<T> & Pick<T, 'id'>>) => Promise<boolean>;
  update: (_: Array<Partial<T> & Pick<T, 'id'>>) => Promise<T[]>;
  count: (_: Partial<T>) => Promise<number>;
}
