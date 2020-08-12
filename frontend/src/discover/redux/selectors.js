import * as R from "ramda";
//
export const tags = (state) => state.discover.tags || [];
export const activeTags = (state) => state.discover.activeTags || [];
export const responses = (state) => state.discover.responses || [];
export const status = (state) => state.discover.status || null;
export const searchText = (state) => state.discover.searchText || "";
export const searchResults = (state) => state.discover.searchResults || [];
export const searchStatus = (state) => state.discover.searchStatus || null;
//
export const inactiveTags = R.converge(R.difference, [tags, activeTags]);
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
