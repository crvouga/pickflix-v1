import { Box, Typography } from "@material-ui/core";
import React from "react";
import Poster from "../../movie/components/MoviePosterCard";
import PersonAvatar from "../../person/legacy/PersonAvatar";
import { Entity } from "./page-history";

type Props = {
  entity: Entity;
};

export default ({ entity }: Props) => {
  switch (entity.mediaType) {
    case "movie":
      return <Poster movie={entity} />;

    case "person":
      return (
        <React.Fragment>
          <Box
            paddingBottom={1}
            display="flex"
            justifyContent="center"
            maxWidth="100%"
          >
            <PersonAvatar person={entity} />
          </Box>
          <Typography noWrap align="center" variant="h6">
            {entity.name}
          </Typography>
        </React.Fragment>
      );
  }
};
