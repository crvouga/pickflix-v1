import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/types";

const name = "removeListItemsForm";

/* 

*/

export type RemoveListItemsFormState = {
  listItemIds: { [key: string]: string };
  isSelecting: boolean;
};

/* 

*/

const initialState: RemoveListItemsFormState = {
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
  setListItemIds: createAction<{ [id: string]: string }>(
    name + "/SET_LIST_ITEM_IDS"
  ),
  setIsSelecting: createAction<boolean>(name + "/SET_IS_SELECTING"),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setIsSelecting.toString()]: (state, action) => {
    state.isSelecting = action.payload;
  },
  [actions.setListItemIds.toString()]: (state, action) => {
    state.listItemIds = action.payload;
  },
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
  const { listItemIds } = slice;
  const { setListItemIds } = actions;

  const toggle = (listItemId: string) => {
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
    toggle,
  };
};
