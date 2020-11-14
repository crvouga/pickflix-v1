import { BackendAPI } from "../../backend-api";
import { TmdbMediaType, MediaId } from "../../tmdb/types";
import { AutoListKeys, List, ListItem } from "./types";

/*


*/

export type PostAutoListListItemParams = {
  autoListKey: AutoListKeys;
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export const postAutoListListItem = async ({
  autoListKey,
  tmdbMediaId,
  tmdbMediaType,
}: PostAutoListListItemParams) => {
  const { data } = await BackendAPI.post<ListItem>(
    `/api/auto-lists/${autoListKey}/list-items`,
    {
      tmdbMediaId,
      tmdbMediaType,
    }
  );
  return data;
};

/* 


*/

export type DeleteAutoListListItemParams = {
  autoListKey: AutoListKeys;
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export const deleteAutoListListItem = async ({
  autoListKey,
  tmdbMediaId,
  tmdbMediaType,
}: PostAutoListListItemParams) => {
  const { data } = await BackendAPI.delete<{}>(
    `/api/auto-lists/${autoListKey}/list-items`,
    {
      params: {
        tmdbMediaId,
        tmdbMediaType,
      },
    }
  );
  return data;
};

/* 


*/

export type PostListItemParams = {
  listId: string;
  mediaId: MediaId;
};

export const postListItem = async ({ listId, mediaId }: PostListItemParams) => {
  const { data } = await BackendAPI.post<ListItem>(`/api/list-items`, {
    listId,
    ...mediaId,
  });
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

export type DeleteListItemParams = {
  id?: string;
  listId?: string;
  mediaId?: MediaId;
};

export type DeleteListItemsParams = DeleteListItemParams[];

export const deleteListItems = async (params: DeleteListItemsParams) => {
  return await BackendAPI.delete<void>(`/api/list-items`, {
    data: params.map((param) => ({
      ...param,
      ...("mediaId" in param ? param.mediaId : {}),
    })),
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
