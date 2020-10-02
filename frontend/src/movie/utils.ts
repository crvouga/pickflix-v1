import moment from "moment";
import "moment-duration-format";
import numeral from "numeral";
import { MovieDetails, MovieKeywords, MovieReleaseDates } from "../tmdb/types";

type DetailsProp = { details: MovieDetails };
type KeywordsProp = { keywords: MovieKeywords };
type ReleaseDateProp = { releaseDates: MovieReleaseDates };

export const commas = (_: any) => numeral(_).format("0,0");
export const SMALL_DOT = "·";
export const EMPTY = "-";

export const voteAverage = ({ details }: DetailsProp) =>
  details.voteAverage === 0 ? `-/10 ★` : `${details.voteAverage}/10 ★`;

export const voteCount = ({ details }: DetailsProp) =>
  `${commas(details.voteCount)} votes`;

export const releaseDate = ({ details }: DetailsProp) =>
  moment(details.releaseDate).format("MMMM Do YYYY");

export const budget = ({ details }: DetailsProp) =>
  details.budget ? `$${commas(details.budget)}` : EMPTY;

export const revenue = ({ details }: DetailsProp) =>
  details.revenue ? `$${commas(details.revenue)}` : EMPTY;

export const runtime = ({ details }: DetailsProp) =>
  details.runtime
    ? moment.duration(details.runtime, "minutes").format("h[h] m[m]")
    : EMPTY;

export const releaseYear = ({ details }: DetailsProp) =>
  details.releaseDate ? moment(details.releaseDate).format("YYYY") : EMPTY;

export const certification = ({ releaseDates }: ReleaseDateProp) =>
  releaseDates.results
    .find((_) => _.iso31661 === "US")
    ?.releaseDates.map((_) => _.certification)
    .find((_) => _.length !== 0) || "-";

export const rated = certification;
