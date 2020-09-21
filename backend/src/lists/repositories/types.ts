import {IRepository} from '../../unit-of-work/types';
import {List, ListItem} from '../models/types';

export interface IListRepository extends IRepository<List> {}
export interface IListItemRepository extends IRepository<ListItem> {}
