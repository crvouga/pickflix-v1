import { createAction } from "@reduxjs/toolkit";
import { TmdbMediaType } from "../../tmdb/types";

export const setListItemInfos = createAction<{
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
}>("[lists] SET_LIST_ITEM_INFOS");

export const addList = createAction<{
  title: string;
}>("[lists] ADD_LIST");

export const editList = createAction<{
  title: string;
  description: string;
  listId: string;
  listItemIds: string[];
}>("[lists] EDIT_LIST");

export const deleteList = createAction<string>("[lists] DELETE_LIST");

export const addListItem = createAction<{
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
  listId: string;
}>("[lists] ADD_LIST_ITEM");

export const deleteListItem = createAction<{
  listId: string;
  listItemIds: string[];
}>("[lists] DELETE_LIST_ITEM");
