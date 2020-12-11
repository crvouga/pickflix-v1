import { BackendAPI } from "../../backend-api";
import { Paginated } from "../../common/types";
import { MediaId } from "../../media/tmdb/types";
import { AutoList, AutoListAggergation, List, ListAggergation } from "./types";

/* 


*/

export type PostListEditorsParams = {
  listId: string;
  editorIds: string[];
};

export const postListEditors = async ({
  listId,
  editorIds,
}: PostListEditorsParams) => {
  const { data } = await BackendAPI.post<undefined>(
    `/api/lists/${listId}/editors`,
    editorIds
  );
  return data;
};

/* 


*/

export type DeleteListEditorsParams = {
  listId: string;
  editorIds: string[];
};

export const deleteListEditors = async ({
  listId,
  editorIds,
}: DeleteListEditorsParams) => {
  const { data } = await BackendAPI.delete<undefined>(
    `/api/lists/${listId}/editors`,
    {
      data: editorIds,
    }
  );
  return data;
};

/* 


*/

export type PostTransferOwnershipParams = {
  editorId: string;
  listId: string;
};

export const postTransferOwnership = async ({
  listId,
  editorId,
}: PostTransferOwnershipParams) => {
  const { data } = await BackendAPI.post<undefined>(
    `/api/lists/${listId}/transfer`,
    {
      editorId,
    }
  );
  return data;
};

/* 


*/

export type GetListsFromMediaIdParams = {
  mediaId: MediaId;
};

export const getListsFromMediaId = async ({
  mediaId,
}: GetListsFromMediaIdParams) => {
  const { data } = await BackendAPI.get<(List | AutoList)[]>(
    "/api/list-items/lists",
    {
      params: {
        ...mediaId,
      },
    }
  );
  return data;
};

/*


*/

export type GetAutoListParams = {
  id?: string;
  ownerId?: string;
};

export const getAutoLists = async ({ id, ownerId }: GetAutoListParams) => {
  const { data } = await BackendAPI.get<AutoListAggergation[]>(
    `/api/auto-lists`,
    {
      params: {
        id,
        ownerId,
      },
    }
  );
  return data;
};

/* 


*/

export type GetListsParams = {
  page?: number;
} & (
  | {
      editorId: string;
    }
  | {
      userId: string;
    }
  | {
      ownerId: string;
    }
  | {
      listId: string;
    }
);

export const doesIncludeUserId = (userId: string, params: GetListsParams) => {
  return (
    ("editorId" in params && params.editorId === userId) ||
    ("userId" in params && params.userId === userId) ||
    ("ownerId" in params && params.ownerId === userId)
  );
};

export type GetListsResponse = Paginated<ListAggergation>;

export const getLists = async (params: GetListsParams) => {
  const { data } = await BackendAPI.get<GetListsResponse>(`/api/lists`, {
    params: params,
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
