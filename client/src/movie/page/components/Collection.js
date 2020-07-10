import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import HorizontalScroll from "../../../common/components/HorizontalScroll";
import MovieBackdrop from "../../components/Backdrop";

export default ({ details }) => {
  const { belongsToCollection } = details;

  if (!belongsToCollection) {
    return null;
  }

  const { id: collectionId } = belongsToCollection;

  const query = useQuery(
    ["collection", collectionId],
    () =>
      collectionId &&
      axios.get(`/api/tmdb/collection/${collectionId}`).then((res) => res.data),
    {}
  );

  if (query.status === "error") {
    return null;
  }

  if (query.status === "loading") {
    return null;
  }

  const { name, overview, parts } = query.data;

  return (
    <React.Fragment>
      <Box padding={2}>
        <Typography style={{ fontWeight: "bold" }}>{name}</Typography>
        <Typography gutterBottom color="textSecondary" variant="body1">
          {overview}
        </Typography>
      </Box>

      <HorizontalScroll paddingLeft={2} paddingBottom={2}>
        {parts.map((part) => (
          <Box key={part.id} marginRight={1} minWidth={240} maxWidth={240}>
            <MovieBackdrop movie={part} />
            <Typography color="textSecondary">{part.title}</Typography>
          </Box>
        ))}
      </HorizontalScroll>
    </React.Fragment>
  );
};
