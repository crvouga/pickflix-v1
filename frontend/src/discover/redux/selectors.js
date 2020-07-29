import * as R from "ramda";

export const input = (state) => state.discover.input || {};
export const options = (state) => state.discover.options || [];
export const optionWithoutInput = (state) =>
  R.mergeWith(R.difference, options(state), input(state));
export const responses = (state) => state.discover.responses || [];
export const status = (state) => state.discover.status || "loading";
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
