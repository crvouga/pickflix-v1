import { createAction } from "@reduxjs/toolkit";

export const setLists = createAction("[lists] SET_LISTS");
//
export const createList = createAction("[lists] CREATE_LIST", (name) => ({
  payload: name,
}));

export const deleteList = createAction("[lists] DELETE_LIST", (name) => ({
  payload: { name },
}));

export const addToList = createAction(
  "[lists] ADD_TO_LIST",
  (name, mediaId) => ({ payload: { name, mediaId } })
);

export const removeFromList = createAction(
  "[lists] REMOVE_FROM_LIST",
  (name, mediaId) => ({ name, mediaId })
);
