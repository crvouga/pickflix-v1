import { createAction } from "@reduxjs/toolkit";

const createDocument = (keys) => {};

export const _setState = createAction("[lists] SET_STATE");
export const setError = (error) => _setState({ error });
export const setLists = (lists) => _setState({ lists });
export const setStatus = (status) => _setState({ status });

export const createList = createAction("[lists] CREATE_LIST");
export const deleteList = createAction("[lists] DELETE_LIST");

export const addToList = createAction(
  "[lists] ADD_TO_LIST",
  (name, mediaId) => ({ payload: { name, mediaId } })
);

export const removeFromList = createAction(
  "[lists] REMOVE_FROM_LIST",
  (name, mediaId) => ({ name, mediaId })
);

export const fetch = createAction("[lists] FETCH");
