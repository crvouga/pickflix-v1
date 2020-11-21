import equals from "fast-deep-equal";
import {
  useMutation,
  useQuery,
  useQueryCache,
  QueryConfig,
  InfiniteQueryConfig,
} from "react-query";
import useInfiniteQueryPagination from "../../common/hooks/useInfiniteQueryPagination";
import { Paginated } from "../../common/types";
import { GetAutoListParams, getAutoLists } from "./auto-lists";
import {
  DeleteListItemParams,
  deleteListItems,
  getListItems,
  GetListItemsParams,
  ListItemAggergation,
  postListItem,
} from "./list-items";
import {
  deleteList,
  DeleteListParams,
  getLists,
  GetListsParams,
  ListAggergation,
  postList,
  PatchListParams,
  patchList,
} from "./lists";

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

const makeGetListsQueryKey = (params: GetListsParams) => ["lists", params];

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
      queryCache.invalidateQueries((query) => query.queryKey.includes(listId));
    }
  };
};

/* 


*/

export const useAddListItemMutation = () => {
  const queryCache = useQueryCache();
  return useMutation(postListItem, {
    onMutate: (params) => {
      return () => {};
    },
    onSettled: (listItem) => {
      if (listItem) {
        queryCache.invalidateQueries((query) =>
          query.queryKey.some(
            (item) =>
              equals(item, listItem.mediaId) || equals(item, listItem.listId)
          )
        );
      }
    },
  });
};

/* 


*/

export const useCreateListMutation = () => {
  const queryCache = useQueryCache();
  return useMutation(postList, {
    onSettled: () => {
      const query = queryCache.getQuery(makeGetListsQueryKey({}));
      if (query) {
        query.refetch();
      }
    },
  });
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
