import {
  bindActionCreators,
  createAction,
  createReducer,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createPayloadReducer } from "../../../app/redux/utils";
import { MediaId } from "../../../media/tmdb/types";

const name: "toggleForm" = "toggleForm";

/* 


*/

export type ToggleFormState = {
  mediaId?: MediaId;
  listIds: { [listId: string]: string };
};

/* 


*/

const initialState: ToggleFormState = {
  mediaId: undefined,
  listIds: {},
};

/* 


*/

const slice = (state: AppState) => state[name];

const selectors = {
  slice,
  mediaId: createSelector([slice], (slice) => slice.mediaId),
  listIds: createSelector([slice], (slice) => slice.listIds),
};

/* 


*/

const actions = {
  setMediaId: createAction<MediaId | undefined>(name + "/SET_MEDIA_ID"),
  setListIds: createAction<{ [listId: string]: string }>(
    name + "/SET_LIST_IDS"
  ),
  toggle: createAction(
    name + "/TOGGLE",
    ({ listId, mediaId }: { mediaId: MediaId; listId: string }) => ({
      payload: {
        listId,
        mediaId,
      },
    })
  ),
};

/* 


*/

const reducer = createReducer(initialState, {
  [actions.setMediaId.toString()]: createPayloadReducer("mediaId"),
  [actions.setListIds.toString()]: createPayloadReducer("listIds"),
});

/* 


*/

export const toggleForm = {
  actions,
  reducer,
  selectors,
  name,
};

/* 


*/

export const useToggleFormState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(toggleForm.actions, dispatch);
  const mediaId = useSelector(toggleForm.selectors.mediaId);
  const listIds = useSelector(toggleForm.selectors.listIds);

  return {
    ...actions,
    listIds,
    mediaId,
  };
};
