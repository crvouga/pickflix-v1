import { BackendAPI } from "../../backend-api";
import { TmdbMediaType } from "../../tmdb/types";
import {
  AutoListAggergation,
  AutoListAggergationByKey,
  AutoListKeys,
  ListAggergation,
  ListItemAggergation,
} from "./types";

export const queryKeys = {
  lists: () => ["user", "lists"],

  list: (listId: string) => ["lists", listId],

  listItems: (listId: string) => ["lists", listId, "list-items"],

  userLists: ({ username }: { username: string }) => [
    "users",
    username,
    "lists",
  ],

  userAutoList: ({
    username,
    autoListKey,
  }: {
    username: string;
    autoListKey: AutoListKeys;
  }) => ["users", username, "auto-lists", autoListKey],

  userAutoLists: ({ username }: { username: string }) => [
    "users",
    username,
    "auto-lists",
  ],
  autoListListItem: (params: GetAutoListListItemsParams) => [
    "user",
    "auto-lists",
    params.autoListKey,
    "listItems",
    params.tmdbMediaId,
    params.tmdbMediaType,
  ],
};

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
    `/api/list-items`,
    {
      params: {
        listId,
      },
    }
  );
  return data;
};

export const getUsersLists = async ({ username }: { username: string }) => {
  const { data } = await BackendAPI.get<ListAggergation[]>(
    `/api/users/${username}/lists`
  );
  return data;
};

export type GetAutoListListItemsParams = {
  autoListKey: AutoListKeys;
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
};

export const getAutoList = async ({ autoListId }: { autoListId: string }) => {
  const { data } = await BackendAPI.get<AutoListAggergation>(
    `/api/auto-lists/${autoListId}`
  );
  return data;
};

export const getUsersAutoList = async ({
  username,
  autoListKey,
}: {
  username: string;
  autoListKey: AutoListKeys;
}) => {
  const { data } = await BackendAPI.get<AutoListAggergation>(
    `/api/users/${username}/auto-lists/${autoListKey}`
  );
  return data;
};

export const getAutoListListItems = async ({
  autoListKey,
  tmdbMediaType,
  tmdbMediaId,
}: GetAutoListListItemsParams) => {
  const { data } = await BackendAPI.get<ListItemAggergation[]>(
    `/api/auto-lists/${autoListKey}/list-items`,
    {
      params: {
        tmdbMediaType,
        tmdbMediaId,
      },
    }
  );
  return data;
};

export const getUsersAutoLists = async ({ username }: { username: string }) => {
  const { data } = await BackendAPI.get<AutoListAggergationByKey>(
    `/api/users/${username}/auto-lists`
  );
  return data;
};
