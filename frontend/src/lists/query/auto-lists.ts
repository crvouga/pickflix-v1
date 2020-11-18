import { BackendAPI } from "../../backend-api";
import { User } from "../../users/query";
import { ListItemAggergation } from "./list-items";
import { useQuery } from "react-query";

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

/*


*/

export type GetAutoListParams = {
  id?: string;
  ownerId?: string;
};

export const getAutoLists = async (params: GetAutoListParams) => {
  const { data } = await BackendAPI.get<AutoListAggergation[]>(
    `/api/auto-lists`,
    {
      params,
    }
  );
  return data;
};
