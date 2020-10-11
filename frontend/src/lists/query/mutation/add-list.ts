import backendAPI from "../../../backendAPI";
import { queryCache } from "../../../query/query-cache";
import * as queryKeys from "../query-keys";
import { List } from "../../types";
import { TmdbMediaType } from "../../../tmdb/types";

type Params = {
  title: string;
  description: string;
  listItemInfos?: {
    tmdbMediaId: string;
    tmdbMediaType: TmdbMediaType;
  }[];
};

export const postList = async ({
  title,
  description,
  listItemInfos,
}: Params) => {
  const { data } = await backendAPI.post<List>(`/api/lists/`, {
    title,
    description,
    listItemInfos,
  });
  return data;
};

export const addListMutation = async (params: Params) => {
  try {
    const postedList = await postList(params);
    return postedList;
  } catch (error) {
    throw error;
  } finally {
    const key = queryKeys.lists();
    queryCache.invalidateQueries(key);
  }
};
