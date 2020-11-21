import { useQueryCache } from "react-query";
import { MediaId } from "../../../media/tmdb/types";
import { createEventEmitter, Emitter } from "../../../common/utility";
import { deleteListItems, postListItem, useQueryListItems } from "../../query";
import { useState, useRef } from "react";
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

  const query = useQueryListItems(
    {
      listId,
      mediaId,
    },
    {
      staleTime: Infinity,
    }
  );

  const [isMutating, setIsMutation] = useState(false);

  const status: "loading" | "added" | "removed" =
    !query.data || query.isFetching || isMutating
      ? "loading"
      : query.data[0].results.length > 0
      ? "added"
      : "removed";

  const mutate = async () => {
    try {
      if (status === "added") {
        setIsMutation(true);
        await deleteListItems([{ listId, mediaId }]);
        eventEmitterRef.current.emit("removed");
      }
      if (status === "removed") {
        setIsMutation(true);
        await postListItem({ listId, mediaId });
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
    query,
    status,
    mutate,
    eventEmitter: eventEmitterRef.current,
  };
};
