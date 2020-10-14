import {Id, MakeId} from '../../id/types';
import {TmdbMedia} from '../../media/models/types';

export type Dependencies = {
  makeId: MakeId;
  isValidId: (id: string) => false | Id;
};

export type Visibility = 'public' | 'private';

export type List = {
  type: 'list';
  id: Id;
  ownerId: Id;
  title: string;
  description: string;
  createdAt: number;
  visibility: Visibility;
  listItems?: ListItem[];
};

export type ListItem = {
  type: 'listItem';
  id: Id;
  listId: Id;
  createdAt: number;
} & TmdbMedia;

export type AutoListTitle = 'Watch Next';
export enum AutoListTitleEnum {
  WatchNext = 'Watch Next',
}

export type AutoList = {
  type: 'autoList';
  id: Id;
  ownerId: Id;
  title: AutoListTitle;
  createdAt: number;
};

type TmdbData = any;

export type ListItemAggregate = {
  type: 'listItemAggregate';
  listItem: ListItem;
  data: TmdbData;
};

export type ListAggregate = {
  type: 'listAggregate';
  list: List | AutoList;
  listItems: ListItemAggregate[];
  listItemCount: number;
};
