import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/redux/types";

const name: "discoverPageUi" = "discoverPageUi";

/*

*/

export type DiscoverTagsTabValue = "Saved" | "History";
export const discoverTagsTabOrder: ["Saved", "History"] = ["Saved", "History"];

export type DiscoverPageUiState = {
  discoverTagsTabValue: DiscoverTagsTabValue;
};

const initialState: DiscoverPageUiState = {
  discoverTagsTabValue: "Saved",
};

/* 

*/

const slice = (state: AppState) => state[name];
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setDiscoverTagsTabValue: createAction<DiscoverTagsTabValue>(
    name + "/SET_DISCOVER_TAGS_TAB_VALUE"
  ),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setDiscoverTagsTabValue.toString()]: (state, action) => {
    state.discoverTagsTabValue = action.payload;
  },
});

/* 

*/

export const discoverPageUi = {
  selectors,
  actions,
  reducer,
};

/* 

*/

export const useDiscoverPageUi = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(discoverPageUi.actions, dispatch);
  const slice = useSelector(discoverPageUi.selectors.slice);
  return {
    ...slice,
    ...actions,
    discoverTagsTabOrder,
  };
};
