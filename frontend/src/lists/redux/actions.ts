import { createAction } from "@reduxjs/toolkit";
import { IList, IListItem } from "./entities";

type TmdbInfo = {
  tmdbMediaId: string;
  tmdbMediaType: "movie";
};

export const toggleLiked = createAction<TmdbInfo>("[lists] TOGGLE_LIKED");

export const toggleWatchNext = createAction<TmdbInfo>(
  "[lists] TOGGLE_WATCH_NEXT"
);

export const createList = createAction<
  Partial<IList> & { listItemInfos?: Partial<IListItem>[] }
>("[lists] CREATE_LIST");

export const deleteList = createAction<string>("[lists] DELETE_LIST");

export const editList = createAction<Pick<IList, "id"> & Partial<IList>>(
  "[lists] EDIT_LIST"
);

export const addListItem = createAction<
  TmdbInfo & {
    listId: string;
  }
>("[lists] ADD_LIST_ITEM");

export const deleteListItem = createAction<{
  listId: string;
  listItemIds: string[];
}>("[lists] DELETE_LIST_ITEM");

export const addListItemAutoList = createAction(
  "[lists] ADD_LIST_ITEM_AUTO_LIST"
);
export const deleteListItemAutoList = createAction(
  "[lists] ADD_LIST_ITEM_AUTO_LIST"
);

export const getLists = createAction<{ attempts: number; timeout: number }>(
  "[lists] GET_LISTS"
);
