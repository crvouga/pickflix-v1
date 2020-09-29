import { createAction } from "@reduxjs/toolkit";
import { IList, IListItem } from "./entities";

export const createList = createAction<Partial<IList>>("[lists] CREATE_LIST");

export const deleteList = createAction<string>("[lists] DELETE_LIST");

export const editList = createAction<Partial<IList>>("[lists] EDIT_LIST");

export const addListItem = createAction<Partial<IListItem>>(
  "[lists] ADD_LIST_ITEM"
);

export const deleteListItem = createAction<{
  listId: string;
  listItemIds: string[];
}>("[lists] DELETE_LIST_ITEM");

export const addListItemAutoList = createAction(
  "[lists] ADD_LIST_ITEM_AUTO_LIST"
);
export const deleteListItemAutoList = createAction(
  "[lists] ADD_LIST_ITEM_AUTO_LIST"
);
