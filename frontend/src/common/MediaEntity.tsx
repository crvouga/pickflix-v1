import { Box, BoxProps, Typography } from "@material-ui/core";
import React from "react";
import Poster from "../movie/components/Poster";
import PersonAvatar from "../person/PersonAvatar";
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
          <Typography align="center">{entity.name}</Typography>
        </Box>
      ) : entity.mediaType === "movie" ? (
        <Poster movie={entity as Movie} width="100%" />
      ) : (
        <div>unknown entity</div>
      )}
    </Box>
  );
};
