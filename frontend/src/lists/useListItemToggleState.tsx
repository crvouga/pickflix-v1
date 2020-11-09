import { useQuery, useQueryCache } from "react-query";
import { TmdbMediaType } from "../tmdb/types";
import {
  deleteListItems,
  getListItems,
  postListItem,
  queryKeys,
} from "./query";

export default (params: {
  listId: string;
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
}) => {
  const queryCache = useQueryCache();
  const queryKey = queryKeys.listItems(params);
  const query = useQuery(queryKey, () => getListItems(params));

  const isIn = query.data && query.data.length > 0;

  const toggle = async () => {
    if (!query.isFetched) {
      return;
    }

    try {
      if (query.isFetched && isIn) {
        await deleteListItems([params]);
        return false;
      } else {
        await postListItem(params);
        return true;
      }
    } catch (error) {
      throw error;
    } finally {
      queryCache.invalidateQueries(queryKey);
    }
  };

  return {
    ...query,
    isIn,
    toggle,
  };
};
