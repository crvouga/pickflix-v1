import * as R from "ramda";
import { AppState } from "../../redux/types";
//
export const discover = (state: AppState) => state.discover;

export const tags = (state: AppState) => state.discover.tags || [];

export const activeTags = (state: AppState) => state.discover.activeTags || [];

export const responses = (state: AppState) => state.discover.responses || [];

export const status = (state: AppState) => state.discover.status || null;

export const searchText = (state: AppState) => state.discover.searchText || "";

export const searchResults = (state: AppState) =>
  state.discover.searchResults || [];

export const searchStatus = (state: AppState) =>
  state.discover.searchStatus || null;
//
export const inactiveTags = (state: AppState) =>
  R.difference(activeTags(state), tags(state));

export const results = R.pipe(
  responses,
  R.pluck("results"),
  R.unnest,
  R.uniqBy(R.prop("id"))
);
const responsesToCurrentPage = R.pipe(R.last, R.propOr(0, "page"));
const responsesToTotalPages = R.pipe(R.head, R.propOr(0, "totalPages"));
export const currentPage = R.pipe(responses, responsesToCurrentPage);
export const canRequestMoreDiscover = R.pipe(
  responses,
  R.converge(R.lte, [responsesToCurrentPage, responsesToTotalPages])
);
