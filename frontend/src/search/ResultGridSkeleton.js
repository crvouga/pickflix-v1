import { Box } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import MediaEntity from "../common/MediaEntity";

const movieResults = R.times(
  (i) => ({ mediaType: "movie", id: Math.random() }),
  3 * 5
);
const personResults = R.times(
  (i) => ({ mediaType: "person", id: Math.random() }),
  3 * 5
);
const results = R.unnest(R.zip(movieResults, personResults));

export default () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      width="100%"
      overflow="hidden"
    >
      {results.map((result) => (
        <Box key={result.id} width="33.33%">
          <MediaEntity entity={result} skeleton width="100%" />
        </Box>
      ))}
    </Box>
  );
};
