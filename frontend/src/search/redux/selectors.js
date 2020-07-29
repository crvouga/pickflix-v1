import * as R from "ramda";
export const text = (state) => state.search.text || "";
export const responses = (state) => state.search.responses || [];
export const status = (state) => state.search.status || "loading";
export const recentlySearched = (state) => state.search.recentlySearched || [];
export const results = R.pipe(
  responses,
  R.pluck("results"),
  R.unnest,
  R.reject(R.whereEq({ mediaType: "tv" })),
  R.uniqBy(R.prop("id"))
);
export const currentPage = R.pipe(responses, R.last, R.propOr(0, "page"));
export const totalResults = R.pipe(responses, R.head, R.prop("totalResults"));
export const totalPages = R.pipe(responses, R.head, R.prop("totalPages"));
