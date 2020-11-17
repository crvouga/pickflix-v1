import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/types";

const name = "deleteListForm";

/* 

*/

export type DeleteListFormState = {
  listId?: string;
};

/* 

*/

const initialState: DeleteListFormState = {
  listId: undefined,
};

/* 

*/

const slice = (state: AppState) => state.deleteListForm;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setListId: createAction<string | undefined>(name + "/SET_LIST_ID"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setListId.toString()]: (state, action) => {
    state.listId = action.payload;
  },
});

/* 

*/

export const deleteListForm = {
  actions,
  reducer,
  selectors,
};

export const useDeleteListFormState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(deleteListForm.actions, dispatch);
  const slice = useSelector(deleteListForm.selectors.slice);

  return {
    ...slice,
    ...actions,
  };
};
