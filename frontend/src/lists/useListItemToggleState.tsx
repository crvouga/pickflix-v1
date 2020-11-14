import { useQuery, useQueryCache } from "react-query";
import { TmdbMediaType, MediaId } from "../tmdb/types";
import {
  deleteListItems,
  getListItems,
  postListItem,
  queryKeys,
} from "./query";
import { useState, useEffect } from "react";
import { SimpleEventTarget } from "../utils";

const events = new SimpleEventTarget<"added" | "removed">();

export default (params: { listId: string; mediaId: MediaId }) => {
  const queryCache = useQueryCache();
  const queryKey = queryKeys.listItems(params);
  const query = useQuery(queryKey, () => getListItems(params));
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(Boolean(query.data && query.data.length > 0));
  }, [query.data]);

  const toggle = async () => {
    if (!query.isFetched) {
      return;
    }

    try {
      if (query.isFetched && isAdded) {
        setIsAdded(false);
        await deleteListItems([params]);
        events.dispatch("removed");
      } else {
        setIsAdded(true);
        await postListItem(params);
        events.dispatch("added");
        return true;
      }
    } catch (error) {
      throw error;
    } finally {
      queryCache.invalidateQueries((query) =>
        query.queryKey.includes(params.listId)
      );
    }
  };

  return {
    ...query,
    toggle,
    isAdded,
    events,
  };
};
