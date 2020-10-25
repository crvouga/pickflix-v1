import { BackendAPI } from "../../backend-api";
import { TmdbMediaType } from "../../tmdb/types";
import { List, ListItem } from "./types";

/* 


*/

export type PostListItemParams = {
  listId: string;
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export const postListItem = async ({
  listId,
  tmdbMediaId,
  tmdbMediaType,
}: PostListItemParams) => {
  const { data } = await BackendAPI.post<ListItem>(
    `/api/lists/${listId}/list-items`,
    {
      tmdbMediaId,
      tmdbMediaType,
    }
  );
  return data;
};

/* 


*/

export type PostListParams = {
  title: string;
  description: string;
};

export const postList = async ({ title, description }: PostListParams) => {
  const { data } = await BackendAPI.post<List>(`/api/lists/`, {
    title,
    description,
  });
  return data;
};

/* 


*/

export type DeleteListItemsParams = {
  listId: string;
  listItemIds: string[];
};

export const deleteListItems = async ({
  listId,
  listItemIds,
}: DeleteListItemsParams) => {
  return await BackendAPI.delete<void>(`/api/lists/${listId}/list-items`, {
    data: listItemIds,
  });
};

/* 


*/

export type DeleteListParams = {
  listId: string;
};

export const deleteList = async ({ listId }: DeleteListParams) => {
  const { data } = await BackendAPI.delete<{}>(`/api/lists/${listId}`);
  return data;
};

/* 


*/

export type PatchListParams = {
  title: string;
  description: string;
  listId: string;
};

export const patchList = async ({
  listId,
  title,
  description,
}: PatchListParams) => {
  const { data } = await BackendAPI.patch<List>(`/api/lists/${listId}`, {
    title,
    description,
  });
  return data;
};

/* 


*/
