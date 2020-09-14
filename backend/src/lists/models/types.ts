import {Id, IsValidId, MakeId} from '../../id/types';

export type List = {
  id: Id;
  userIds: Id[];
  title: string;
  description: string;
};

export type ListItem = {
  id: Id;
  listId: Id;
  tmdbMediaId: string;
  tmdbMediaType: 'movie' | 'tv';
};

export type MakeList = (_: Partial<List>) => Readonly<List>;
export type MakeListItem = (_: Partial<ListItem>) => Readonly<ListItem>;

type Dependencies = {
  makeId: MakeId;
  isValidId: IsValidId;
};
export type BuildMakeList = (_: Dependencies) => MakeList;
export type BuildMakeListItem = (_: Dependencies) => MakeListItem;
