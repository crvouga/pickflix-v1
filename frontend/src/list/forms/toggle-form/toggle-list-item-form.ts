import {
  bindActionCreators,
  createAction,
  createReducer,
  createSelector,
} from "@reduxjs/toolkit";
import { equals } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { createPayloadReducer } from "../../../app/redux/utils";
import { MediaId } from "../../../media/tmdb/types";
import { ToggleListItemFormProps } from "./ToggleListItemForm";
import { ListAggergation, AutoListAggergation } from "../../query";

const name: "toggleForm" = "toggleForm";

/* 


*/

export type ToggleFormState = {
  markedListIds: { [listId: string]: string };
};

/* 


*/

const initialState: ToggleFormState = {
  markedListIds: {},
};

/* 


*/

const slice = (state: AppState) => state[name];
const selectors = {
  slice,
  markedListIds: createSelector([slice], (slice) => slice.markedListIds),
};

/* 


*/

const actions = {
  setMarkedListIds: createAction<{ [listId: string]: string }>(
    name + "/SET_MARKED_LIST_IDS"
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
  [actions.setMarkedListIds.toString()]: createPayloadReducer("markedListIds"),
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

export const toInitialMarkedListIds = ({
  mediaId,
  autoLists,
  lists,
}: {
  lists: ListAggergation[];
  autoLists: AutoListAggergation[];
  mediaId: MediaId;
}): { [listId: string]: string } => {
  return {};
};

/* 


*/

export const useToggleFormState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(toggleForm.actions, dispatch);

  const markedListIds = useSelector(toggleForm.selectors.markedListIds);

  return {
    ...actions,
    markedListIds,
  };
};
