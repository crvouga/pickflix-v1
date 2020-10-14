import backendAPI from "../../../backendAPI";
import { AutoList, List, ListItem } from "../../types";

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

export const getWatchNextList = async () => {
  const { data } = await backendAPI.get<AutoList>(`/api/auto-lists/watch-next`);
  return data;
};
