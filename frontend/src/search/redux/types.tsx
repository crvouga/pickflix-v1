export type Result = (
  | {
      mediaType: "movie";
      posterPath: string;
      title: string;
    }
  | {
      mediaType: "person";
      profilePath: string;
      name: string;
    }
) & {
  [k: string]: any;
};

export type Response = {
  results: Result[];
} & {
  [k: string]: any;
};

export type Status = "loading" | "success" | "error";

export interface SearchState {
  focused: boolean;
  text: string;
  responses: Response[];
  status: Status;
  recentlySearched: Result[];
}
