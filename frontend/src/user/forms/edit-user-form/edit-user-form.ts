import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createPayloadReducer } from "../../../app/redux/utils";
import { User } from "../../query";

const name: "editUserForm" = "editUserForm";

/* 


*/

export type EditUserFormState = {
  user: Partial<User>;
};

/* 


*/

const initialState: EditUserFormState = {
  user: {
    displayName: "",
    username: "",
    emailAddress: "",
  },
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
  setUser: createAction<Partial<User>>(name + "/SET_USER"),
};

/* 


*/

const reducer = createReducer(initialState, {
  [actions.setUser.toString()]: createPayloadReducer("user"),
});

/* 


*/

export const editUserForm = {
  actions,
  reducer,
  selectors,
};

/* 


*/

export const useEditUserFormState = () => {
  const slice = useSelector(editUserForm.selectors.slice);
  const dispatch = useDispatch();
  const actions = bindActionCreators(editUserForm.actions, dispatch);
  return {
    ...actions,
    ...slice,
  };
};
