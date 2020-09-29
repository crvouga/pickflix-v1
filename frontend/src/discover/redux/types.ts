import { PathKey, ImagePaths } from "../../tmdb/types";

export type Status = "loading" | "success" | "error";

export type EntityTagType = "person" | "keyword" | "genre" | "company";

export type TagType = "dateRange" | EntityTagType;

export type EntityTag = {
  id: string;
  name: string;
  type: EntityTagType;
} & {
  [key in PathKey]?: string | null;
};

export type DateRangeTag = {
  id: string;
  name: string;
  type: "dateRange";
  range: [number, number];
};

export type Tag = EntityTag | DateRangeTag;

export const makeTag = (type: EntityTagType) => (data: {
  id: string;
  name: string;
}): Tag => ({
  ...data,
  type,
});

export type Result = ImagePaths & {
  id: string;
  name: string;
};

export type Response = {
  results: Result[];
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
