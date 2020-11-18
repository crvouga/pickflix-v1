import { useEffect, useState } from "react";
import { useQueryCache } from "react-query";
import { MediaId } from "../tmdb/types";
import { deleteListItems, postListItem, useQueryListItems } from "./query";

type Props = {
  listId: string;
  mediaId: MediaId;
  onAdded: () => void;
  onRemoved: () => void;
};

export default ({ listId, mediaId, onAdded, onRemoved }: Props) => {
  const queryCache = useQueryCache();

  const query = useQueryListItems({
    listId,
    mediaId,
  });
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setIsAdded(Boolean(query.data && query.data[0].results.length > 0));
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
