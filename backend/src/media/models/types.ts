export type TmdbMediaType = 'movie' | 'tv' | 'person';

export type TmdbMedia = {
  tmdbMediaId: string;
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
