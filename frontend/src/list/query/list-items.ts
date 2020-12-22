import { BackendAPI } from "../../backend-api";
import { Paginated } from "../../common/types";
import { MediaId } from "../../media/tmdb/types";
import { ListItem, ListItemAggergation } from "./types";

/* 


*/

export type GetListItemsParams = {
  listId?: string;
  mediaId?: MediaId;
  userId?: string;
  page?: number;
  pageSize?: number;
};

export const getListItems = async (params: GetListItemsParams) => {
  const { data } = await BackendAPI.get<Paginated<ListItemAggergation>>(
    `/api/list-items`,
    {
      params: {
        userId: params.userId,
        listId: params.listId,
        page: params.page,
        pageSize: params.pageSize,
        ...(params.mediaId ? params.mediaId : {}),
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
    mediaId,
  });
  return data;
};

/* 


*/

export type DeleteListItemParams = (
  | {
      listId: string;
      id: string;
    }
  | {
      listId: string;
      mediaId: MediaId;
    }
)[];

export const deleteListItems = async (params: DeleteListItemParams) => {
  const { data } = await BackendAPI.delete<undefined>(`/api/list-items`, {
    data: params,
  });
  return data;
};

/* 


*/

export type ToggleListItemParams = {
  listId: string;
  mediaId: MediaId;
};

export const toggleListItem = async (params: ToggleListItemParams) => {
  const { data } = await BackendAPI.post<boolean>(
    `/api/list-items/toggle`,
    params
  );
  return data;
};
