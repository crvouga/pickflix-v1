import { createAction } from "@reduxjs/toolkit";

export const _setState = createAction("[lists] SET_STATE");
export const setError = (error) => _setState({ error });
export const setLists = (lists) => _setState({ lists });
export const setList = (list) => _setState({ list });
export const setListItems = (listItems) => _setState({ listItems });
export const setStatus = (status) => _setState({ status });
//
export const createList = createAction("[lists] CREATE");
export const deleteList = createAction("[lists] DELETE");
//
export const addListItem = createAction("[lists] ADD_LIST_ITEM");
export const deleteListItem = createAction("[lists] DELETE_LIST_ITEM");
//
export const fetch = createAction("[lists] FETCH");
