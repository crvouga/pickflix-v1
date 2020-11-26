import { useQueryCache } from "react-query";
import { MediaId } from "../../../media/tmdb/types";
import { createEventEmitter, Emitter } from "../../../common/utility";
import {
  deleteListItems,
  postListItem,
  useQueryListItems,
  useAddListItemMutation,
  useDeleteListItemsMutation,
} from "../../query";
import { useState, useRef, useEffect } from "react";
import { equals } from "ramda";

interface Events {
  added: undefined;
  removed: undefined;
  error: undefined;
  settled: undefined;
}

export default ({ listId, mediaId }: { listId: string; mediaId: MediaId }) => {
  const queryCache = useQueryCache();

  const eventEmitterRef = useRef<Emitter<Events>>(createEventEmitter<Events>());

  const addListItemMutation = useAddListItemMutation();
  const deleteListItemsMutation = useDeleteListItemsMutation();

  const query = useQueryListItems(
    {
      listId,
      mediaId,
    },
    {
      staleTime: Infinity,
    }
  );

  const [isAdded, setIsAdded] = useState(false);
  const [isMutating, setIsMutation] = useState(false);

  const status: "loading" | "added" | "removed" =
    !query.data || query.isFetching || isMutating
      ? "loading"
      : query.data[0].results.length > 0
      ? "added"
      : "removed";

  useEffect(() => {
    if (status === "added") {
      setIsAdded(true);
    }
    if (status === "removed") {
      setIsAdded(false);
    }
  }, [status]);

  const mutate = async () => {
    try {
      if (status === "added") {
        const previous = isAdded;
        setIsAdded(false);
        setIsMutation(true);
        try {
          await deleteListItemsMutation([{ listId, mediaId }]);
        } catch (error) {
          setIsAdded(previous);
          throw error;
        }
        eventEmitterRef.current.emit("removed");
      }
      if (status === "removed") {
        const previous = isAdded;
        setIsAdded(true);
        setIsMutation(true);
        try {
          await addListItemMutation({ listId, mediaId });
        } catch (error) {
          setIsAdded(previous);
          throw error;
        }
        eventEmitterRef.current.emit("added");
      }
    } catch (error) {
      eventEmitterRef.current.emit("error");
      throw error;
    } finally {
      eventEmitterRef.current.emit("settled");
      query.refetch();
      setIsMutation(false);
      queryCache.invalidateQueries((query) =>
        equals(query.queryKey, ["list-items", { mediaId }])
      );
    }
  };

  return {
    isAdded,
    query,
    status,
    mutate,
    eventEmitter: eventEmitterRef.current,
  };
};
