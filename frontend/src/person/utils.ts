import moment from "moment";
import * as R from "remeda";
import {
  PersonMovieCreditsResponse,
  PersonDetailsResponse,
  PersonMovieCredit,
} from "../media/tmdb/types";

type DetailsProps = {
  details: PersonDetailsResponse;
};

type CreditsProps = {
  credits: PersonMovieCreditsResponse;
};

export const allCredits = ({ credits }: CreditsProps): PersonMovieCredit[] => [
  ...credits.cast,
  ...credits.crew,
];

export const allMovies = ({ credits }: CreditsProps) =>
  R.uniqBy(allCredits({ credits }), (_) => _.id);

export const descendPopularity = (objs: PersonMovieCredit[]) =>
  R.sort(objs, (a, b) => b.popularity - a.popularity);

export const sortByReleaseDate = (objs: { releaseDate: string }[]) =>
  R.sortBy(objs, ({ releaseDate }) => moment(releaseDate).format("YYYYMMDD"));

export const oldestMovie = (props: CreditsProps) =>
  R.first(sortByReleaseDate(allMovies(props)));

export const newestMovie = (props: CreditsProps) =>
  R.last(sortByReleaseDate(allMovies(props)));

export const toYear = (releaseDate: string) =>
  moment(releaseDate).format("YYYY");

export const hasPosterPath = ({ posterPath }: { posterPath?: string | null }) =>
  Boolean(posterPath);

export const knownForMovies = ({
  details,
  credits: { cast, crew },
}: CreditsProps & DetailsProps) => {
  return details.knownForDepartment.toLowerCase() === "Acting".toLowerCase()
    ? [...cast, ...crew]
    : [...crew, ...cast];
};
