import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/types";
import { MediaId } from "../../../tmdb/types";

const name = "createListForm";

/* 

*/

export type CreateListFormState = {
  mediaIds: MediaId[];
  title: string;
};

/* 

*/

const initialState: CreateListFormState = {
  mediaIds: [],
  title: "",
};

/* 

*/

const slice = (state: AppState) => state.createListForm;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setMediaIds: createAction<MediaId[]>(name + "/SET_MEDIA_IDS"),
  setTitle: createAction<string>(name + "/SET_TITLE"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setTitle.toString()]: (state, action) => {
    state.title = action.payload;
  },
  [actions.setMediaIds.toString()]: (state, action) => {
    state.mediaIds = action.payload;
  },
});

/* 

*/

export const createListForm = {
  actions,
  reducer,
  selectors,
};

export const useCreateListFormState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(createListForm.actions, dispatch);
  const slice = useSelector(createListForm.selectors.slice);

  return {
    ...slice,
    ...actions,
  };
};
