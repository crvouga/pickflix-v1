import { isValidId, makeId } from "../../common/id";
import {
  castJson,
  Json,
  makeTimestamp,
  Timestamp,
  castNonEmptyString,
} from "../../common/utils";
import { castUserId, UserId } from "../../users/models";

export type TmdbDiscoverTagsId = string & { _: "TmdbDiscoverTagsId" };

export type TmdbDiscoverTags = {
  id: TmdbDiscoverTagsId;
  userId: UserId;
  tagsById: Json;
  key: string;
  createdAt: Timestamp;
};

export const castTmdbDiscoverTagsId = (id: any) => {
  if (isValidId(id)) {
    return id as TmdbDiscoverTagsId;
  }
  throw new Error("failed to cast discover tags record id");
};

export const makeTmdbDiscoverTags = ({
  key,
  tagsById,
  userId,
}: {
  key: string;
  tagsById: Json;
  userId: UserId;
}): TmdbDiscoverTags => {
  return {
    id: castTmdbDiscoverTagsId(makeId()),
    key: castNonEmptyString(key),
    tagsById: castJson(tagsById),
    userId: castUserId(userId),
    createdAt: makeTimestamp(),
  };
};
