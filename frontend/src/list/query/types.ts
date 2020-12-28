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

export enum AutoListKeys {
  WatchNext = "watch-next",
  Liked = "liked",
  Favorite = "favorite",
}

export const toAutoListName = (autoListKey: AutoListKeys) => {
  switch (autoListKey) {
    case AutoListKeys.Liked:
      return "Liked";
    case AutoListKeys.WatchNext:
      return "Watch Next";
    case AutoListKeys.Favorite:
      return "Favorite";
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

export type ListItemAggergation = {
  listItem: ListItem;
  tmdbData: TmdbData;
};

export type ListAggergation = {
  listItems: ListItemAggergation[];
  listItemCount: number;
  list: List;
  owner: User;
  editors: User[];
};

export type AutoListAggergation = {
  listItems: ListItemAggergation[];
  listItemCount: number;
  autoList: AutoList;
  owner: User;
};

export const isEditorOrOwner = (
  user: User,
  list: ListAggergation | AutoListAggergation
) => {
  return (
    list.owner.id === user.id ||
    ("list" in list && list.editors.some((editor) => editor.id === user.id))
  );
};
