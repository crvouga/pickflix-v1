import * as R from "ramda";
export const input = (state) => state.search.input;
export const responses = (state) => state.search.responses;
export const status = (state) => state.search.status;
export const history = (state) => state.search.history;
export const results = R.pipe(
  responses,
  R.pluck("results"),
  R.unnest,
  R.reject(R.whereEq({ mediaType: "tv" }))
);
export const currentPage = R.pipe(responses, R.last, R.propOr(0, "page"));
export const totalResults = R.pipe(responses, R.head, R.prop("totalResults"));
export const totalPages = R.pipe(responses, R.head, R.prop("totalPages"));
