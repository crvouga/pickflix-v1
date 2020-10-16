import backendAPI from "../../../backendAPI";
import { AutoList, List, ListItem, AutoListKey } from "../../types";
import { TmdbMediaType } from "../../../tmdb/types";

export const getLists = async () => {
  const { data } = await backendAPI.get<List[]>("/api/lists");
  return data;
};

export const getList = async ({ listId }: { listId: string }) => {
  const { data } = await backendAPI.get<List>(`/api/lists/${listId}`);
  return data;
};

export const getListItems = async ({ listId }: { listId: string }) => {
  const { data } = await backendAPI.get<ListItem[]>(
    `/api/lists/${listId}/list-items`
  );
  return data;
};

export const getAutoList = async (autoListKey: AutoListKey) => {
  const { data } = await backendAPI.get<AutoList>(
    `/api/auto-lists/${autoListKey}`
  );
  return data;
};

export const getListsFromListItem = async ({
  tmdbMediaId,
  tmdbMediaType,
}: {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
}) => {
  const { data } = await backendAPI.get<(List | AutoList)[]>(
    `/api/list-items/lists`,
    {
      params: {
        tmdbMediaId,
        tmdbMediaType,
      },
    }
  );
  return data;
};
