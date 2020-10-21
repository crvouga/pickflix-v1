import { innerJoin } from "ramda";
import { QueryCache } from "react-query";
import { List, ListItem } from "./types";
import { queryKeys } from "./query-keys";
import {
  deleteList,
  deleteListItems,
  DeleteListItemsParams,
  DeleteListParams,
  patchList,
  PatchListParams,
  postList,
  postListItem,
  PostListItemParams,
  PostListParams,
} from "./writes";

/* 


*/

export const editListMutation = (queryCache: QueryCache) => async (
  params: PatchListParams
) => {
  const { title, description, listId } = params;
  const key = queryKeys.list(listId);

  const previous = queryCache.getQueryData<List>(key);

  if (!previous) {
    throw new Error("no list to edit");
  }

  const optimistic: List = {
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

/* 


*/

export const deleteListMutation = (queryCache: QueryCache) => async (
  params: DeleteListParams
) => {
  const { listId } = params;
  const key = queryKeys.lists();

  const previous = queryCache.getQueryData<List[]>(key) || [];

  const optimistic = previous.filter((list) => list.id !== listId);

  queryCache.setQueryData(key, optimistic);

  try {
    await deleteList(params);
  } catch (error) {
    queryCache.setQueryData(key, previous);
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};

/* 


*/

export const addListMutation = (queryCache: QueryCache) => async (
  params: PostListParams
) => {
  const key = queryKeys.lists();
  try {
    const postedList = await postList(params);
    return postedList;
  } catch (error) {
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};

/* 


*/

export const deleteListItemsMutation = (queryCache: QueryCache) => async ({
  listItemIds,
  listId,
}: DeleteListItemsParams) => {
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

/* 


*/

export const addListItemMutation = (queryCache: QueryCache) => async (
  params: PostListItemParams
) => {
  const key = queryKeys.listItems(params.listId);
  try {
    const listItem = await postListItem(params);
    return listItem;
  } catch (error) {
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};
