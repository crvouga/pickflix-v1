import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/redux/types";
import { QueryKey } from "react-query";
import { createPayloadReducer } from "../../../app/redux/utils";

const name = "removeListItemsForm";

/* 

*/

export type RemoveListItemsFormState = {
  listItemIds: { [key: string]: string };
  listId?: string;
  isSelecting: boolean;
};

/* 

*/

const initialState: RemoveListItemsFormState = {
  listId: undefined,
  listItemIds: {},
  isSelecting: false,
};

/* 

*/

const slice = (state: AppState) => state.removeListItemsForm;
const selectors = {
  slice,
};

/* 

*/

const actions = {
  setListId: createAction<string | undefined>(name + "/SET_LIST_ID"),
  setListItemIds: createAction<{ [id: string]: string }>(
    name + "/SET_LIST_ITEM_IDS"
  ),
  setIsSelecting: createAction<boolean>(name + "/SET_IS_SELECTING"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setListId.toString()]: createPayloadReducer("listId"),
  [actions.setIsSelecting.toString()]: createPayloadReducer("isSelecting"),
  [actions.setListItemIds.toString()]: createPayloadReducer("listItemIds"),
});

/* 

*/

export const removeListItemsForm = {
  actions,
  reducer,
  selectors,
  name,
};

export const useRemoveListItemsFormState = () => {
  const slice = useSelector(removeListItemsForm.selectors.slice);

  const dispatch = useDispatch();
  const actions = bindActionCreators(removeListItemsForm.actions, dispatch);
  const { listItemIds, isSelecting } = slice;
  const { setListItemIds, setIsSelecting } = actions;

  const toggleIsSelecting = () => {
    setIsSelecting(!isSelecting);
  };

  const toggleDeletion = (listItemId: string) => {
    if (listItemId in listItemIds) {
      const { [listItemId]: _, ...restOfIds } = listItemIds;
      setListItemIds(restOfIds);
    } else {
      setListItemIds({
        [listItemId]: listItemId,
        ...listItemIds,
      });
    }
  };

  return {
    ...slice,
    ...actions,
    toggleDeletion,
    toggleIsSelecting,
  };
};
