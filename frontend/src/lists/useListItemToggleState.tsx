import { useQuery, useQueryCache } from "react-query";
import { TmdbMediaType, MediaId } from "../tmdb/types";
import {
  deleteListItems,
  getListItems,
  postListItem,
  queryKeys,
} from "./query";
import { useState, useEffect } from "react";

type Props = {
  listId: string;
  mediaId: MediaId;
  onAdded: () => void;
  onRemoved: () => void;
};

export default ({ listId, mediaId, onAdded, onRemoved }: Props) => {
  const queryCache = useQueryCache();
  const queryKey = queryKeys.listItems({ listId, mediaId });
  const query = useQuery(queryKey, () => getListItems({ listId, mediaId }));
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(Boolean(query.data && query.data.length > 0));
  }, [query.data]);

  const toggle = async () => {
    if (!query.isFetched) {
      return;
    }

    try {
      if (isAdded) {
        setIsAdded(false);
        await deleteListItems([{ listId, mediaId }]);
        onRemoved();
      } else {
        setIsAdded(true);
        await postListItem({ listId, mediaId });
        onAdded();
        return true;
      }
    } catch (error) {
      throw error;
    } finally {
      queryCache.invalidateQueries((query) => query.queryKey.includes(listId));
    }
  };

  return {
    query,
    toggle,
    isAdded,
  };
};
