import { TmdbMediaType } from "../../tmdb/types";
import { AutoListKey } from "./types";

export const queryKeys = {
  lists: () => ["user", "lists"],

  list: (listId: string) => ["user", "lists", listId],

  listItems: (listId: string) => ["user", "lists", listId, "list-items"],

  autoList: (autoListKey: AutoListKey) => ["user", autoListKey],

  listsFromListItemMedia: ({
    tmdbMediaId,
    tmdbMediaType,
  }: {
    tmdbMediaId: string;
    tmdbMediaType: TmdbMediaType;
  }) => ["user", "list-items", "lists", tmdbMediaId, tmdbMediaType],
};
