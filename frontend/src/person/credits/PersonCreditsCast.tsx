import React from "react";
import { PersonMovieCreditCast } from "../../tmdb/types";
import MoviePosterGrid from "../../movie/components/MoviePosterGrid";

type Props = {
  cast: PersonMovieCreditCast[];
};

export default ({ cast }: Props) => {
  return (
    <React.Fragment>
      <MoviePosterGrid movies={cast} />
    </React.Fragment>
  );
};
