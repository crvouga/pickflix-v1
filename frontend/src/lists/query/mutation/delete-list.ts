import backendAPI from "../../../backendAPI";
import { queryCache } from "../../../query/query-cache";
import * as queryKeys from "../query-keys";
import { List } from "../../types";

type Params = {
  listId: string;
};

export const deleteList = async ({ listId }: Params) => {
  const { data } = await backendAPI.delete<{}>(`/api/lists/${listId}`);
  return data;
};

export const deleteListMutation = async ({ listId }: Params) => {
  const key = queryKeys.lists();
  const previous = queryCache.getQueryData<List[]>(key);

  if (!previous) {
    throw new Error("no list to delete");
  }

  const optimistic = previous.filter((list) => list.id !== listId);
  queryCache.setQueryData(key, optimistic);

  try {
    await deleteList({ listId });
    queryCache.removeQueries(queryKeys.list(listId));
  } catch (error) {
    queryCache.setQueryData(key, previous);
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};
