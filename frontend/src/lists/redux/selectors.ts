import * as R from "ramda";
import { AppState } from "../../redux/types";
import { Entities, EntityKeys, IList, IListItem, listSchema } from "./entities";
import { denormalizeData } from "../../redux/query/normalize";

export const entities = (state: AppState): Entities => ({
  [EntityKeys.listItems]: {},
  [EntityKeys.lists]: {},
  ...state.query.entities,
});

export const listsById = (state: AppState): { [id: string]: IList } =>
  entities(state)?.[EntityKeys.lists] || {};

export const listItemsById = (state: AppState): { [id: string]: IListItem } =>
  entities(state)?.[EntityKeys.listItems] || {};

export const listItems = (listId: string) => (state: AppState) =>
  Object.values(listItemsById(state)).filter((listItem) =>
    R.whereEq({ listId }, listItem)
  );

export const list = (listId: string) => (state: AppState) => {
  return denormalizeData<Entities, IList>(
    listsById(state)[listId],
    listSchema,
    entities(state)
  );
};

export const lists = (state: AppState) => {
  return Object.keys(listsById(state)).map((listId) => list(listId)(state));
};
