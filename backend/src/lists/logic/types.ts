import {Id} from '../../id/types';
import {UserStorage} from '../../users/storage/types';
import {List, ListItem} from '../models/types';
import {ListStorage} from '../storage/types';

export interface ListLogic {
  createList: (_: Partial<List>) => Promise<List>;
  deleteList: (_: {userId: Id; listId: Id}) => Promise<boolean>;
  editList: (_: {
    listId: Id;
    title?: string;
    description?: string;
  }) => Promise<List>;
  // leaveList: (_: {listId: Id; userId: Id}) => Promise<boolean>;
  // joinList: (_: {listId: Id; userId: Id}) => Promise<boolean>;
  getListsByUser: (_: {
    userId: Id;
    tmdbMediaIds?: string[];
  }) => Promise<(List & {tmdbMediaIds?: string[]})[]>;

  getListsBytmdbMediaId: (_: {tmdbMediaId: string}) => Promise<List[]>;
  addListItems: (
    _: Pick<ListItem, 'tmdbMediaId' | 'tmdbMediaType' | 'listId'>[]
  ) => Promise<ListItem[]>;
  removeListItems: (_: Partial<ListItem>[]) => Promise<boolean>;
  getListItems: (_: {listId: Id}) => Promise<ListItem[]>;
  getList: (_: {listId: Id}) => Promise<List | undefined>;
}

export type BuildListLogic = (_: {
  ListStorage: ListStorage;
  UserStorage: UserStorage;
}) => ListLogic;
