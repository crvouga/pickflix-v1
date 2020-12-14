import {
  bindActionCreators,
  createAction,
  createReducer,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/redux/types";
import { IDiscoverTag } from "../query/types";

const name = "discoverTags";

/*

*/

export type DiscoverTagsState = {
  tagsById: { [id: string]: IDiscoverTag };
};

const initialState: DiscoverTagsState = {
  tagsById: {},
};

/* 

*/

const slice = (state: AppState) => state.discoverTags;
const tagsById = createSelector([slice], (slice) => slice.tagsById);
const selectors = {
  slice,
  tagsById,
};

/* 

*/

const actions = {
  setTagsById: createAction<{ [id: string]: IDiscoverTag }>(
    name + "/SET_TAGS_BY_ID"
  ),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setTagsById.toString()]: (state, action) => {
    state.tagsById = action.payload;
  },
});

/* 

*/

export const discoverTags = {
  selectors,
  actions,
  reducer,
};

/* 

*/

export const useDiscoverTagsState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(discoverTags.actions, dispatch);
  const slice = useSelector(discoverTags.selectors.slice);
  return {
    ...actions,
    ...slice,
  };
};
