import { isValidId, makeId } from "../../id";
import { Id } from "../../id/types";
import { UserId } from "../../users/models/make-user";

export type ListId = Id & { ListId: true };

export type List = {
  type: "list";
  id: ListId;
  ownerId: UserId;
  title: string;
  description: string;
  createdAt: number;
};

export type PartialList = {
  title: string;
  description?: string;
  createdAt?: number;
  ownerId: UserId;
  id?: ListId;
};

const MAX_LENGTH_TITLE = 100;
const MAX_LENGTH_DESCRIPTION = 500;

export const makeList = (partial: PartialList): List => {
  const id = partial.id || (makeId() as ListId);
  const ownerId = partial.ownerId;
  const title = partial.title.trim();
  const description = (partial.description || "").trim();
  const createdAt = partial.createdAt || Date.now();

  const errors = [];

  if (!isValidId(ownerId)) {
    errors.push({ key: "ownerId", message: "Invalid ownerId." });
  }

  if (!isValidId(id)) {
    errors.push({ key: "listId", message: `Invalid list id.` });
  }

  if (title?.length === 0) {
    errors.push({ key: "title", message: "Title can NOT be empty." });
  }

  if (title?.length > MAX_LENGTH_TITLE) {
    errors.push({
      key: "title",
      message: `Title can NOT be more than ${MAX_LENGTH_TITLE} characters long.`,
    });
  }

  if (description?.length > MAX_LENGTH_DESCRIPTION) {
    errors.push({
      key: "description",
      message: `Description can NOT be more than ${MAX_LENGTH_TITLE} characters long.`,
    });
  }

  if (errors.length > 0) {
    throw errors;
  }

  return Object.freeze({
    type: "list",
    id,
    ownerId,
    title,
    description,
    createdAt,
  });
};
