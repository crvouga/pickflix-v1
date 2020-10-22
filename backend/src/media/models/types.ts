export type TmdbMediaId = number;
export enum TmdbMediaType {
  movie = 'movie',
  tv = 'tv',
}

export type TmdbMedia = {
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
  tmdbData?: any;
};

export type EntityTypes = 'tmdbMedia';

export type Entity = {
  id: string;
  type: EntityTypes;
  data?: {
    [key: string]: any;
  };
};

export const tmdbMediaToEntity = ({
  tmdbMediaId,
  tmdbMediaType,
}: TmdbMedia): Entity => ({
  id: `${tmdbMediaType}/${tmdbMediaId}`,
  type: 'tmdbMedia',
});
