import { Id, isValidId, makeId } from "../../app/id";
import { castUserId, UserId } from "../../users/models";

const MIN_LENGTH_TITLE = 1;
const MAX_LENGTH_TITLE = 100;
const MAX_LENGTH_DESCRIPTION = 500;

export type ListId = Id & { ListId: true };

export type List = {
  type: "list";
  id: ListId;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
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
    return description.trim();
  }
  throw new Error("invalid list description");
};

export const castListTitle = (title: any) => {
  if (
    typeof title === "string" &&
    MIN_LENGTH_TITLE <= title.trim().length &&
    title.trim().length <= MAX_LENGTH_TITLE
  ) {
    return title.trim();
  }
  throw new Error("invalid list title");
};

export const makeList = ({
  description,
  title,
  ownerId,
}: PartialList): List => {
  return Object.freeze({
    type: "list",
    ownerId: castUserId(ownerId),
    id: castListId(makeId()),
    title: castListTitle(title),
    description: castListDescription(description || ""),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
};

export const updateList = (
  list: List,
  {
    title,
    description,
  }: {
    title?: string;
    description?: string;
  }
): List => {
  return {
    ...list,
    ...(title !== undefined ? { title: castListTitle(title) } : {}),
    ...(description !== undefined
      ? { description: castListDescription(description) }
      : {}),
    updatedAt: Date.now(),
  };
};
