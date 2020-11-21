import moment from "moment";
import * as R from "ramda";
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
  R.uniqBy(R.prop("id"), allCredits({ credits }));

export const descendPopularity = (objs: PersonMovieCredit[]) =>
  R.sort(
    R.descend(({ popularity }) => popularity),
    objs
  );

export const sortByReleaseDate = (objs: { releaseDate: string }[]) =>
  R.sortBy(({ releaseDate }) => moment(releaseDate).format("YYYYMMDD"), objs);

export const oldestMovie = (props: CreditsProps) =>
  R.head(sortByReleaseDate(allMovies(props)));

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
