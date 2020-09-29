import { Box, Typography } from "@material-ui/core";
import moment from "moment";
import * as R from "ramda";
import React from "react";

import { Movie, PersonDetails, PersonMovieCredits } from "../tmdb/types";
import PersonAvatar from "./PersonAvatar";

interface Props {
  details: PersonDetails;
  credits: PersonMovieCredits;
}

export default ({ details, credits }: Props) => {
  const allCredits = [...credits.cast, ...credits.crew];

  const allMovies = R.uniqBy(R.prop("id"), allCredits);

  const [oldestMovie, newestMovie] = R.pipe(
    (allMovies: Movie[]) => allMovies.filter((movie) => movie.releaseDate),
    R.sortBy((_) => moment(_.releaseDate).format("YYYYMMDD")),
    (sortedMovies) => [sortedMovies[0], sortedMovies[sortedMovies.length - 1]]
  )(allMovies as Movie[]);

  const oldestRelease = moment(oldestMovie?.releaseDate).format("YYYY");
  const newestRelease = moment(newestMovie?.releaseDate).format("YYYY");

  const subtitle1 = [
    details.knownForDepartment,
    `${allMovies.length} movie${allMovies.length === 1 ? "" : "s"}`,
    `${oldestRelease} to ${newestRelease}`,
  ].join(" • ");

  return (
    <React.Fragment>
      <Box textAlign="center" p={2}>
        <PersonAvatar
          person={{ profilePath: details.profilePath || "", id: details.id }}
          width="144px"
          m="auto"
        />
      </Box>
      <Box paddingX={2}>
        <Typography variant="h5">{details.name}</Typography>

        <Typography variant="subtitle1" color="textSecondary">
          {subtitle1}
        </Typography>
      </Box>
    </React.Fragment>
  );
};
