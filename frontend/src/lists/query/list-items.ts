import { BackendAPI } from "../../backend-api";
import { Paginated } from "../../common/types";
import { MediaId, Movie, MovieSimilar } from "../../tmdb/types";

/* 


*/

export type ListItem = {
  type: "listItem";
  id: string;
  userId: string;
  listId: string;
  createdAt: number;
  mediaId: MediaId;
};

export type ListItemAggergation = {
  listItem: ListItem;
  tmdbData: Movie & { similar: MovieSimilar };
};

/* 

*/

export type GetListItemsParams = {
  listId?: string;
  mediaId?: MediaId;
  page?: number;
};

export const getListItems = async (params: GetListItemsParams) => {
  const { data } = await BackendAPI.get<Paginated<ListItemAggergation>>(
    `/api/list-items`,
    {
      params: {
        listId: params.listId,
        page: params.page,
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
