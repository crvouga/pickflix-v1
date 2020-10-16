export type ListItem = {
  id: string;
  tmdbMediaId: string;
  tmdbMediaType: "movie" | "person";
  listId: string;
  tmdbData: {
    id: string;
    posterPath: string;
    title: string;
  };
};

export type List = {
  id: string;
  title: string;
  description: string;
  isAutoCreated: boolean;
  createdAt: string;
  visibility: "public" | "private";
  //
  listItemCount: number;
  listItems: ListItem[];
};

export type AutoListKey = "watch-next" | "liked";

export type AutoList = {
  type: "autoList";
  id: string;
  ownerId: string;
  key: AutoListKey;
  title: string;
  //
  listItems: ListItem[];
  listItemCount: number;
};
