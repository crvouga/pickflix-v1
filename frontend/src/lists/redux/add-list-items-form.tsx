import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
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

const initialState: AddListItemsFormState = {
  listItemInfos: [],
};

/* 

*/

const slice = (state: AppState) => state.addListItemsForm;
const listItemInfos = createSelector([slice], (slice) => slice.listItemInfos);
const selectors = {
  listItemInfos,
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
