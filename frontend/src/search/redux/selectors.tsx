import { createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";
import { AppState } from "../../redux/types";

export const text = (state: AppState) => state.search.text || "";
export const responses = (state: AppState) => state.search.responses || [];
export const status = (state: AppState) => state.search.status || "loading";
export const recentlySearched = (state: AppState) =>
  state.search.recentlySearched || [];

export const results = createSelector([responses], (responses) => {
  return R.uniqBy(
    (result) => result.id,
    responses
      .flatMap((response) => response.results)
      .filter(
        (result) =>
          result.mediaType === "movie" || result.mediaType === "person"
      )
  );
});
export const sortedResults = createSelector(
  [results, text],
  (results, text) => {
    return results;
  }
);
export const currentPage = createSelector(
  [responses],
  R.pipe(R.last, R.propOr(0, "page"))
);
export const totalResults = createSelector(
  [responses],
  (responses) => responses[0]?.totalResults || 0
);
export const totalPages = createSelector(
  [responses],
  (responses) => responses[0]?.totalPages || 0
);
export const isTextEmpty = createSelector([text], R.isEmpty);
