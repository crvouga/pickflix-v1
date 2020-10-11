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
  listItemCount: number;
  listItems: ListItem[];
  isAutoCreated: boolean;
  createdAt: string;
  visibility: "public" | "private";
};
