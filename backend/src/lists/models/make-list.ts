import { Id, isValidId, makeId } from "../../app/id";
import { castUserId, UserId } from "../../users/models";
import { isNullOrUndefined } from "util";
import { Timestamp, castTimestamp, makeTimestamp } from "../../app/utils";

const MIN_LENGTH_TITLE = 1;
const MAX_LENGTH_TITLE = 100;
const MAX_LENGTH_DESCRIPTION = 500;

export type ListId = Id & { ListId: true };
export type ListDescription = string & { _: "ListDescription" };
export type ListTitle = string & { _: "ListTitle" };

export type List = {
  id: ListId;
  title: ListTitle;
  description: ListDescription;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  ownerId: UserId;
};

export type PartialList = {
  title: string;
  description?: string;
  ownerId: UserId;
};

/* 

*/

export const castListId = (listId: any) => {
  if (isValidId(listId)) {
    return listId as ListId;
  }
  throw new Error("invalid listId");
};

export const castListDescription = (description: any) => {
  if (
    typeof description === "string" &&
    description.trim().length <= MAX_LENGTH_DESCRIPTION
  ) {
    return description.trim() as ListDescription;
  }
  throw new Error("invalid list description");
};

export const castListTitle = (title: any) => {
  if (
    typeof title === "string" &&
    MIN_LENGTH_TITLE <= title.trim().length &&
    title.trim().length <= MAX_LENGTH_TITLE
  ) {
    return title.trim() as ListTitle;
  }
  throw new Error("invalid list title");
};

export const castList = (list: any): List => {
  if (
    "id" in list &&
    "ownerId" in list &&
    "title" in list &&
    "description" in list &&
    "createdAt" in list &&
    "updatedAt" in list
  ) {
    return Object.freeze({
      id: castListId(list.id),
      title: castListTitle(list.title),
      description: castListDescription(list.description),
      ownerId: castUserId(list.ownerId),
      createdAt: castTimestamp(list.createdAt),
      updatedAt: castTimestamp(list.updatedAt),
    });
  }
  throw new Error("failed to cast list becuase of missing key");
};

export const makeList = ({
  description = "",
  title,
  ownerId,
}: PartialList): List => {
  return castList({
    id: makeId(),
    ownerId,
    title,
    description,
    createdAt: makeTimestamp(),
    updatedAt: makeTimestamp(),
  });
};

export const updateList = (
  list: List,
  {
    ownerId,
    title,
    description,
  }: {
    ownerId?: UserId;
    title?: string;
    description?: string;
  }
): List => {
  return castList({
    ...list,
    ...(isNullOrUndefined(title) ? {} : { title }),
    ...(isNullOrUndefined(description) ? {} : { description }),
    ...(isNullOrUndefined(ownerId) ? {} : { ownerId }),
    updatedAt: makeTimestamp(),
  });
};
