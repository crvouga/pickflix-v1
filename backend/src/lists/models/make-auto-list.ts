import { ListId } from ".";
import { isValidId, makeId } from "../../id";
import { UserId } from "../../users/models/make-user";

export enum AutoListKeys {
  WatchNext = "watch-next",
  Liked = "liked",
}

export type AutoList = {
  type: "autoList";
  id: ListId;
  ownerId: UserId;
  key: AutoListKeys;
};

type PartialAutoList = {
  id?: ListId;
  key: AutoListKeys;
  ownerId: UserId;
};

export const makeAutoList = (partial: PartialAutoList): AutoList => {
  const id = partial.id || (makeId() as ListId);
  const ownerId = partial.ownerId;
  const key = partial.key;

  if (!isValidId(ownerId)) {
    throw new Error("invalid owner id");
  }

  if (!isValidId(id)) {
    throw new Error("invalid list id");
  }

  return Object.freeze({
    type: "autoList",
    id,
    ownerId,
    key,
  });
};
