import {Id, MakeId} from '../../id/types';
import {TmdbMedia} from '../../media/models/types';
import {UserId} from '../../users/models/types';

export type Dependencies = {
  makeId: MakeId;
  isValidId: (id: string) => false | Id;
};

export type ListId = Id & {ListId: true};
export type ListItemId = Id & {ListItemId: true};

export type Visibility = 'public' | 'private';

export type List = {
  type: 'list';
  id: ListId;
  ownerId: UserId;
  title: string;
  description: string;
  createdAt: number;
  visibility: Visibility;
  listItems?: ListItem[];
};

export type ListItem = {
  type: 'listItem';
  id: ListItemId;
  userId: UserId;
  listId: ListId;
  createdAt: number;
} & TmdbMedia;

export enum AutoListKeys {
  WatchNext = 'watch-next',
  Liked = 'liked',
}

type AutoListRecordId = Id & {AutoListRecordId: true};

export type AutoListRecord = {
  type: 'AutoListRecord';
  id: AutoListRecordId;
  listId: ListId;
  userId: UserId;
  key: AutoListKeys;
};

export type AutoList = {
  type: 'autoList';
  id: ListId;
  ownerId: UserId;
  title: string;
  key: AutoListKeys;
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
