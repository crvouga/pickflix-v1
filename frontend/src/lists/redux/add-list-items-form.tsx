import { createAction, createReducer } from "@reduxjs/toolkit";
import { TmdbMediaType } from "../../tmdb/types";

const name = "addListItemsForm";

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

export const selectors = {
  listItemInfos: (state: { [name]: AddListItemsFormState }) =>
    state[name].listItemInfos,
};

/* 

*/

const actions = {
  reset: createAction(`${name}/RESET`),
  setListItemInfos: createAction<ListItemInfo[]>(`${name}/SET_LIST_ITEM_INFOS`),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.reset.toString()]: (state, action) => {
    return initialState;
  },
  [actions.setListItemInfos.toString()]: (state, action) => {
    state.listItemInfos = action.payload;
  },
});

/* 

*/

export const addListItemsForm = {
  actions,
  reducer,
  selectors,
};
