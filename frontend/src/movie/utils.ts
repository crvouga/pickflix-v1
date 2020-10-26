import moment from "moment";
import "moment-duration-format";
import numeral from "numeral";
import { MovieDetails, MovieReleaseDates } from "../tmdb/types";

type DetailsProp = { details: MovieDetails };
// type KeywordsProp = { keywords: MovieKeywords };
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

export const budget = ({ budget }: MovieDetails) =>
  budget ? `$${commas(budget)}` : EMPTY;

export const revenue = ({ revenue }: MovieDetails) =>
  revenue ? `$${commas(revenue)}` : EMPTY;

export const runtime = ({ runtime }: MovieDetails) =>
  runtime ? moment.duration(runtime, "minutes").format("h[h] m[m]") : EMPTY;

export const toRuntime = runtime;

export const toReleaseYear = ({
  releaseDate,
}: {
  releaseDate: string;
}): string => moment(releaseDate).format("YYYY");

export const releaseYear = ({ releaseDate }: MovieDetails) =>
  releaseDate ? moment(releaseDate).format("YYYY") : EMPTY;

export const toCertification = ({ releaseDates }: ReleaseDateProp) =>
  releaseDates.results
    .find((_) => _.iso_3166_1 === "US")
    ?.releaseDates.map((_) => _.certification)
    .find((_) => _.length !== 0);

export const toRated = toCertification;
