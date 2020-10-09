export type Entity =
  | {
      id: string;
      mediaType: "movie";
      posterPath: string;
      title: string;
    }
  | {
      id: string;
      mediaType: "person";
      profilePath: string;
      name: string;
    };

export interface RecentlyViewedState {
  entities: Entity[];
}

export const initialState: RecentlyViewedState = {
  entities: [],
};
