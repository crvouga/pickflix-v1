export enum MediaType {
  movie = "movie",
  tv = "tv",
  person = "person",
}
export type Entity = {
  id: string;
} & (
  | {
      mediaType: MediaType.movie;
      posterPath: string;
      title: string;
    }
  | {
      mediaType: MediaType.person;
      profilePath: string;
      name: string;
    }
);

export interface RecentlyViewedState {
  entities: Entity[];
}
