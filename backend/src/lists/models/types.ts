import {Id, IsValidId, MakeId} from '../../id/types';
import {TmdbMedia} from '../../media/models/types';

export type Visibility = 'public' | 'private';

export type List = {
  id: Id;
  ownerId: Id;
  title: string;
  description: string;
  createdAt: number;
  isAutoCreated: Boolean;
  visibility: Visibility;
  listItems?: ListItem[];
};

export type ListItem = {
  id: Id;
  listId: Id;
  createdAt: number;
} & TmdbMedia;

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
