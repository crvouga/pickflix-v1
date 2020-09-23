import {Id, IsValidId, MakeId} from '../../id/types';

export enum AutoListTitle {
  WatchNext = 'Watch Next',
  Liked = 'Liked',
  Favorites = 'Favorites',
}

export type List = {
  id: Id;
  ownerId: Id;
  title: string;
  description: string;
  createdAt: number;
  isAutoCreated: Boolean;
  visibility: 'public' | 'private';
  listItems?: ListItem[];
};

export type ListItem = {
  id: Id;
  listId: Id;
  createdAt: number;
  tmdbMediaId: string;
  tmdbMediaType: 'movie' | 'tv';
  tmdbData?: any;
};

type Dependencies = {
  makeId: MakeId;
  isValidId: IsValidId;
};
export type BuildMakeList = (
  _: Dependencies
) => (_: Partial<List>) => Readonly<List>;

export type BuildMakeListItem = (
  _: Dependencies
) => (_: Partial<ListItem>) => Readonly<ListItem>;
