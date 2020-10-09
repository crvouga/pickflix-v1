import { Box, IconButton, Toolbar } from "@material-ui/core";
import GridOffIcon from "@material-ui/icons/GridOff";
import GridOnIcon from "@material-ui/icons/GridOn";
import SortIcon from "@material-ui/icons/Sort";
import { groupBy, mergeAll } from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../movie/components/MovieCard";
import Poster from "../movie/components/MoviePosterCard";
import { actions, selectors } from "../redux";
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
  const isGridOn = useSelector(selectors.personPage.isGridOn);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(actions.personPage.toggleGrid());
  };

  const creditsByMovieId = groupBy((credit) => credit.id, [
    ...credits.cast,
    ...credits.crew,
  ]);

  return (
    <div>
      <Toolbar>
        <IconButton onClick={handleToggle}>
          {isGridOn ? <GridOffIcon /> : <GridOnIcon />}
        </IconButton>
        <IconButton>
          <SortIcon />
        </IconButton>
      </Toolbar>
      {isGridOn && (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          paddingX={1 / 2}
        >
          {Object.entries(creditsByMovieId).map(([movieId, movieCredits]) => (
            <Box key={movieId} width="50%" p={1 / 2}>
              <Poster movie={mergeAll(movieCredits)} />
            </Box>
          ))}
        </Box>
      )}
      {!isGridOn && (
        <Box paddingX={2}>
          {Object.entries(creditsByMovieId).map(([movieId, movieCredits]) => (
            <Box key={movieId} marginBottom={2}>
              <MovieCard
                movie={mergeAll(movieCredits)}
                CardHeaderProps={{ subheader: toSubheader(movieCredits) }}
              />
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};
