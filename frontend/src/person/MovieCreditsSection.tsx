import { Box } from "@material-ui/core";
import { groupBy, mergeAll } from "ramda";
import React from "react";
import MovieCard from "../movie/components/MovieCard";
import {
  PersonDetailsResponse,
  PersonMovieCredit,
  PersonMovieCreditsResponse,
} from "../tmdb/types";

type Props = {
  credits: PersonMovieCreditsResponse;
  details: PersonDetailsResponse;
};

const toSubheader = (movieCredits: PersonMovieCredit[]) =>
  movieCredits
    .map((credit) => ("job" in credit ? credit.job : credit.character))
    .filter((_) => _ && _.length > 0)
    .join(", ");

export default ({ credits }: Props) => {
  const creditsByMovieId = groupBy((credit) => credit.id, [
    ...credits.cast,
    ...credits.crew,
  ]);

  return (
    <Box p={2}>
      {Object.entries(creditsByMovieId).map(([movieId, movieCredits]) => (
        <Box key={movieId} marginBottom={2}>
          <MovieCard
            movie={mergeAll(movieCredits)}
            CardHeaderProps={{ subheader: toSubheader(movieCredits) }}
          />
        </Box>
      ))}
    </Box>
  );
};
