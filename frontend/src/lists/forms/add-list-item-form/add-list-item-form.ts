import {
  createAction,
  createReducer,
  createSelector,
  bindActionCreators,
} from "@reduxjs/toolkit";
import { AppState } from "../../../redux/types";
import { TmdbMediaType, MediaId } from "../../../tmdb/types";
import { useDispatch, useSelector } from "react-redux";

const name = "addListItemForm";

/* 

*/

export type AddListItemFormState = {
  listId?: string;
  mediaId?: MediaId;
};

/* 

*/

const initialState: AddListItemFormState = {
  listId: undefined,
  mediaId: undefined,
};

/* 

*/

const slice = (state: AppState) => state.addListItemForm;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setListId: createAction<string | undefined>(name + "/SET_LIST_ID"),
  setMediaId: createAction<MediaId | undefined>(name + "/SET_MEDIA_ID"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setListId.toString()]: (state, action) => {
    state.listId = action.payload;
  },
  [actions.setMediaId.toString()]: (state, action) => {
    state.mediaId = action.payload;
  },
});

/* 

*/

export const addListItemForm = {
  actions,
  reducer,
  selectors,
};

export const useAddListItemFormState = () => {
  const slice = useSelector(addListItemForm.selectors.slice);
  const dispatch = useDispatch();
  const actions = bindActionCreators(addListItemForm.actions, dispatch);
  return {
    ...slice,
    ...actions,
  };
};
