export type TmdbMediaId = number;
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

const castTmdbMediaId = (id: any): number => {
  return Number(id);
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
    tmdbMediaId: 550,
    tmdbMediaType: TmdbMediaType.movie,
    ...overrides,
  };
};

const seperator = " ";
export const serializeMediaId = (mediaId: MediaId): string => {
  return [mediaId.tmdbMediaType, mediaId.tmdbMediaId].join(seperator);
};
export const deserializeMediaId = (mediaId: string): MediaId => {
  const [tmdbMediaType, tmdbMediaId] = mediaId.split(seperator);
  return castMediaId({
    tmdbMediaId: Number(tmdbMediaId),
    tmdbMediaType,
  });
};
