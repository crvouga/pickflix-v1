import {
  TmdbMediaId,
  TmdbMediaType,
  TmdbMedia,
  MediaId,
} from "../../media/models/types";
import { UserId } from "../../users/models/make-user";
import { Id } from "../../id/types";
import { ListId } from ".";
import { makeId, isValidId } from "../../id";

export type ListItemId = Id & { ListItemId: true };

export const castListItemId = (listItemId: any) => {
  if (isValidId(listItemId)) {
    return listItemId as ListItemId;
  }
  throw new Error("invalid listItemId");
};

export type ListItem = {
  type: "listItem";
  id: ListItemId;
  userId: UserId;
  listId: ListId;
  createdAt: number;
  mediaId: MediaId;
};

export type PartialListItem = {
  id?: ListItemId;
  userId: UserId;
  listId: ListId;
  mediaId: MediaId;
  createdAt?: number;
};

export const makeListItem = (partial: PartialListItem): ListItem => {
  const {
    id = makeId() as ListItemId,
    createdAt = Date.now(),
    userId,
    listId,
    mediaId,
  } = partial;

  if (!isValidId(id)) {
    throw new Error("invalid id");
  }

  if (!isValidId(listId)) {
    throw new Error("invalid list id");
  }

  if (!isValidId(userId)) {
    throw new Error("invalid user id");
  }

  return Object.freeze({
    type: "listItem",
    id,
    userId,
    listId,
    mediaId,
    createdAt,
  });
};
