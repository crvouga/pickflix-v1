import equals from "fast-deep-equal";
import { useMutation, useQuery, useQueryCache } from "react-query";
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
  getLists,
  GetListsParams,
  ListAggergation,
  postList,
  PostListParams,
  DeleteListParams,
} from "./lists";

/* 


*/

const makeGetAutoListsQueryKey = (params: GetAutoListParams) => [
  "auto-lists",
  params.id,
  params.ownerId,
];

export const useQueryAutoLists = (params: GetAutoListParams) => {
  return useQuery(makeGetAutoListsQueryKey(params), () => getAutoLists(params));
};

type GetListsData = Paginated<ListAggergation>[];

const makeGetListsQueryKey = (params: GetListsParams) => [
  "lists",
  params.id,
  params.ownerId,
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
  params.listId,
  params.mediaId,
];

export const useQueryListItems = (params: GetListItemsParams) => {
  return useInfiniteQueryPagination(
    makeGetListItemsQueryKey(params),
    ({ lastPage }) => getListItems({ ...params, page: lastPage })
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
  return useMutation(deleteListItems, {
    onMutate: (deleteListItemParams) => {
      const listId = deleteListItemParams[0].listId;
      const queryKey = makeGetListItemsQueryKey({ listId });

      const previous = queryCache.getQueryData<GetListItemsData>(queryKey);

      if (previous) {
        queryCache.setQueryData(
          queryKey,
          optimisticUpdateDeleteListItems(previous, deleteListItemParams)
        );
      }

      return () => {};
    },

    onSettled: () => {},
  });
};

/* 


*/

export const useAddListItemMutation = () => {
  const queryCache = useQueryCache();
  return useMutation(postListItem, {
    onMutate: (params) => {
      const queryKey = makeGetListItemsQueryKey({
        listId: params.listId,
        mediaId: params.mediaId,
      });
      queryCache.invalidateQueries(queryKey);
      return () => {};
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
  return useMutation(deleteList, {
    onMutate: (params) => {
      const queryKey = makeGetListsQueryKey({});
      const data = queryCache.getQueryData<GetListsData>(queryKey);
      if (data) {
        queryCache.setQueryData(
          queryKey,
          optimisticUpdateDeleteList(data, params)
        );
      }
      return () => {};
    },
  });
};
