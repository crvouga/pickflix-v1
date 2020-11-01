import { Box, BoxProps, Typography } from "@material-ui/core";
import React from "react";
import Poster from "../movie/components/MoviePosterCard";
import PersonAvatar from "../person/legacy/PersonAvatar";
import { Movie, Person } from "../tmdb/types";

interface Props extends BoxProps {
  entity:
    | {
        mediaType: "movie";
        posterPath: string;
        title: string;
      }
    | {
        mediaType: "person";
        profilePath: string;
        name: string;
      };
  skeleton?: boolean;
}

export default ({ entity, skeleton = false, ...restOfProps }: Props) => {
  return (
    <Box width="150px" {...restOfProps}>
      {entity.mediaType === "person" ? (
        <Box p={1}>
          <PersonAvatar
            skeleton={Boolean(skeleton)}
            person={entity as Person}
          />
          <Typography noWrap align="center" variant="subtitle2">
            {entity.name}
          </Typography>
        </Box>
      ) : entity.mediaType === "movie" ? (
        <Poster movie={entity as Movie} />
      ) : (
        <div>unknown entity</div>
      )}
    </Box>
  );
};
