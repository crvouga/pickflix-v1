import { DiscoverMovieParams } from "./types";

export const discoverMovie = (params: DiscoverMovieParams) =>
  JSON.stringify(["discover", "movie", params]);
