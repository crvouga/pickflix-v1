import { BackendAPI } from "../../backend-api";
import { Paginated } from "../../common/types";
import { User } from "../../users/query";
import { ListItemAggergation } from "./list-items";

/* 


*/

export type List = {
  type: "list";
  id: string;
  ownerId: string;
  title: string;
  description: string;
  createdAt: number;
};

export type ListAggergation = {
  list: List;
  listItemCount: number;
  listItems: ListItemAggergation[];
  owner: User;
};

/* 


*/

export type GetListsParams = {
  ownerId?: string;
  id?: string;
  page?: number;
};

export type GetListsResponse = Paginated<ListAggergation>;

export const getLists = async (params: GetListsParams) => {
  const { data } = await BackendAPI.get<GetListsResponse>(`/api/lists`, {
    params,
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
