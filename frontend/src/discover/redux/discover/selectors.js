import * as R from "ramda";

export const chips = (state) => state.discover.chips;
export const suggestions = (state) => state.discover.suggestions;

export const toLabel = (chip) =>
  R.prop(chip.type, {
    genre: chip.name,
  });
