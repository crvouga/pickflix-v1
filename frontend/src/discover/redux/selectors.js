import * as R from "ramda";
import { activateTags } from "./actions";

export const tags = (state) => state.discover.tags || [];
export const activeTags = (state) => state.discover.activeTags || [];
export const inactiveTags = R.converge(R.difference, [tags, activeTags]);

export const discoverResponses = (state) =>
  state.discover.discoverResponses || [];
export const searchText = (state) => state.discover.searchText || "";

export const searchResults = (state) => state.discover.searchResults || [];

export const discoverResults = R.pipe(
  discoverResponses,
  R.pluck("results"),
  R.unnest
);
const currentPage = R.pipe(R.last, R.propOr(0, "page"));
const totalPages = R.pipe(R.head, R.propOr(0, "totalPages"));
export const currentPageDiscover = R.pipe(discoverResponses, currentPage);
export const canRequestMoreDiscover = R.pipe(
  discoverResponses,
  R.converge(R.lte, [currentPage, totalPages])
);
