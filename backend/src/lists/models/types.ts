import {Id, IsValidId, MakeId} from '../../id/types';

export type List = {
  id: Id;
  ownerId: Id;
  title: string;
  description: string;
  createdAt: number;
  isAutoMade: Boolean;
  isPrivate: Boolean;
  listItems?: ListItem[];
};

export type ListItem = {
  id: Id;
  listId: Id;
  tmdbMediaId: string;
  tmdbMediaType: 'movie' | 'tv';
  tmdbData?: any;
  createdAt: number;
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
