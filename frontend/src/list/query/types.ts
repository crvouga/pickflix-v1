import { MediaId, Movie, MovieSimilar } from "../../media/tmdb/types";
import { User } from "../../user/query";

/* all copyed from server */

type TmdbData = Movie & { similar: MovieSimilar };

export type ListItem = {
  type: "listItem";
  id: string;
  userId: string;
  listId: string;
  createdAt: number;
  mediaId: MediaId;
};

export type ListItemAggergation = {
  listItem: ListItem;
  tmdbData: TmdbData;
};

export enum AutoListKeys {
  WatchNext = "watch-next",
  Liked = "liked",
}

export const toAutoListName = (autoListKey: AutoListKeys) => {
  switch (autoListKey) {
    case AutoListKeys.Liked:
      return "Liked";
    case AutoListKeys.WatchNext:
      return "Watch Next";
  }
};

export type AutoList = {
  type: "autoList";
  id: string;
  ownerId: string;
  key: AutoListKeys;
};

export type AutoListAggergationByKey = {
  [key in AutoListKeys]: AutoListAggergation;
};

export type ListItemAggergate = {
  listItem: ListItem;
  tmdbData: TmdbData;
};

export type List = {
  type: "list";
  id: string;
  ownerId: string;
  title: string;
  description: string;
  createdAt: number;
};

export type ListAggergate<T extends List | AutoList> = {
  listItems: ListItemAggergate[];
  listItemCount: number;
  list: T;
  owner: User;
  includeListItemWithMediaId?: ListItem;
};

export type AutoListAggergation = ListAggergate<AutoList>;
export type ListAggergation = ListAggergate<List>;
