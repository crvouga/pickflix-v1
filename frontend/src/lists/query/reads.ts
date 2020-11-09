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
  lists: () => ["current-user", "lists"],
  autoLists: () => ["current-user", "auto-lists"],

  autoList: ({ autoListId }: { autoListId: string }) => [
    "auto-lists",
    autoListId,
  ],

  list: ({ listId }: { listId: string }) => ["lists", listId],
  listsOrAutoLists: ({ id }: { id: string }) => ["lists", "autoLists", id],

  listItems: (params: GetListItemsParams) => ["list-items", params],

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

export const getAutoLists = async () => {
  const { data } = await BackendAPI.get<AutoListAggergation[]>(
    "/api/auto-lists"
  );
  return data;
};

export const getListsOrAutoLists = async ({ id }: { id: string }) => {
  const { data } = await BackendAPI.get<ListAggergation | AutoListAggergation>(
    `/api/lists`,
    {
      params: { id },
    }
  );
  return data;
};

export const getList = async ({ listId }: { listId: string }) => {
  const { data } = await BackendAPI.get<ListAggergation>(
    `/api/lists/${listId}`
  );
  return data;
};

type GetListItemsParams =
  | { listId: string }
  | { listId: string; tmdbMediaId: string; tmdbMediaType: TmdbMediaType };

export const getListItems = async (params: GetListItemsParams) => {
  const { data } = await BackendAPI.get<ListItemAggergation[]>(
    `/api/list-items`,
    {
      params,
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

export type GetAutoListListItemsParams = {
  autoListKey: AutoListKeys;
  tmdbMediaType: TmdbMediaType;
  tmdbMediaId: string;
  username: string;
};

export const getAutoListListItems = async ({
  autoListKey,
  tmdbMediaType,
  tmdbMediaId,
  username,
}: GetAutoListListItemsParams) => {
  const { data } = await BackendAPI.get<ListItemAggergation[]>(
    `/api/users/${username}/auto-lists/${autoListKey}/list-items`,
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
