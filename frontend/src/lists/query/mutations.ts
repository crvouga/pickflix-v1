import { innerJoin } from "ramda";
import { QueryCache } from "react-query";
import { queryKeys } from "./reads";
import { ListAggergation, ListItem } from "./types";
import {
  deleteListItems,
  DeleteListItemsParams,
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

  const previous = queryCache.getQueryData<ListAggergation>(key);

  if (!previous) {
    throw new Error("no list to edit");
  }

  const optimistic: ListAggergation = {
    ...previous,
    list: {
      ...previous.list,
      title,
      description,
    },
  };

  queryCache.setQueryData(key, optimistic);

  try {
    await patchList(params);
  } catch (error) {
    queryCache.setQueryData(key, previous);
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
