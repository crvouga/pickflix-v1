import { Movie, TmdbMedia, MovieSimilar } from "../../tmdb/types";
import { User } from "../../users/query";

export type ListItem = {
  type: "listItem";
  id: string;
  userId: string;
  listId: string;
  createdAt: number;
} & TmdbMedia;

export type ListItemAggergation = {
  listItem: ListItem;
  tmdbData: Movie & { similar: MovieSimilar };
};

export type List = {
  type: "list";
  id: string;
  ownerId: string;
  title: string;
  description: string;
  createdAt: number;
};

export type ListAggergation = {
  list: List;
  listItemCount: number;
  listItems: ListItemAggergation[];
  owner: User;
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

export type AutoListAggergation = {
  list: AutoList;
  listItemCount: number;
  listItems: ListItemAggergation[];
  owner: User;
};

export type AutoListAggergationByKey = {
  [key in AutoListKeys]: AutoListAggergation;
};
