import { TmdbImagePath } from "../../tmdb/types";

export type Status = "loading" | "success" | "error";

export type EntityTagType = "person" | "keyword" | "genre" | "company";

export type TagType = "dateRange" | EntityTagType;

export type Tag = (
  | {
      id: number;
      name: string;
      type: EntityTagType;
    }
  | {
      type: "dateRange";
      range: [number, number];
    }
) & {
  [key: string]: any;
} & {
    [key in TmdbImagePath]?: string | null;
  };

export const makeTag = (type: EntityTagType) => (
  data: { id: number; name: string } & { [key: string]: any }
): Tag => ({
  ...data,
  type,
});

export type Result = {
  id: number;
} & {
  [key: string]: any;
};

export type Response = {
  results: Result[];
} & {
  [key: string]: any;
};

export interface DiscoverState {
  tags: Tag[];
  activeTags: Tag[];
  responses: Response[];
  status: Status;
  searchText: string;
  searchResults: Result[];
  searchStatus: Status;
}
