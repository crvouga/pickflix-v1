import { DiscoverMovieParams } from "./types";

export const discoverMovie = (params: DiscoverMovieParams) => [
  "discover",
  "movie",
  params,
];

export const movieGenres = () => ["movie", "genres"];

export const personSearch = (text: string) => ["person", text];

export const keywordSearch = (text: string) => ["keyword", text];

export const companySearch = (text: string) => ["company", text];
