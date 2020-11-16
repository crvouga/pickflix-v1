import {
  createAction,
  createReducer,
  createSelector,
  bindActionCreators,
} from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { TmdbMediaType } from "../../tmdb/types";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const name = "addListForm";

/* 

*/

export type ItemInfo = {
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export type AddListFormState = {
  itemInfos: ItemInfo[];
  title: string;
};

/* 

*/

const initialState: AddListFormState = {
  itemInfos: [],
  title: "",
};

/* 

*/

const slice = (state: AppState) => state.addListForm;
const selectors = {
  slice,
  itemInfos: createSelector([slice], (slice) => slice.itemInfos),
  title: createSelector([slice], (slice) => slice.title),
};

/* 

*/

const actions = {
  setItemInfos: createAction<ItemInfo[]>(name + "/SET_LIST_ITEM_INFOS"),
  setTitle: createAction<string>(name + "/SET_LIST_TITLE"),
  reset: createAction(name + "/RESET"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.reset.toString()]: () => initialState,
  [actions.setTitle.toString()]: (state, action) => {
    state.title = action.payload;
  },
  [actions.setItemInfos.toString()]: (state, action) => {
    state.itemInfos = action.payload;
  },
});

/* 

*/

export const addListForm = {
  actions,
  reducer,
  selectors,
};

export const useAddListFormState = () => {
  const dispatch = useDispatch();
  const slice = useSelector(addListForm.selectors.slice);
  const actions = bindActionCreators(addListForm.actions, dispatch);
  const [errors, setErrors] = useState<{ key: string; message: string }[]>([]);
  const reset = () => {
    setErrors([]);
    actions.reset();
  };
  return {
    ...slice,
    ...actions,
    errors,
    setErrors,
    reset,
  };
};
