import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { TmdbMediaType } from "../../tmdb/types";

const name = "addListItemForm";

/* 

*/

export type ItemInfo = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export type AddListItemFormState = {
  itemInfos: ItemInfo[];
};

/* 

*/

const initialState: AddListItemFormState = {
  itemInfos: [],
};

/* 

*/

const slice = (state: AppState) => state.addListItemForm;
const selectors = {
  slice,
  itemInfos: createSelector([slice], (slice) => slice.itemInfos),
};

/* 

*/

const actions = {
  setItemInfos: createAction<ItemInfo[]>(name + "/SET_LIST_ITEM_INFOS"),
  reset: createAction(name + "/RESET"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.reset.toString()]: () => initialState,
  [actions.setItemInfos.toString()]: (state, action) => {
    state.itemInfos = action.payload;
  },
});

/* 

*/

export const addListItemForm = {
  actions,
  reducer,
  selectors,
};
