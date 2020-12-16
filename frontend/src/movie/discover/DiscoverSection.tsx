import React from "react";
import { MovieDetails, MovieCredits } from "../../media/tmdb/types";
import { Box, Typography } from "@material-ui/core";

type Props = {
  details: MovieDetails;
  credits: MovieCredits;
};

export default (props: Props) => {
  return (
    <React.Fragment>
      <Box paddingX={2}>
        <Typography variant="h6">Discover</Typography>
      </Box>
    </React.Fragment>
  );
};
