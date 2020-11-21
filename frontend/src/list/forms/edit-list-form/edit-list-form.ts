import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createPayloadReducer } from "../../../app/redux/utils";

const name = "editListForm";

/* 


*/

export type EditListFormState = {
  title?: string;
  description?: string;
  listId?: string;
};

const initialState: EditListFormState = {};

/* 


*/

const actions = {
  setTitle: createAction<string | undefined>(name + "/SET_TITLE"),
  setDescription: createAction<string | undefined>(name + "/SET_DESCRIPTION"),
  setListId: createAction<string | undefined>(name + "/SET_LIST_ID"),
};

/* 


*/

const slice = (state: AppState) => state.editListForm;
const selectors = {
  slice,
};

/* 


*/

const reducer = createReducer(initialState, {
  [actions.setListId.toString()]: createPayloadReducer("listId"),
  [actions.setTitle.toString()]: createPayloadReducer("title"),
  [actions.setDescription.toString()]: createPayloadReducer("description"),
});

export const editListForm = {
  reducer,
  selectors,
  actions,
};

/*


*/

export const useEditListFormState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(editListForm.actions, dispatch);
  const slice = useSelector(editListForm.selectors.slice);
  return {
    ...actions,
    ...slice,
  };
};
