import { Box, Grow, Typography } from "@material-ui/core";
import React from "react";
import Poster from "../movie/components/Poster";
import PersonAvatar from "../person/PersonAvatar";

export default ({ results, onResultClick }) => {
  const handleResultClick = (result) => () => onResultClick(result);

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" width="100%">
      {results.map((result) => (
        <Box key={result.id} onClick={handleResultClick(result)} width="33.33%">
          {result.mediaType === "movie" ? (
            <Poster movie={result} width="100%" />
          ) : result.mediaType === "person" ? (
            <Box marginBottom="auto" p={1}>
              <PersonAvatar person={result} marginBottom={1} />
              <Typography>{result.name}</Typography>
            </Box>
          ) : (
            <div />
          )}
        </Box>
      ))}
    </Box>
  );
};
