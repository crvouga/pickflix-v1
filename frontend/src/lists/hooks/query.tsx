import { useQuery } from "react-query";
import { getList, getLists, getListItems, queryKeys } from "../query";

export const useQueryLists = () => {
  return useQuery(queryKeys.lists(), () => getLists());
};

export const useQueryList = ({ listId }: { listId: string }) => {
  return useQuery(queryKeys.list(listId), () => getList({ listId }));
};

export const useQueryListItems = ({ listId }: { listId: string }) => {
  return useQuery(queryKeys.listItems(listId), () => getListItems({ listId }));
};
