import * as R from "ramda";

export const tagResponses = (state) => state.discover.tagResponses || [];
export const tagResponseStatus = (state) =>
  state.discover.tagResponseStatus || "loading";
export const tagQuery = (state) => state.discover.tagQuery || "";
export const open = (state) => state.discover.open || false;
export const selectedTags = (state) =>
  R.values(state.discover.selectedTags) || [];
export const tags = (state) => R.values(state.discover.tags) || [];
export const responses = (state) => state.discover.responses || [];
export const responseStatus = (state) =>
  state.discover.responseStatus || "loading";
export const results = R.pipe(
  responses,
  R.pluck("results"),
  R.unnest,
  R.uniqBy(R.prop("id"))
);
export const currentPage = R.pipe(responses, R.last, R.propOr(0, "page"));
export const totalResults = R.pipe(
  responses,
  R.head,
  R.propOr(0, "totalResults")
);
export const unselectedTags = R.pipe(
  R.juxt([tags, selectedTags]),
  R.apply(R.difference)
);
