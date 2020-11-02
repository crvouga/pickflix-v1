import React from "react";
import { PersonMovieCreditCrew } from "../../tmdb/types";
import MoviePosterGrid from "../../movie/components/MoviePosterGrid";
import { Chip, Box, Toolbar } from "@material-ui/core";
import { uniq } from "ramda";

type Props = {
  crew: PersonMovieCreditCrew[];
};

const toDepartments = (crew: PersonMovieCreditCrew[]) =>
  uniq(crew.map((crew) => crew.department));

export default ({ crew }: Props) => {
  return (
    <React.Fragment>
      {/* <Box paddingBottom={2} display="flex" flexWrap="nowrap" overflow="scroll">
        {toDepartments(crew).map((department) => (
          <Box key={department} marginRight={1}>
            <Chip clickable label={department} variant="outlined" />
          </Box>
        ))}
      </Box> */}
      <MoviePosterGrid movies={crew} />
    </React.Fragment>
  );
};
