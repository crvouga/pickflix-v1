import { User } from "../../users/models";
import { AutoList } from "./make-auto-list";
import { List } from "./make-list";
import { ListItem } from "./make-list-item";

type TmdbData = any;

export type ListItemAggergate = {
  listItem: ListItem;
  tmdbData: TmdbData;
};

export type ListAggergate<T extends List | AutoList> = {
  listItems: ListItemAggergate[];
  listItemCount: number;
  list: T;
  owner: User;
  includeListItemWithMediaId?: ListItem;
};
