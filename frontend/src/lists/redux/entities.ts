import { schema } from "normalizr";
import { IById } from "./normalize";

export enum EntityKeys {
  lists = "lists",
  listItems = "listItems",
}

export interface IListItem {
  [key: string]: any;
}

export interface IList {
  [key: string]: any;
  listItems: IListItem[];
}

export type Entities = {
  [EntityKeys.lists]: IById<IList>;
  [EntityKeys.listItems]: IById<IListItem>;
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
