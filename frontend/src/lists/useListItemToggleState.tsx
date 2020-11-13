import { useQuery, useQueryCache } from "react-query";
import { TmdbMediaType } from "../tmdb/types";
import {
  deleteListItems,
  getListItems,
  postListItem,
  queryKeys,
} from "./query";
import { useState, useEffect } from "react";

export default (params: {
  listId: string;
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
}) => {
  const queryCache = useQueryCache();
  const queryKey = queryKeys.listItems(params);
  const query = useQuery(queryKey, () => getListItems(params));
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    setIsIn(Boolean(query.data && query.data.length > 0));
  }, [query.data]);

  const toggle = async () => {
    if (!query.isFetched) {
      return;
    }

    try {
      if (query.isFetched && isIn) {
        setIsIn(false);
        await deleteListItems([params]);
        return false;
      } else {
        setIsIn(true);
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
