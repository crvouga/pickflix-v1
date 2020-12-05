import equals from "fast-deep-equal";
import {
  InfiniteQueryConfig,
  useMutation,
  useQuery,
  useQueryCache,
} from "react-query";
import { useInfiniteQueryPagination } from "../../common/infinite-scroll";
import { Paginated } from "../../common/types";
import {
  DeleteListItemParams,
  deleteListItems,
  getListItems,
  GetListItemsParams,
  postListItem,
  PostListItemParams,
} from "./list-items";
import {
  deleteList,
  DeleteListEditorsParams,
  DeleteListParams,
  GetAutoListParams,
  getAutoLists,
  getLists,
  getListsFromMediaId,
  GetListsFromMediaIdParams,
  GetListsParams,
  patchList,
  PatchListParams,
  postList,
  postListEditors,
  PostListEditorsParams,
  PostListParams,
  deleteListEditors,
  PostTransferOwnershipParams,
  postTransferOwnership,
} from "./lists";
import { ListAggergation, ListItemAggergation } from "./types";

const makeGetListsFromMediaIdQueryKey = (params: GetListsFromMediaIdParams) => [
  "list-items",
  "lists",
  params,
];

export const useQueryListsFromMediaId = (params: GetListsFromMediaIdParams) => {
  return useQuery(makeGetListsFromMediaIdQueryKey(params), () =>
    getListsFromMediaId(params)
  );
};

/* 


*/

const makeGetAutoListsQueryKey = (params: GetAutoListParams) => [
  "auto-lists",
  params,
];

export const useQueryAutoLists = (params: GetAutoListParams) => {
  return useQuery(makeGetAutoListsQueryKey(params), () => getAutoLists(params));
};

type GetListsData = Paginated<ListAggergation>[];

export const makeGetListsQueryKey = (params: GetListsParams) => [
  "lists",
  params,
];

export const useQueryLists = (params: GetListsParams) => {
  return useInfiniteQueryPagination(
    makeGetListsQueryKey(params),
    ({ lastPage }) => getLists({ ...params, page: lastPage })
  );
};

type GetListItemsData = Paginated<ListItemAggergation>[];

const makeGetListItemsQueryKey = (params: GetListItemsParams) => [
  "list-items",
  params,
];

export const useQueryListItems = (
  params: GetListItemsParams,
  config?: InfiniteQueryConfig<Paginated<ListItemAggergation>>
) => {
  return useInfiniteQueryPagination(
    makeGetListItemsQueryKey(params),
    ({ lastPage }) => getListItems({ ...params, page: lastPage }),
    config
  );
};

/* 


*/

const optimisticUpdateDeleteListItems = (
  data: GetListItemsData,
  params: DeleteListItemParams
) => {
  return data.map((page) => ({
    ...page,
    results: page.results.filter(
      (result) =>
        !params.some((param) =>
          "id" in param
            ? equals(result.listItem.id, param.id)
            : equals(result.listItem.mediaId, param.mediaId)
        )
    ),
  }));
};

export const useDeleteListItemsMutation = () => {
  const queryCache = useQueryCache();

  return async (params: DeleteListItemParams) => {
    const listId = params[0].listId;

    const queryKey = makeGetListItemsQueryKey({ listId });

    const previous = queryCache.getQueryData<GetListItemsData>(queryKey);

    if (previous) {
      queryCache.setQueryData(
        queryKey,
        optimisticUpdateDeleteListItems(previous, params)
      );
    }

    try {
      await deleteListItems(params);
    } catch (error) {
      queryCache.setQueryData(queryKey, previous);
      throw error;
    } finally {
      queryCache.invalidateQueries(makeGetListsQueryKey({ id: listId }));
      queryCache.invalidateQueries(makeGetListItemsQueryKey({ listId }));
    }
  };
};

/* 


*/

export const useAddListItemMutation = () => {
  const queryCache = useQueryCache();
  return async (params: PostListItemParams) => {
    const queryKey1 = makeGetListItemsQueryKey({
      listId: params.listId,
    });
    const queryKey2 = makeGetListItemsQueryKey({
      listId: params.listId,
      mediaId: params.mediaId,
    });
    const queryKey3 = makeGetListsQueryKey({
      id: params.listId,
    });
    try {
      const listItem = await postListItem(params);
      queryCache.invalidateQueries((query) =>
        query.queryKey.some(
          (item) =>
            equals(item, listItem.mediaId) || equals(item, listItem.listId)
        )
      );
    } catch (error) {
      throw error;
    } finally {
      queryCache.invalidateQueries(queryKey1);
      queryCache.invalidateQueries(queryKey2);
      queryCache.invalidateQueries(queryKey3);
    }
  };
};

/* 


*/

export const useCreateListMutation = () => {
  const queryCache = useQueryCache();
  return async (params: PostListParams) => {
    try {
      const list = await postList(params);
      queryCache.invalidateQueries(
        makeGetListsQueryKey({ ownerId: list.ownerId })
      );
      queryCache.invalidateQueries(makeGetListsQueryKey({}));
      return list;
    } catch (error) {
      throw error;
    }
  };
};

/* 


*/

const optimisticUpdateDeleteList = (
  data: GetListsData,
  params: DeleteListParams
) => {
  return data.map((page) => ({
    ...page,
    results: page.results.filter((result) => result.list.id !== params.listId),
  }));
};

export const useDeleteListMutation = () => {
  const queryCache = useQueryCache();
  return async (params: DeleteListParams) => {
    const queryKey = makeGetListsQueryKey({});
    const previous = queryCache.getQueryData<GetListsData>(queryKey);
    if (previous) {
      queryCache.setQueryData(
        queryKey,
        optimisticUpdateDeleteList(previous, params)
      );
    }
    try {
      await deleteList(params);
    } catch (error) {
      queryCache.setQueryData(queryKey, previous);
      throw error;
    } finally {
      queryCache.invalidateQueries(queryKey);
    }
  };
};

/* 


*/

const optimisticUpdateEditList = (
  previous: GetListsData,
  { listId, title, description }: PatchListParams
) => {
  return previous.map((page) => ({
    ...page,
    results: page.results.map((result) => ({
      ...result,
      list:
        result.list.id === listId
          ? {
              ...result.list,
              title,
              description,
            }
          : result.list,
    })),
  }));
};

export const useEditListMutation = () => {
  const queryCache = useQueryCache();
  return async (params: PatchListParams) => {
    const queryKey = makeGetListsQueryKey({
      id: params.listId,
    });

    const previous = queryCache.getQueryData<GetListsData>(queryKey);
    if (previous) {
      queryCache.setQueryData(
        queryKey,
        optimisticUpdateEditList(previous, params)
      );
    }
    try {
      await patchList(params);
    } catch (error) {
      queryCache.setQueryData(queryKey, previous);
      throw error;
    } finally {
      queryCache.invalidateQueries((query) =>
        query.queryKey.includes(params.listId)
      );
    }
  };
};

/* 

*/

export const useAddEditorsMutation = () => {
  const queryCache = useQueryCache();
  return async (params: PostListEditorsParams) => {
    try {
      await postListEditors(params);
    } catch (error) {
      throw error;
    } finally {
      queryCache.invalidateQueries(
        makeGetListsQueryKey({
          id: params.listId,
        })
      );
      queryCache.invalidateQueries(makeGetListsQueryKey({}));
    }
  };
};

/* 

*/

const optimisticUpdateDeleteEditors = (
  previous: GetListsData,
  { listId, editorIds }: DeleteListEditorsParams
) => {
  return previous.map((page) => ({
    ...page,
    results: page.results.map((list) => ({
      ...list,
      editors: list.editors.filter((editor) =>
        editorIds.every((editorId) => editorId !== editor.id)
      ),
    })),
  }));
};

export const useDeleteEditorsMutation = () => {
  const queryCache = useQueryCache();
  return async (params: DeleteListEditorsParams) => {
    const queryKey1 = makeGetListsQueryKey({
      id: params.listId,
    });
    const queryKey2 = makeGetListsQueryKey({});

    const previous1 = queryCache.getQueryData<GetListsData>(queryKey1);
    if (previous1) {
      console.log({ previous1 });
      queryCache.setQueryData(
        queryKey1,
        optimisticUpdateDeleteEditors(previous1, params)
      );
    }

    const previous2 = queryCache.getQueryData<GetListsData>(queryKey2);
    if (previous2) {
      queryCache.setQueryData(
        queryKey2,
        optimisticUpdateDeleteEditors(previous2, params)
      );
    }

    try {
      await deleteListEditors(params);
    } catch (error) {
      queryCache.setQueryData(queryKey1, previous1);
      queryCache.setQueryData(queryKey2, previous2);
      throw error;
    } finally {
      queryCache.invalidateQueries(queryKey1);
      queryCache.invalidateQueries(queryKey2);
    }
  };
};

/*

*/

export const useTransferOwnershipMutation = () => {
  const queryCache = useQueryCache();
  return async (params: PostTransferOwnershipParams) => {
    const queryKey1 = makeGetListsQueryKey({
      id: params.listId,
    });
    const queryKey2 = makeGetListsQueryKey({});
    try {
      await postTransferOwnership(params);
    } catch (error) {
      throw error;
    } finally {
      queryCache.invalidateQueries(queryKey1);
      queryCache.invalidateQueries(queryKey2);
    }
  };
};
