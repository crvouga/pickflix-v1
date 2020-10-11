import backendAPI from "../../../backendAPI";
import * as queryKeys from "../query-keys";
import { queryCache } from "../../../query/query-cache";
import { ListItem } from "../../types";
import { TmdbMediaType } from "../../../tmdb/types";

type Params = {
  listId: string;
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export const postListItem = async ({
  listId,
  tmdbMediaId,
  tmdbMediaType,
}: Params) => {
  const { data } = await backendAPI.post<ListItem>(
    `/api/lists/${listId}/list-items`,
    {
      tmdbMediaId,
      tmdbMediaType,
    }
  );
  return data;
};

export const addListItemMutation = async (params: Params) => {
  const { listId } = params;
  const key = queryKeys.listItems(listId);

  try {
    const listItem = await postListItem(params);
    return listItem;
  } catch (error) {
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};
