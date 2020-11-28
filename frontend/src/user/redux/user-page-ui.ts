import {
  bindActionCreators,
  createAction,
  createReducer,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/redux/types";
import { createPayloadReducer } from "../../app/redux/utils";

const name: "userPageUi" = "userPageUi";

/*

*/

export type UserPageTabValue = "overview" | "lists" | "reviews";
export const tabOrder: ["overview", "lists", "reviews"] = [
  "overview",
  "lists",
  "reviews",
];

export type UserPageUiState = {
  tabValue: UserPageTabValue;
};

const initialState: UserPageUiState = {
  tabValue: "overview",
};

/* 

*/

const slice = (state: AppState) => state[name];
const selectors = {
  slice,
  tabIndex: createSelector([slice], (slice) =>
    tabOrder.indexOf(slice.tabValue)
  ),
};

/* 

*/

const actions = {
  setTabValue: createAction<UserPageTabValue>(name + "/SET_TAB_VALUE"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setTabValue.toString()]: createPayloadReducer("tabValue"),
});

/* 

*/

export const userPageUi = {
  selectors,
  actions,
  reducer,
};

/* 

*/

export const useUserPageUi = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(userPageUi.actions, dispatch);
  const slice = useSelector(userPageUi.selectors.slice);
  const tabIndex = useSelector(userPageUi.selectors.tabIndex);
  return {
    ...slice,
    ...actions,
    tabIndex,
    tabOrder,
  };
};
