import { schema } from "../../redux/query/normalize";

export enum EntityKeys {
  lists = "lists",
  listItems = "listItems",
}

export type IListItem = {
  id: string;
  tmdbMediaId: string;
  tmdbMediaType: "movie" | "person";
  listId: string;
  tmdbData: {
    id: string;
    posterPath: string;
    title: string;
  };
};

export type IList = {
  id: string;
  title: string;
  description: string;
  listItemCount: number;
  listItems: IListItem[];
  isAutoCreated: boolean;
  createdAt: string;
  visibility: "public" | "private";
};

export type Entities = {
  [EntityKeys.lists]: { [id: string]: IList };
  [EntityKeys.listItems]: { [id: string]: IListItem };
};

export const listItemSchema: schema.Entity<IListItem> = new schema.Entity(
  EntityKeys.listItems
);

export const listSchema: schema.Entity<IList> = new schema.Entity(
  EntityKeys.lists,
  {
    listItems: new schema.Array(listItemSchema),
  }
);
