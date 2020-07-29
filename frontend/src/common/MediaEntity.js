import { Box, Typography } from "@material-ui/core";
import React from "react";
import Poster from "../movie/components/Poster";
import PersonAvatar from "../person/PersonAvatar";

export default ({ entity, skeleton, ...restOfProps }) => {
  return (
    <Box width="150px" {...restOfProps}>
      {entity.mediaType === "person" ? (
        <Box p={1}>
          <PersonAvatar skeleton={Boolean(skeleton)} person={entity} />
          <Typography align="center">{entity.name}</Typography>
        </Box>
      ) : entity.mediaType === "movie" ? (
        <Poster skeleton={Boolean(skeleton)} movie={entity} width="100%" />
      ) : (
        <div>unknown entity</div>
      )}
    </Box>
  );
};
