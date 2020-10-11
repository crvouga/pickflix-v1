import { queryCache } from "../../../query/query-cache";
import * as queryKeys from "../query-keys";
import backendAPI from "../../../backendAPI";
import { List } from "../../types";

type Params = {
  title: string;
  description: string;
  listId: string;
};

export const patchList = async ({ listId, title, description }: Params) => {
  const { data } = await backendAPI.patch<List>(`/api/lists/${listId}`, {
    title,
    description,
  });

  return data;
};

export const editListMutation = async (params: Params) => {
  const { title, description, listId } = params;
  const key = queryKeys.list(listId);

  const previous = queryCache.getQueryData<List>(key);

  if (!previous) {
    throw new Error("no list to edit");
  }

  const optimistic = {
    ...previous,
    title,
    description,
  };
  queryCache.setQueryData(key, optimistic);

  try {
    const patchedList = await patchList(params);
    queryCache.setQueryData(key, patchedList);
  } catch (error) {
    queryCache.setQueryData(key, previous);
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};
