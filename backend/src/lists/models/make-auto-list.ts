import { isValidId, makeId } from "../../common/id";
import { castUserId, UserId } from "../../users/models/make-user";
import { ListId } from "./make-list";

export enum AutoListKeys {
  WatchNext = "watch-next",
  Liked = "liked",
  Favorite = "favorite",
}

export type AutoList = {
  id: AutoListId;
  key: AutoListKeys;
  ownerId: UserId;
};

type PartialAutoList = {
  key: AutoListKeys;
  ownerId: UserId;
};

export const INITIAL_AUTO_LIST_INFOS: { key: AutoListKeys }[] = [
  {
    key: AutoListKeys.WatchNext,
  },
  {
    key: AutoListKeys.Liked,
  },
  {
    key: AutoListKeys.Favorite,
  },
];

export type AutoListId = ListId;

export const castAutoListKey = (key: any): AutoListKeys => {
  if (
    key === AutoListKeys.Liked ||
    key === AutoListKeys.WatchNext ||
    key === AutoListKeys.Favorite
  ) {
    return key;
  }
  throw new Error("failed to cast auto list key");
};

export const castAutoListId = (id: any) => {
  if (typeof id === "string" && isValidId(id)) {
    return id as AutoListId;
  }
  throw new Error("failed to cast auto list id");
};

export const makeAutoList = ({ key, ownerId }: PartialAutoList): AutoList => {
  return Object.freeze({
    id: castAutoListId(makeId()),
    ownerId: castUserId(ownerId),
    key: castAutoListKey(key),
  });
};
