import * as R from "ramda";

export const chips = (state) => state.discover.chips;
export const options = (state) => state.discover.options;
export const responses = (state) => state.discover.responses;
export const status = (state) => state.discover.status;
export const results = R.pipe(responses, R.pluck("results"), R.unnest);
export const currentPage = R.pipe(responses, R.last, R.propOr(0, "page"));
export const totalResults = R.pipe(
  responses,
  R.head,
  R.propOr(0, "totalResults")
);

export const toLabel = (chip) =>
  R.prop(chip.type, {
    genre: chip.name,
  });
