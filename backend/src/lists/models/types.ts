import { User } from "../../users/models";
import { AutoList } from "./make-auto-list";
import { List } from "./make-list";
import { ListItem } from "./make-list-item";

type TmdbData = any;

export type ListItemAggergation = {
  listItem: ListItem;
  tmdbData: TmdbData;
};

export type ListAggergation = {
  listItems: ListItemAggergation[];
  listItemCount: number;
  list: List;
  owner: User;
  editors: User[];
};

export type AutoListAggergation = {
  listItems: ListItemAggergation[];
  listItemCount: number;
  autoList: AutoList;
  owner: User;
};
