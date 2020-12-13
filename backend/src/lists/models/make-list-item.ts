import { ListId } from ".";
import { Id, isValidId, makeId } from "../../app/id";
import { makeTimestamp, Timestamp } from "../../utils";
import { castMediaId, MediaId } from "../../media/models/types";
import { castUserId, UserId } from "../../users/models/make-user";
import { castListId } from "./make-list";

export type ListItemId = Id & { ListItemId: true };

export const castListItemId = (listItemId: any) => {
  if (isValidId(listItemId)) {
    return listItemId as ListItemId;
  }
  throw new Error("invalid listItemId");
};

export type ListItem = {
  id: ListItemId;
  userId: UserId;
  listId: ListId;
  createdAt: Timestamp;
  mediaId: MediaId;
};

export type PartialListItem = {
  userId: UserId;
  listId: ListId;
  mediaId: MediaId;
};

export const makeListItem = (partial: PartialListItem): ListItem => {
  const { userId, listId, mediaId } = partial;

  return Object.freeze({
    id: castListItemId(makeId()),
    userId: castUserId(userId),
    listId: castListId(listId),
    mediaId: castMediaId(mediaId),
    createdAt: makeTimestamp(),
  });
};
