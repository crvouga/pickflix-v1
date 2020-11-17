import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../../redux/types";

const name = "editListForm";

type Deletions = { [id: string]: string };

export type EditListFormState = {
  title: string;
  description: string;
  deletions: Deletions;
};

const initialState = {
  title: "",
  description: "",
  deletions: {},
};

const actions = {
  setTitle: createAction<string>(name + "/SET_TITLE"),
  setDescription: createAction<string>(name + "/SET_DESCRIPTION"),
  setDeletions: createAction<Deletions>(name + "/SET_DELETIONS"),
  reset: createAction(name + "/RESET"),
};

const slice = (state: AppState) => state.editListForm;

const selectors = {
  slice,
  title: createSelector([slice], (slice) => slice.title),
  description: createSelector([slice], (slice) => slice.description),
  deletions: createSelector([slice], (slice) => slice.deletions),
};

const reducer = createReducer(initialState, {
  [actions.setTitle.toString()]: (state, action) => {
    state.title = action.payload;
  },
  [actions.setDescription.toString()]: (state, action) => {
    state.description = action.payload;
  },
  [actions.setDeletions.toString()]: (state, action) => {
    state.deletions = action.payload;
  },
  [actions.reset.toString()]: (state, action) => {
    return initialState;
  },
});

export const editListForm = {
  reducer,
  selectors,
  actions,
};
