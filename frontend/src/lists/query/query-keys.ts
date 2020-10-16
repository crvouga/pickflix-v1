import { TmdbMediaType } from "../../tmdb/types";
import { AutoListKey } from "../types";

export const lists = () => ["user", "lists"];

export const list = (listId: string) => ["user", "lists", listId];

export const listItems = (listId: string) => [
  "user",
  "lists",
  listId,
  "list-items",
];

export const autoList = (autoListKey: AutoListKey) => ["user", autoListKey];

export const listsFromListItemMedia = ({
  tmdbMediaId,
  tmdbMediaType,
}: {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
}) => ["user", "list-items", "lists", tmdbMediaId, tmdbMediaType];
