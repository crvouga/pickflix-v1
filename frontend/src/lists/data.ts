import backendAPI from "../backendAPI";

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

export const queryKeys = {
  lists: () => ["lists"],
  list: (listId: string) => ["lists", listId],
  listItems: (listId: string) => ["lists", listId, "list-items"],
};

export const fetchLists = async () => {
  const { data } = await backendAPI.get<List[]>("/api/lists");
  return data;
};

export const fetchList = async (listId: string) => {
  const { data } = await backendAPI.get<List>(`/api/lists/${listId}`);
  return data;
};

export const fetchListItems = async (listId: string) => {
  const { data } = await backendAPI.get<ListItem[]>(
    `/api/lists/${listId}/list-items`
  );
  return data;
};

export const patchList = async ({
  listId,
  title,
  description,
}: {
  title: string;
  description: string;
  listId: string;
}) => {
  const { data } = await backendAPI.patch<List>(`/api/lists/${listId}`, {
    title,
    description,
  });

  return data;
};

export const deleteListItems = async ({
  listId,
  listItemIds,
}: {
  listId: string;
  listItemIds: string[];
}) => {
  await backendAPI.delete(`/api/lists/${listId}/list-items`, {
    data: listItemIds,
  });
};

export const deleteList = async ({ listId }: { listId: string }) => {
  await backendAPI.delete(`/api/lists/${listId}`);
};

export const postListItem = async ({
  listId,
  tmdbMediaId,
  tmdbMediaType,
}: {
  listId: string;
  tmdbMediaId: string;
  tmdbMediaType: "movie" | "tv" | "person";
}) => {
  const { data } = await backendAPI.post<ListItem>(
    `/api/lists/${listId}/list-items`,
    {
      tmdbMediaId,
      tmdbMediaType,
    }
  );

  return data;
};
