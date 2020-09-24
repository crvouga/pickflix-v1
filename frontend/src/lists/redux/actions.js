import { createAction } from "@reduxjs/toolkit";

export const createList = createAction("[lists] CREATE");
export const deleteList = createAction("[lists] DELETE");
export const addListItem = createAction("[lists] ADD_LIST_ITEM");
export const deleteListItem = createAction("[lists] DELETE_LIST_ITEM");
export const addListItemAutoList = createAction(
  "[lists] ADD_LIST_ITEM_AUTO_LIST"
);
export const deleteListItemAutoList = createAction(
  "[lists] ADD_LIST_ITEM_AUTO_LIST"
);
export const fetch = createAction("[lists] FETCH");
