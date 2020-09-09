import {Id} from '../../id/types';
import {List, ListItem} from '../models/types';

export interface ListStorage {
  add: (_: List) => Promise<List>;
  remove: (_: Id) => Promise<boolean>;
  findWhereEquals: (_: Partial<List>) => Promise<List[]>;
  findByUserId: (_: Id) => Promise<List[]>;
}

export interface ListItemStorage {
  add: (_: ListItem) => Promise<ListItem>;
  remove: (_: Id) => Promise<boolean>;
  findWhereEquals: (_: Partial<ListItem>) => Promise<ListItem[]>;
}
