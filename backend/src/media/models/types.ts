export type TmdbMediaId = number & { _: TmdbMediaId };

export enum TmdbMediaType {
  movie = "movie",
  tv = "tv",
  person = "person",
}

export type TmdbMedia = {
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
  tmdbData?: any;
};

export type EntityTypes = "tmdbMedia";

export type Entity = {
  id: string;
  type: EntityTypes;
  data?: {
    [key: string]: any;
  };
};

export type MediaId = {
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
};

export const castTmdbMediaId = (_id: any) => {
  const id = Number(_id);
  if (id >= 0) {
    return id as TmdbMediaId;
  }
  throw new Error("failed to cast tmdb media id");
};

const castTmdbMediaType = (type: string): TmdbMediaType => {
  if (type === TmdbMediaType.tv || type === TmdbMediaType.movie) {
    return type;
  }
  throw new Error("failed to cast tmdbMediaType");
};

export const castMediaId = (mediaId: any): MediaId => {
  if (mediaId && "tmdbMediaId" in mediaId && "tmdbMediaType" in mediaId) {
    return {
      tmdbMediaId: castTmdbMediaId(mediaId.tmdbMediaId),
      tmdbMediaType: castTmdbMediaType(mediaId.tmdbMediaType),
    };
  }
  throw new Error("failed to cast mediaId");
};

export const makeMediaIdFake = (overrides?: Partial<MediaId>): MediaId => {
  return {
    tmdbMediaId: castTmdbMediaId(550),
    tmdbMediaType: TmdbMediaType.movie,
    ...overrides,
  };
};

const SEPERATOR = " ";

export type SerializedMediaId = string & { _: "SerializedMediaId" };

export const deserializeMediaId = (
  serializedMediaId: SerializedMediaId
): MediaId => {
  const [tmdbMediaType, tmdbMediaId] = serializedMediaId.split(SEPERATOR);
  return castMediaId({
    tmdbMediaId: Number(tmdbMediaId),
    tmdbMediaType,
  });
};

const castSerializedMediaId = (serializedMediaId: any) => {
  try {
    deserializeMediaId(serializedMediaId as SerializedMediaId);
    return serializedMediaId as SerializedMediaId;
  } catch (error) {
    throw new Error(`failed to cast serialized media id: ${serializedMediaId}`);
  }
};

export const serializeMediaId = (mediaId: MediaId): SerializedMediaId => {
  return castSerializedMediaId(
    [mediaId.tmdbMediaType, mediaId.tmdbMediaId].join(SEPERATOR)
  );
};
