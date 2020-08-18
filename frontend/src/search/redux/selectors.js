import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

export const text = (state) => state.search.text || "";
export const responses = (state) => state.search.responses || [];
export const status = (state) => state.search.status || "loading";
export const recentlySearched = (state) => state.search.recentlySearched || [];

export const results = createSelector(
  [responses],
  R.pipe(
    R.pluck("results"),
    R.unnest,
    R.reject(R.whereEq({ mediaType: "tv" })),
    R.uniqBy(R.prop("id"))
  )
);
export const sortedResults = createSelector(
  [results, text],
  (results, text) => {
    const comparators = [
      R.descend(R.prop("popularity")),
      R.descend((_) => String(text).localeCompare(_)),
    ];
    return R.sortWith(comparators)(results);
  }
);
export const currentPage = createSelector(
  [responses],
  R.pipe(R.last, R.propOr(0, "page"))
);
export const totalResults = createSelector(
  [responses],
  R.pipe(R.head, R.prop("totalResults"))
);
export const totalPages = createSelector(
  [responses],
  R.pipe(R.head, R.prop("totalPages"))
);
export const isTextEmpty = createSelector([text], R.isEmpty);
