import { isValidId, makeId } from "../../app/id";
import { castJson, Json, makeTimestamp, Timestamp } from "../../utils";
import { castUserId, UserId } from "../../users/models";

export type TmdbDiscoverTagsId = string & { _: "TmdbDiscoverTagsId" };

export type TmdbDiscoverTags = {
  id: TmdbDiscoverTagsId;
  userId: UserId;
  serializedTagsById: Json;
  createdAt: Timestamp;
};

export const castTmdbDiscoverTagsId = (id: any) => {
  if (isValidId(id)) {
    return id as TmdbDiscoverTagsId;
  }
  throw new Error("failed to cast discover tags record id");
};

export const makeTmdbDiscoverTags = ({
  serializedTagsById,
  userId,
}: {
  serializedTagsById: Json;
  userId: UserId;
}): TmdbDiscoverTags => {
  return {
    id: castTmdbDiscoverTagsId(makeId()),
    serializedTagsById: castJson(serializedTagsById),
    userId: castUserId(userId),
    createdAt: makeTimestamp(),
  };
};
