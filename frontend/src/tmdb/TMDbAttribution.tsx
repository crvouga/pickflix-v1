import { Box, Typography, BoxProps } from "@material-ui/core";
import React from "react";
import { blueLong2URL } from "./attribution";

export const TmdbLogo = (props: BoxProps) => {
  return (
    <Box {...props}>
      <img style={{ width: "100%" }} src={blueLong2URL} alt="tmdb" />
    </Box>
  );
};

export default () => {
  return (
    <Box p={2} textAlign="center" marginTop="auto">
      <Typography gutterBottom color="textSecondary">
        Powered by
      </Typography>
      <a href="https://www.themoviedb.org/">
        <img
          style={{ width: "80%", maxWidth: "200px" }}
          src={blueLong2URL}
          alt="tmdb"
        />
      </a>
    </Box>
  );
};
