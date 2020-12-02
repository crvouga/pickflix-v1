import { BackendAPI } from "../../backend-api";
import { Paginated } from "../../common/types";
import { MediaId } from "../../media/tmdb/types";
import { List, ListAggergation } from "./types";

/* 


*/

export type GetListsParams = {
  ownerId?: string;
  includeListItemWithMediaId?: MediaId;
  id?: string;
  page?: number;
};

export type GetListsResponse = Paginated<ListAggergation>;

export const getLists = async ({
  ownerId,
  includeListItemWithMediaId,
  id,
  page,
}: GetListsParams) => {
  const { data } = await BackendAPI.get<GetListsResponse>(`/api/lists`, {
    params: {
      ownerId,
      id,
      page,
      ...includeListItemWithMediaId,
    },
  });
  return data;
};

/* 


*/

export type PostListParams = {
  title: string;
  description: string;
};

export type PostListResponse = List;

export const postList = async ({ title, description }: PostListParams) => {
  const { data } = await BackendAPI.post<PostListResponse>(`/api/lists/`, {
    title,
    description,
  });
  return data;
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
