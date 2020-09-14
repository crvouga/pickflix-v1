import {Id} from '../../id/types';
import {List, ListItem} from '../models/types';

export interface ListStorage {
  add: (_: List) => Promise<List>;
  update: (_: List) => Promise<List>;
  remove: (_: Id) => Promise<boolean>;
  findWhereEquals: (_: Partial<List>) => Promise<List[]>;
  findById: (_: Id) => Promise<List | undefined>;
  findByUserId: (_: Id) => Promise<List[]>;
  findByTmdbId: (_: string) => Promise<List[]>;
  addListItem: (_: ListItem) => Promise<ListItem>;
  removeListItem: (_: Id) => Promise<boolean>;
  findItemWhereEquals: (_: Partial<ListItem>) => Promise<ListItem[]>;
  findIntersections: (_: {
    listIds: Id[];
    tmdbIds: string[];
  }) => Promise<{listId: Id; tmdbId: string}[]>;
  insertListItems: (_: ListItem[]) => Promise<ListItem[]>;
  deleteListItems: (_: Partial<ListItem>[]) => Promise<boolean>;
}
