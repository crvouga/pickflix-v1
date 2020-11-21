import moment from "moment";
import "moment-duration-format";
import numeral from "numeral";
import {
  MovieCreditCrew,
  MovieDetails,
  MovieGenre,
  MovieReleaseDates,
} from "../media/tmdb/types";

type DetailsProp = { details: MovieDetails };
// type KeywordsProp = { keywords: MovieKeywords };
type ReleaseDateProp = { releaseDates: MovieReleaseDates };

export const toGenres = ({ genres }: { genres: MovieGenre[] }) => {
  return genres
    .slice(0, 2)
    .map((_) => _.name)
    .join("/");
};

export const commas = (_: any) => numeral(_).format("0,0");
export const SMALL_DOT = "·";
export const EMPTY = "-";

export const voteAverage = ({ details }: DetailsProp) =>
  details.voteAverage === 0 ? `-/10 ★` : `${details.voteAverage}/10 ★`;

export const voteCount = ({ details }: DetailsProp) =>
  `${commas(details.voteCount)} votes`;

export const releaseDate = ({ details }: DetailsProp) =>
  moment(details.releaseDate).format("MMMM Do YYYY");

export const toBudget = ({ budget }: { budget?: number }) =>
  budget ? `$${commas(budget)}` : null;

export const toRevenue = ({ revenue }: { revenue?: number }) =>
  revenue ? `$${commas(revenue)}` : null;

export const toRuntime = ({ runtime }: MovieDetails) =>
  runtime ? moment.duration(runtime, "minutes").format("h[h] m[m]") : null;

export const toReleaseYear = ({
  releaseDate,
}: {
  releaseDate: string;
}): string => moment(releaseDate).format("YYYY");

export const releaseYear = ({ releaseDate }: MovieDetails) =>
  releaseDate ? moment(releaseDate).format("YYYY") : null;

export const toCertification = ({ releaseDates }: ReleaseDateProp) =>
  releaseDates.results
    .find((_) => _.iso_3166_1 === "US")
    ?.releaseDates.map((_) => _.certification)
    .find((_) => _.length !== 0);

export const toRated = toCertification;

export const toDirectors = ({ crew }: { crew: MovieCreditCrew[] }) => {
  return crew.filter((credit) => credit.job === "Director");
};
