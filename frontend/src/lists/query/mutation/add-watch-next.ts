import backendAPI from "../../../backendAPI";
import { queryCache } from "../../../query/query-cache";
import { TmdbMediaType } from "../../../tmdb/types";
import { ListItem } from "../../types";
import * as queryKeys from "../query-keys";

type Params = {
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export const postWatchNext = async ({ tmdbMediaId, tmdbMediaType }: Params) => {
  const { data } = await backendAPI.post<ListItem>(
    `/api/auto-lists/watch-next/list-items`,
    {
      tmdbMediaId,
      tmdbMediaType,
    }
  );
  return data;
};

export const addWatchNextMutation = async (params: Params) => {
  const key = queryKeys.watchNextList();

  try {
    const listItem = await postWatchNext(params);
    return listItem;
  } catch (error) {
    throw error;
  } finally {
    queryCache.invalidateQueries(key);
  }
};
