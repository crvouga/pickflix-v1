import { Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import * as R from "ramda";
import React from "react";
import MoviePosterSkeleton from "../movie/components/PosterSkeleton";
import PersonAvatarSkeleton from "../person/PersonAvatarSkeleton";

const shuffle = R.sortBy(Math.random);
const randomElement = R.pipe(shuffle, R.head);
const results = R.times((i) => ({ mediaType: "movie", id: i }), 3 * 5);
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
        <Box key={result.id} minWidth="33.33%" maxWidth="33.33%">
          {result.mediaType === "movie" && <MoviePosterSkeleton />}

          {result.mediaType === "person" && (
            <Box marginBottom="auto" p={1}>
              <PersonAvatarSkeleton />
              <Typography>
                <Skeleton />
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
