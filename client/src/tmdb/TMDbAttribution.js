import { Box, Typography } from "@material-ui/core";
import React from "react";
import { blueLong2URL } from "./attribution";

export default () => {
  return (
    <Box p={2} textAlign="center" marginTop="auto">
      <Typography gutterBottom color="textSecondary">
        Pickflix is powered by
      </Typography>
      <a href="https://www.themoviedb.org/">
        <img style={{ width: "80%", maxWidth: "200px" }} src={blueLong2URL} />
      </a>
    </Box>
  );
};
