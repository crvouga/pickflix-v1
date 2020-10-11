import { innerJoin } from "ramda";
import { queryCache } from "../../../query/query-cache";
import * as queryKeys from "../query-keys";
import backendAPI from "../../../backendAPI";
import { ListItem } from "../../types";

type Params = {
  listId: string;
  listItemIds: string[];
};

export const deleteListItems = async ({ listId, listItemIds }: Params) => {
  await backendAPI.delete(`/api/lists/${listId}/list-items`, {
    data: listItemIds,
  });
};

export const deleteListItemsMutation = async ({
  listItemIds,
  listId,
}: Params) => {
  const key = queryKeys.listItems(listId);
  const previousListItems = queryCache.getQueryData<ListItem[]>(key);

  if (!previousListItems) {
    throw new Error("no list items to delete");
  }

  const optimistic = innerJoin(
    (listItem, id) => listItem.id !== id,
    previousListItems,
    listItemIds
  );

  queryCache.setQueryData(key, optimistic);

  try {
    await deleteListItems({
      listId,
      listItemIds,
    });
  } catch (error) {
    queryCache.setQueryData(key, previousListItems);
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};
