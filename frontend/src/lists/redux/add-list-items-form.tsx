import { createAction, createReducer } from "@reduxjs/toolkit";
import { TmdbMediaType } from "../../tmdb/types";

const name = "addListForm";

/* 

*/

export type ListItemInfo = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export type AddListItemsFormState = {
  listItemInfos: ListItemInfo[];
};

/* 

*/

export const initialState: AddListItemsFormState = {
  listItemInfos: [],
};

/* 

*/

const actions = {
  setListItemInfos: createAction<ListItemInfo[]>(`${name}/SET_LIST_ITEM_INFOS`),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setListItemInfos.toString()]: (state, action) => {
    state.listItemInfos = action.payload;
  },
});

/* 

*/

export const addListItemsForm = {
  actions,
  reducer,
};
