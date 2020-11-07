import { BackendAPI } from "../../backend-api";
import { TmdbMediaType } from "../../tmdb/types";
import { List, ListAggergation, ListItemAggergation } from "./types";

export const getLists = async () => {
  const { data } = await BackendAPI.get<ListAggergation[]>("/api/lists");
  return data;
};

export const getList = async ({ listId }: { listId: string }) => {
  const { data } = await BackendAPI.get<ListAggergation>(
    `/api/lists/${listId}`
  );
  return data;
};

export const getListItems = async ({ listId }: { listId: string }) => {
  const { data } = await BackendAPI.get<ListItemAggergation[]>(
    `/api/lists/${listId}/list-items`
  );
  return data;
};

export const getUsersLists = async ({ username }: { username: string }) => {
  const { data } = await BackendAPI.get<ListAggergation[]>(
    `/api/users/${username}/lists`
  );
  return data;
};
