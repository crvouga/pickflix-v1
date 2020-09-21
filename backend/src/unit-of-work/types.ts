import {Id} from '../id/types';
import {
  IListRepository,
  IListItemRepository,
} from '../lists/repositories/types';

export interface IUnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;

  Lists: IListRepository;
  ListItems: IListItemRepository;
}

export interface Identifiable {
  id: Id;
}

export interface IRepository<T extends Identifiable> {
  find: (_: Partial<T>) => Promise<T[]>;
  add: (_: T[]) => Promise<T[]>;
  remove: (_: Array<Partial<T> & Pick<T, 'id'>>) => Promise<boolean>;
  update: (_: Array<Partial<T> & Pick<T, 'id'>>) => Promise<T[]>;
  count: (_: Partial<T>) => Promise<number>;
}
