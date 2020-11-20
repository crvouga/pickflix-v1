import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/types";
import { MediaId } from "../../../tmdb/types";

const name: "createListWithListItemsForm" = "createListWithListItemsForm";

/* 

*/

export type CreateListWithListItemsFormState = {
  mediaIds: MediaId[];
};

/* 

*/

const initialState: CreateListWithListItemsFormState = {
  mediaIds: [],
};

/* 

*/

const slice = (state: AppState) => state.createListWithListItemsForm;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setMediaIds: createAction<MediaId[]>(name + "/SET_MEDIA_IDS"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setMediaIds.toString()]: (state, action) => {
    state.mediaIds = action.payload;
  },
});

/* 

*/

export const createListWithListItemsForm = {
  actions,
  reducer,
  selectors,
};

export const useFormState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    createListWithListItemsForm.actions,
    dispatch
  );
  const slice = useSelector(createListWithListItemsForm.selectors.slice);

  return {
    ...slice,
    ...actions,
  };
};
