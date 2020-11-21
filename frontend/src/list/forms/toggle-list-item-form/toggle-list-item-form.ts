import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createPayloadReducer } from "../../../app/redux/utils";
import { MediaId } from "../../../media/tmdb/types";

const name: "toggleListItemForm" = "toggleListItemForm";

/* 


*/

export type ToggleListItemFormState = {
  mediaId?: MediaId;
};

/* 


*/

const initialState: ToggleListItemFormState = {};

/* 


*/

const slice = (state: AppState) => state[name];
const selectors = {
  slice,
};

/* 


*/

const actions = {
  setMediaId: createAction<MediaId | undefined>(name + "/SET_MEDIA_ID"),
};

/* 


*/

const reducer = createReducer(initialState, {
  [actions.setMediaId.toString()]: createPayloadReducer("mediaId"),
});

/* 


*/

export const toggleListItemForm = {
  actions,
  reducer,
  selectors,
  name,
};

/* 


*/

export const useToggleListItemFormState = () => {
  const slice = useSelector(toggleListItemForm.selectors.slice);
  const dispatch = useDispatch();
  const actions = bindActionCreators(toggleListItemForm.actions, dispatch);
  return {
    ...slice,
    ...actions,
  };
};
