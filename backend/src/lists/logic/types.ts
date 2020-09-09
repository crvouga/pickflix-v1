import {Id} from '../../id/types';
import {ListStorage, ListItemStorage} from '../storage/types';
import {List, ListItem} from '../models/types';

export interface ListLogic {
  createList: (_: Partial<List>) => Promise<List>;
  deleteList: (_: {userId: Id; listId: Id}) => Promise<boolean>;
  // leaveList: (_: {listId: Id; userId: Id}) => Promise<boolean>;
  // joinList: (_: {listId: Id; userId: Id}) => Promise<boolean>;
  getListsByUser: (_: {userId: Id}) => Promise<List[]>;
  addItem: (
    _: Pick<ListItem, 'tmdbId' | 'tmdbMediaType' | 'listId'>
  ) => Promise<ListItem>;
  removeItem: (_: {id: Id}) => Promise<boolean>;
  getItems: (_: {listId: Id}) => Promise<ListItem[]>;
  getList: (_: {listId: Id}) => Promise<List | undefined>;
}

export type BuildListLogic = (_: {
  ListStorage: ListStorage;
  ListItemStorage: ListItemStorage;
}) => ListLogic;
