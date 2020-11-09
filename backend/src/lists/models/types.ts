import { User } from "../../users/models";
import { ListItem } from "./make-list-item";
import { List } from "./make-list";
import { AutoList } from "./make-auto-list";

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
};
