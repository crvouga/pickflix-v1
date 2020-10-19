import { DiscoverMovieQueryParams } from "./types";

export const discoverMovie = (params: DiscoverMovieQueryParams) => [
  "discover",
  "movie",
  params,
];

export const movieGenres = () => ["movie", "genres"];

export const personSearch = (text: string) => ["person", text];

export const keywordSearch = (text: string) => ["keyword", text];

export const companySearch = (text: string) => ["company", text];

export const certifications = () => ["certification", "movie", "list"];
