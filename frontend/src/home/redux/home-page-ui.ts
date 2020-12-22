import {
  bindActionCreators,
  createAction,
  createReducer,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/redux/types";
import { createPayloadReducer } from "../../app/redux/utils";

const name: "homePageUi" = "homePageUi";

/*

*/

export type HomePageTabValue = "Trending" | "From Lists" | "Recent";
export const tabOrder: ["Trending", "From Lists", "Recent"] = [
  "Trending",
  "From Lists",
  "Recent",
];

export type HomePageUiState = {
  tabValue: HomePageTabValue;
};

const initialState: HomePageUiState = {
  tabValue: "Trending",
};

/* 

*/

const slice = (state: AppState) => state[name];
const selectors = {
  slice,
  tabIndex: createSelector([slice], (slice) =>
    Math.max(0, tabOrder.indexOf(slice.tabValue))
  ),
};

/* 

*/

const actions = {
  setTabValue: createAction<HomePageTabValue>(name + "/SET_TAB_VALUE"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setTabValue.toString()]: createPayloadReducer("tabValue"),
});

/* 

*/

export const homePageUi = {
  selectors,
  actions,
  reducer,
};

/* 

*/

export const useHomePageUi = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(homePageUi.actions, dispatch);
  const slice = useSelector(homePageUi.selectors.slice);
  const tabIndex = useSelector(homePageUi.selectors.tabIndex);
  return {
    ...slice,
    ...actions,
    tabIndex,
    tabOrder,
  };
};
