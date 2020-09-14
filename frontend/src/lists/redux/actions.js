import { createAction } from "@reduxjs/toolkit";

export const _setState = createAction("[lists] SET_STATE");
export const setError = (error) => _setState({ error });
export const setLists = (lists) => _setState({ lists });
export const setStatus = (status) => _setState({ status });
//
export const createList = createAction("[lists] CREATE");
export const deleteList = createAction("[lists] DELETE");
//
export const toggleListItemChange = createAction(
  "[lists] TOGGLE_LIST_ITEM_CHANGE"
);
export const submitChanges = createAction("[lists] SUBMIT_CHANGES");
//
export const fetch = createAction("[lists] FETCH");
