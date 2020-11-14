import { QueryCache } from "react-query";
import { queryKeys } from "./reads";
import { ListAggergation } from "./types";
import {
  DeleteListItemParams,
  deleteListItems,
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
  const key = queryKeys.list({ listId });

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

export const deleteListItemsMutation = (queryCache: QueryCache) => async (
  params: DeleteListItemParams[]
) => {
  try {
    await deleteListItems(params);
  } catch (error) {
    throw error;
  } finally {
    const ids = params.map((param) =>
      "id" in param ? param.id : param.listId
    );
    queryCache.invalidateQueries((query) =>
      query.queryKey.some((_: any) => ids.includes(_))
    );
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
  const key = queryKeys.listItems({ listId: params.listId });
  try {
    const listItem = await postListItem(params);
    return listItem;
  } catch (error) {
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};
