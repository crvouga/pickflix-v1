import { isValidId, makeId } from "../../common/id";
import { Id } from "../../common/id/types";
import { castUserId, UserId } from "../../users/models/make-user";
import { ListId } from "./make-list";

export enum AutoListKeys {
  WatchNext = "watch-next",
  Liked = "liked",
}

export const INITIAL_AUTO_LIST_INFOS: { key: AutoListKeys }[] = [
  {
    key: AutoListKeys.WatchNext,
  },
  {
    key: AutoListKeys.Liked,
  },
];

export type AutoListId = ListId;

export const castAutoListKey = (key: any) => {
  if (key === AutoListKeys.Liked || key === AutoListKeys.WatchNext) {
    return key as AutoListKeys;
  }
  throw new Error("failed to cast auto list key");
};

export const castAutoListId = (id: any) => {
  if (typeof id === "string" && isValidId(id)) {
    return id as AutoListId;
  }
  throw new Error("failed to cast auto list id");
};

export type AutoList = {
  type: "autoList";
  id: AutoListId;
  ownerId: UserId;
  key: AutoListKeys;
};

type PartialAutoList = {
  key: AutoListKeys;
  ownerId: UserId;
};

export const makeAutoList = ({ key, ownerId }: PartialAutoList): AutoList => {
  return Object.freeze({
    type: "autoList",
    id: makeId() as AutoListId,
    ownerId: castUserId(ownerId),
    key: castAutoListKey(key),
  });
};
